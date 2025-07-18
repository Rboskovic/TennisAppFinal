import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Users,
  Bell,
  User,
  Check,
  CheckCheck,
  MessageCircle,
  Hash,
  Trophy,
  Phone,
  Video,
  Info,
  Wifi,
  WifiOff,
  Camera,
  Calendar,
  CheckCircle,
  Pin,
  Search,
  Plus,
  Shield,
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
  const [activeFilter, setActiveFilter] = useState<"sve" | "neprocitano" | "igraci" | "grupe">("sve");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Mock current user - in production this would come from auth
  const currentUser = {
    id: "user-123",
    name: "Ana Marković",
    avatar: "🎾",
    rating: 1650,
    club: "Baseline Tennis",
  };

  const chatRealtimeUpdates = useChatRealtimeUpdates();

  useEffect(() => {
    loadConversations();

    const playerParam = searchParams.get("player");
    const clubParam = searchParams.get("club");

    if (playerParam) {
      const directConv = conversations.find((c) => 
        c.type === "direct" && c.name === playerParam
      );
      if (directConv) {
        setSelectedConversation(directConv);
        loadMessages(directConv.id);
      }
    }

    if (clubParam) {
      const clubConv = conversations.find((c) => c.id === `club-${clubParam}`);
      if (clubConv) {
        setSelectedConversation(clubConv);
        loadMessages(clubConv.id);
      }
    }

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
    if (conversation.name) {
      return conversation.name
        .replace(/\s*-\s*Grupni chat$/i, "")
        .replace(/\s*Tennis$/i, "")
        .replace(/Baseline/i, "Baseline")
        .replace(/Privilege/i, "Privilege")
        .replace(/Trim/i, "Trim")
        .replace(/Tipsarevic/i, "Tipsarevic");
    }
    if (conversation.type === "direct" && conversation.participantNames) {
      const otherUserId = conversation.participants.find(
        (p) => p !== currentUser.id
      );
      return conversation.participantNames[otherUserId!] || "Nepoznat igrač";
    }
    return "Nepoznat chat";
  };

  const getConversationAvatar = (conversation: Conversation) => {
    switch (conversation.type) {
      case "system":
        return "🔔";
      case "group":
        return "🎾";
      default:
        return "🎾";
    }
  };

  const getPlayerRating = (conversation: Conversation) => {
    if (conversation.type === "direct") {
      return Math.floor(Math.random() * 500) + 1200;
    }
    return null;
  };

  const getTotalUnreadCount = (type: "direct" | "group") => {
    return conversations
      .filter((conv) => conv.type === type || (type === "direct" && conv.type === "system"))
      .reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const getMessageSenderName = (message: Message) => {
    if (message.content.startsWith("[ADMIN]") || message.content.startsWith("[URGENT]")) {
      return "Baseline Tennis";
    }
    if (message.content.startsWith("[REZERVACIJE:")) {
      return "Baseline Tennis";
    }
    if (message.content.startsWith("[MODERATOR]") || message.content.startsWith("[BASELINE]")) {
      return "Baseline Tennis";
    }
    return message.senderName;
  };

  const formatMessageContent = (content: string) => {
    // Handle @rezervacije mentions with better formatting
    const rezervacijeRegex = /@rezervacije\s+(\d{4}-\d{2}-\d{2})/g;
    const parts = content.split(rezervacijeRegex);
    
    if (parts.length > 1) {
      return (
        <span>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              // This is a date part - make it more visible
              return (
                <span key={index} className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold mx-1 shadow-md">
                  @rezervacije <span className="ml-1 font-black">{part}</span>
                </span>
              );
            }
            return part;
          })}
        </span>
      );
    }
    
    return content;
  };

  // Check if we should show timestamp (last message in a group from same sender)
  const shouldShowTimestamp = (message: Message, index: number) => {
    if (index === messages.length - 1) return true; // Always show for last message
    
    const nextMessage = messages[index + 1];
    if (!nextMessage) return true;
    
    // Show timestamp if next message is from different sender
    return message.senderId !== nextMessage.senderId;
  };

  // Filter conversations by type and filter
  const directConversations = conversations.filter(
    (conv) => conv.type === "direct" || conv.type === "system"
  );
  const groupConversations = conversations.filter(
    (conv) => conv.type === "group"
  );

  const getFilteredConversations = () => {
    let convs = conversations;
    
    switch (activeFilter) {
      case "neprocitano":
        convs = conversations.filter(conv => conv.unreadCount > 0);
        break;
      case "igraci":
        convs = directConversations;
        break;
      case "grupe":
        convs = groupConversations;
        break;
      default:
        convs = conversations;
    }
    
    return convs.sort((a, b) => {
      if (a.type === "group" && b.type !== "group") return -1;
      if (a.type !== "group" && b.type === "group") return 1;
      return 0;
    });
  };

  const filteredConversations = getFilteredConversations();

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col pb-20 relative">
      {!selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Header with Tennis Background */}
          <div 
            className="relative text-white"
            style={{
              backgroundImage: `url('/images/tennis-bg.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-emerald-600/80"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center">
                  <button onClick={() => navigate("/")} className="mr-3">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-lg font-semibold">Poruke</h1>
                    {chatRealtimeUpdates.isConnected ? (
                      <div className="flex items-center text-emerald-100 text-xs">
                        <Wifi className="w-3 h-3 mr-1" />
                        <span>Uživo</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-emerald-200 text-xs">
                        <WifiOff className="w-3 h-3 mr-1" />
                        <span>Offline</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Search className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Filter Navigation - Better contrast */}
              <div className="px-4 pb-4">
                <div className="flex gap-2 overflow-x-auto">
                  <button
                    onClick={() => setActiveFilter("sve")}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${
                      activeFilter === "sve"
                        ? "bg-white text-emerald-700 shadow-lg border-white"
                        : "bg-emerald-500/30 text-white border-white/30 hover:bg-emerald-500/50"
                    }`}
                  >
                    Sve poruke
                  </button>
                  <button
                    onClick={() => setActiveFilter("neprocitano")}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${
                      activeFilter === "neprocitano"
                        ? "bg-white text-emerald-700 shadow-lg border-white"
                        : "bg-emerald-500/30 text-white border-white/30 hover:bg-emerald-500/50"
                    }`}
                  >
                    Nepročitano
                  </button>
                  <button
                    onClick={() => setActiveFilter("igraci")}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${
                      activeFilter === "igraci"
                        ? "bg-white text-emerald-700 shadow-lg border-white"
                        : "bg-emerald-500/30 text-white border-white/30 hover:bg-emerald-500/50"
                    }`}
                  >
                    Igrači
                  </button>
                  <button
                    onClick={() => setActiveFilter("grupe")}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${
                      activeFilter === "grupe"
                        ? "bg-white text-emerald-700 shadow-lg border-white"
                        : "bg-emerald-500/30 text-white border-white/30 hover:bg-emerald-500/50"
                    }`}
                  >
                    Grupe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto pb-20">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎾</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nema poruka
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {activeFilter === "neprocitano" ? "Nema nepročitanih poruka" : "Počnite razgovor sa drugim teniserima"}
                </p>
              </div>
            ) : (
              <div className="px-1">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      loadMessages(conversation.id);
                    }}
                    className="w-full bg-white border-b border-gray-100 hover:bg-emerald-50 transition-colors"
                  >
                    <div className="flex items-start px-4 py-3 space-x-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                            conversation.type === "system"
                              ? "bg-blue-100 text-blue-600"
                              : conversation.type === "group"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {getConversationAvatar(conversation)}
                        </div>
                        {conversation.type === "direct" && onlineUsers.includes(conversation.id) && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          {/* Left side - Name and rating */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {getConversationName(conversation)}
                              </h3>
                              {conversation.type === "direct" && (
                                <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                                  {getPlayerRating(conversation)}
                                </span>
                              )}
                            </div>
                            
                            {/* Last message - 2 rows */}
                            <div className="text-left">
                              {conversation.lastMessage ? (
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                                    <span className="font-medium">
                                      {getMessageSenderName({
                                        content: conversation.lastMessage,
                                        senderName: "Korisnik"
                                      } as Message)}:
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600 truncate">
                                    {conversation.lastMessage.replace(/^\[.*?\]\s*/, "")}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-xs text-gray-400 italic">
                                  {conversation.type === "direct" ? "Počnite razgovor" : "Nema poruka"}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right side - Members and time */}
                          <div className="flex flex-col items-end space-y-1 ml-3 flex-shrink-0">
                            {conversation.type === "group" && (
                              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                                {conversation.participants.length} članova
                              </span>
                            )}
                            {conversation.lastMessageTime && (
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.lastMessageTime)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Typing indicator */}
                        {typingUsers.length > 0 && conversation.id === selectedConversation?.id && (
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            </div>
                            <span className="text-xs text-emerald-600">kuca...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Floating New Message Button - Fixed positioning */}
          <div className="fixed bottom-24 right-4 z-50">
            <button
              onClick={() => navigate("/ranking")}
              className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
              style={{ marginBottom: '0px' }}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        // Conversation View
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center">
              <button
                onClick={() => {
                  setSelectedConversation(null);
                  setMessages([]);
                }}
                className="mr-3"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                  {getConversationAvatar(selectedConversation)}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {getConversationName(selectedConversation)}
                  </h2>
                  {selectedConversation.type === "group" && (
                    <p className="text-xs text-white/80">
                      {selectedConversation.participants.length} članova • {selectedConversation.clubId}
                    </p>
                  )}
                  {selectedConversation.type === "direct" && (
                    <div className="flex items-center space-x-2 text-xs text-white/80">
                      <span>Rating: {getPlayerRating(selectedConversation)}</span>
                      <span>•</span>
                      <span>Aktivan sada</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedConversation.type === "direct" && (
                <>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Calendar className="w-5 h-5" />
                  </button>
                </>
              )}
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-1">
            {messages.map((message, index) => {
              const isOwnMessage = message.senderId === currentUser.id;
              const isSystem = message.type === "system";
              const isUrgentMessage = message.content.startsWith("[URGENT]");
              const isAdminMessage = message.content.startsWith("[ADMIN]") || message.content.startsWith("[URGENT]") || message.content.startsWith("[BASELINE]") || message.content.startsWith("[MODERATOR]");
              const isReservationMessage = message.content.includes("[REZERVACIJE:");
              const isPinnedMessage = message.content.includes("[PINNED]");
              const showAvatar = !isOwnMessage && (index === 0 || messages[index - 1].senderId !== message.senderId);
              const showTimestamp = shouldShowTimestamp(message, index);

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  } ${index > 0 && messages[index - 1].senderId === message.senderId ? "mt-1" : "mt-4"}`}
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
                      className={`flex max-w-xs ${
                        isOwnMessage ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      {!isOwnMessage && (
                        <div className={`flex-shrink-0 ${isOwnMessage ? "ml-2" : "mr-2"}`}>
                          {showAvatar ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm">
                              🎾
                            </div>
                          ) : (
                            <div className="w-8"></div>
                          )}
                        </div>
                      )}

                      <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
                        {!isOwnMessage && showAvatar && (
                          <div className="flex items-center space-x-2 mb-1 px-2">
                            <p className="text-xs text-gray-600">
                              {getMessageSenderName(message)}
                            </p>
                            {isAdminMessage && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                <Shield className="w-3 h-3 mr-1" />
                                ADMIN
                              </span>
                            )}
                            {isReservationMessage && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <Calendar className="w-3 h-3 mr-1" />
                                REZERVACIJE
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-full break-words ${
                            isUrgentMessage
                              ? "bg-red-600 text-white rounded-bl-sm shadow-lg border-2 border-red-700"
                              : isOwnMessage
                              ? "bg-emerald-600 text-white rounded-br-sm"
                              : "bg-white text-gray-800 rounded-bl-sm shadow-sm border"
                          }`}
                        >
                          <div className="text-sm">
                            {formatMessageContent(message.content.replace(/^\[.*?\]\s*/, ""))}
                          </div>
                        </div>
                        
                        {/* Only show timestamp for last message in group */}
                        {showTimestamp && (
                          <div
                            className={`flex items-center mt-1 px-2 ${
                              isOwnMessage ? "flex-row-reverse space-x-reverse space-x-1" : "space-x-1"
                            }`}
                          >
                            <span className="text-xs text-gray-500">
                              {formatTime(message.createdAt)}
                            </span>
                            {isOwnMessage && (
                              <div className="text-emerald-600">
                                {message.readBy.length > 1 ? (
                                  <CheckCheck className="w-3 h-3" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )}
                              </div>
                            )}
                          </div>
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
          <div className="bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex items-end space-x-3">
              <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
              
              <div className="flex-1">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={
                      selectedConversation?.type === "direct"
                        ? "Pošaljite poruku..."
                        : "Ukucajte poruku u grupu..."
                    }
                    className="flex-1 bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className={`p-3 rounded-full transition-all ${
                  newMessage.trim()
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
