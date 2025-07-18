import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Search,
  Users,
  Bell,
  User,
  Check,
  CheckCheck,
} from "lucide-react";
import {
  chatAPI,
  useChatRealtimeUpdates,
  type Conversation,
  type Message,
} from "../services/chatApi";

export default function ChatScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock current user - in production this would come from auth
  const currentUser = {
    id: "user-123",
    name: "Marko Petrović",
  };

  const chatRealtimeUpdates = useChatRealtimeUpdates();

  useEffect(() => {
    loadConversations();

    // Check if we need to open a specific conversation
    const playerParam = searchParams.get("player");
    const clubParam = searchParams.get("club");

    if (clubParam) {
      // Find and open club group chat
      const clubConv = conversations.find((c) => c.id === `club-${clubParam}`);
      if (clubConv) {
        setSelectedConversation(clubConv);
        loadMessages(clubConv.id);
      }
    }

    // Setup real-time listeners
    const unsubscribeMessage = chatRealtimeUpdates.onMessageReceived(
      (data: { message: Message }) => {
        if (
          selectedConversation &&
          data.message.conversationId === selectedConversation.id
        ) {
          setMessages((prev) => [...prev, data.message]);
          scrollToBottom();
        }
        updateConversationWithNewMessage(data.message);
      }
    );

    const unsubscribeNotification = chatRealtimeUpdates.onSystemNotification(
      (data: { message: Message; targetUserId: string }) => {
        if (data.targetUserId === currentUser.id) {
          updateConversationWithNewMessage(data.message);
        }
      }
    );

    return () => {
      unsubscribeMessage();
      unsubscribeNotification();
    };
  }, [selectedConversation, searchParams]);

  const loadConversations = async () => {
    try {
      const data = await chatAPI.getConversations(currentUser.id);
      setConversations(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading conversations:", error);
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const data = await chatAPI.getMessages(conversationId, currentUser.id);
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const message = await chatAPI.sendMessage({
        conversationId: selectedConversation.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        content: newMessage.trim(),
        type: "text",
      });

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      scrollToBottom();
      updateConversationWithNewMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateConversationWithNewMessage = (message: Message) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === message.conversationId) {
          return {
            ...conv,
            lastMessage: message.content,
            lastMessageTime: message.createdAt,
            unreadCount:
              conv.id === selectedConversation?.id ? 0 : conv.unreadCount + 1,
          };
        }
        return conv;
      })
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Sada";
    if (diffMins < 60) return `pre ${diffMins} min`;
    if (diffHours < 24) return `pre ${diffHours}h`;
    if (diffDays < 7) return `pre ${diffDays}d`;

    return date.toLocaleDateString("sr-RS", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.name) return conversation.name;
    if (conversation.type === "direct" && conversation.participantNames) {
      const otherUserId = conversation.participants.find(
        (p) => p !== currentUser.id
      );
      return conversation.participantNames[otherUserId!] || "Nepoznat korisnik";
    }
    return "Nepoznat chat";
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Bell className="w-5 h-5" />;
      case "group":
        return <Users className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const name = getConversationName(conv).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col pb-20">
      {!selectedConversation ? (
        // Conversation List View
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-emerald-600 text-white">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <button onClick={() => navigate("/")} className="mr-3">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-semibold">Poruke</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pretraži poruke..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 backdrop-blur-sm placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation);
                  loadMessages(conversation.id);
                }}
                className="w-full bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center px-4 py-3">
                  <div className="flex-shrink-0 mr-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        conversation.type === "system"
                          ? "bg-blue-100 text-blue-600"
                          : conversation.type === "group"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {getConversationIcon(conversation.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {getConversationName(conversation)}
                      </h3>
                      {conversation.lastMessageTime && (
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage || "Nema poruka"}
                    </p>
                  </div>

                  {conversation.unreadCount > 0 && (
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-emerald-600 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}

            {filteredConversations.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nema pronađenih poruka</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Conversation View
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-emerald-600 text-white px-4 py-3 flex items-center shadow-md">
            <button
              onClick={() => {
                setSelectedConversation(null);
                setMessages([]);
              }}
              className="mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="font-semibold">
                {getConversationName(selectedConversation)}
              </h2>
              {selectedConversation.type === "group" &&
                selectedConversation.clubId && (
                  <p className="text-xs text-white/80">
                    {selectedConversation.participants.length} članova
                  </p>
                )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
            {messages.map((message) => {
              const isOwnMessage = message.senderId === currentUser.id;
              const isSystem = message.type === "system";

              return (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {isSystem ? (
                    <div className="max-w-xs mx-auto">
                      <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-center">
                        <Bell className="w-4 h-4 inline-block mr-1" />
                        <span className="text-sm">{message.content}</span>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`max-w-xs ${
                        isOwnMessage ? "items-end" : "items-start"
                      }`}
                    >
                      {!isOwnMessage && (
                        <p className="text-xs text-gray-600 mb-1 px-2">
                          {message.senderName}
                        </p>
                      )}
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isOwnMessage
                            ? "bg-emerald-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div
                        className={`flex items-center mt-1 px-2 ${
                          isOwnMessage ? "justify-end" : "justify-start"
                        }`}
                      >
                        <p className="text-xs text-gray-500">
                          {formatTime(message.createdAt)}
                        </p>
                        {isOwnMessage && (
                          <span className="ml-1">
                            {message.readBy.length > 1 ? (
                              <CheckCheck className="w-3 h-3 text-blue-500" />
                            ) : (
                              <Check className="w-3 h-3 text-gray-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {selectedConversation.type !== "system" && (
            <div className="bg-white border-t border-gray-200 px-4 py-3">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Napišite poruku..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`ml-2 p-2 rounded-full transition-colors ${
                    newMessage.trim()
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
