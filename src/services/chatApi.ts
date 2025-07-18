// Separate Chat API service
const API_BASE_URL = "https://dhlxq7-3005.csb.app/api";
const WS_URL = "wss://dhlxq7-3005.csb.app";

// Chat types
export interface Conversation {
  id: string;
  type: "direct" | "group" | "system";
  name: string | null;
  participants: string[];
  participantNames?: { [key: string]: string };
  clubId?: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  unreadCount: number;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: "text" | "system" | "match-request";
  readBy: string[];
  relatedBookingId?: string;
  createdAt: string;
}

export type ChatEventType =
  | "MESSAGE_RECEIVED"
  | "SYSTEM_NOTIFICATION"
  | "CONVERSATION_CREATED";

export interface ChatWebSocketMessage {
  type: ChatEventType;
  data: any;
  timestamp: string;
}

class ChatAPI {
  private ws: WebSocket | null = null;
  private eventListeners: Map<ChatEventType, Function[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    this.initWebSocket();
  }

  private initWebSocket() {
    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        console.log("💬 Chat WebSocket connected");
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: ChatWebSocketMessage = JSON.parse(event.data);
          // Only handle chat-related messages
          if (
            [
              "MESSAGE_RECEIVED",
              "SYSTEM_NOTIFICATION",
              "CONVERSATION_CREATED",
            ].includes(message.type)
          ) {
            this.handleWebSocketMessage(message);
          }
        } catch (error) {
          console.error("Error parsing chat WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("💬 Chat WebSocket disconnected");
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("Chat WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to initialize chat WebSocket:", error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;

      setTimeout(() => {
        this.initWebSocket();
      }, delay);
    }
  }

  private handleWebSocketMessage(message: ChatWebSocketMessage) {
    const listeners = this.eventListeners.get(message.type) || [];
    listeners.forEach((listener) => {
      try {
        listener(message.data);
      } catch (error) {
        console.error(
          `Error in chat event listener for ${message.type}:`,
          error
        );
      }
    });
  }

  private addEventListener(type: ChatEventType, callback: Function) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type)!.push(callback);
  }

  onMessageReceived(callback: (data: { message: Message }) => void) {
    this.addEventListener("MESSAGE_RECEIVED", callback);
    return () => this.removeEventListener("MESSAGE_RECEIVED", callback);
  }

  onSystemNotification(
    callback: (data: { message: Message; targetUserId: string }) => void
  ) {
    this.addEventListener("SYSTEM_NOTIFICATION", callback);
    return () => this.removeEventListener("SYSTEM_NOTIFICATION", callback);
  }

  onConversationCreated(
    callback: (data: { conversation: Conversation }) => void
  ) {
    this.addEventListener("CONVERSATION_CREATED", callback);
    return () => this.removeEventListener("CONVERSATION_CREATED", callback);
  }

  private removeEventListener(type: ChatEventType, callback: Function) {
    const listeners = this.eventListeners.get(type) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(
        error.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return this.makeRequest<Conversation[]>(`/conversations/${userId}`);
  }

  async createDirectConversation(
    userId1: string,
    userId2: string,
    userName1: string,
    userName2: string
  ): Promise<Conversation> {
    return this.makeRequest<Conversation>("/conversations/direct", {
      method: "POST",
      body: JSON.stringify({ userId1, userId2, userName1, userName2 }),
    });
  }

  async getMessages(
    conversationId: string,
    userId: string
  ): Promise<Message[]> {
    return this.makeRequest<Message[]>(
      `/messages/${conversationId}?userId=${userId}`
    );
  }

  async sendMessage(data: {
    conversationId: string;
    senderId: string;
    senderName: string;
    content: string;
    type: "text" | "system" | "match-request";
  }): Promise<Message> {
    return this.makeRequest<Message>("/messages", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const chatAPI = new ChatAPI();

export function useChatRealtimeUpdates() {
  return {
    onMessageReceived: chatAPI.onMessageReceived.bind(chatAPI),
    onSystemNotification: chatAPI.onSystemNotification.bind(chatAPI),
    onConversationCreated: chatAPI.onConversationCreated.bind(chatAPI),
    isConnected: chatAPI.isConnected(),
  };
}
