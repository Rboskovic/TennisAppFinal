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
  MessageSquare,
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
  const [activeFilter, setActiveFilter] = useState<
    "sve" | "neprocitano" | "igraci" | "grupe"
  >("sve");
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
      const directConv = conversations.find(
        (c) => c.type === "direct" && c.name === playerParam
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
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateConversationWithNewMessage = (message: Message) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === message.conversationId
          ? {
              ...conv,
              lastMessage: message.content,
              lastMessageTime: message.createdAt,
              unreadCount: conv.unreadCount + 1,
            }
          : conv
      )
    );
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("sr-RS", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === "system") {
      return "Zvanična obaveštenja";
    }
    if (conversation.type === "group") {
      return conversation.name || "Grupni chat";
    }
    if (conversation.type === "direct") {
      return (
        conversation.participantNames?.[
          conversation.participants.find((p) => p !== currentUser.id) || ""
        ] || "Nepoznat igrač"
      );
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
      .filter(
        (conv) =>
          conv.type === type || (type === "direct" && conv.type === "system")
      )
      .reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const getMessageSenderName = (message: Message) => {
    // Check if message starts with admin prefixes
    if (
      message.content.startsWith("[ADMIN]") ||
      message.content.startsWith("[URGENT]")
    ) {
      return "Baseline Tennis";
    }
    if (
      message.content.startsWith("[REZERVACIJE:") ||
      message.content.includes("[REZERVACIJE:")
    ) {
      return "Baseline Tennis";
    }
    if (
      message.content.startsWith("[MODERATOR]") ||
      message.content.startsWith("[BASELINE]")
    ) {
      return "Baseline Tennis";
    }
    // Check sender name for admin users
    if (
      message.senderName.includes("TENNIS") ||
      message.senderName.includes("BASELINE")
    ) {
      return "Baseline Tennis";
    }
    return message.senderName;
  };

  const formatMessageContent = (content: string) => {
    // Handle @rezervacije mentions with enhanced power feature styling
    const rezervacijeRegex = /@rezervacije\s+(\d{4}-\d{2}-\d{2})/g;
    const parts = content.split(rezervacijeRegex);

    if (parts.length > 1) {
      return (
        <span>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              // This is a date part - style as premium power feature
              return (
                <span
                  key={index}
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-bold mx-1 shadow-lg border-2 border-blue-300"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  rezervacije
                  <span className="ml-1 font-black bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {part}
                  </span>
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
        convs = conversations.filter((conv) => conv.unreadCount > 0);
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
                      <div className="flex items-center space-x-1 text-xs text-emerald-100">
                        <Wifi className="w-3 h-3" />
                        <span>Online</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-xs text-red-200">
                        <WifiOff className="w-3 h-3" />
                        <span>Offline</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/ranking")}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Filter tabs with improved badges */}
              <div className="px-4 pb-4">
                <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setActiveFilter("sve")}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${
                      activeFilter === "sve"
                        ? "bg-white text-emerald-700 shadow-lg border-white"
                        : "bg-emerald-500/30 text-white border-white/30 hover:bg-emerald-500/50"
                    }`}
                  >
                    Sve
                  </button>
                  <button
                    onClick={() => setActiveFilter("neprocitano")}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 relative ${
                      activeFilter === "neprocitano"
                        ? "bg-white text-emerald-700 shadow-lg border-white"
                        : "bg-emerald-500/30 text-white border-white/30 hover:bg-emerald-500/50"
                    }`}
                  >
                    Nepročitano
                    {conversations.filter((conv) => conv.unreadCount > 0)
                      .length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {
                          conversations.filter((conv) => conv.unreadCount > 0)
                            .length
                        }
                      </span>
                    )}
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
                  {activeFilter === "neprocitano"
                    ? "Nema nepročitanih poruka"
                    : "Počnite razgovor sa drugim teniserima"}
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
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {getConversationAvatar(conversation)}
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conversation.unreadCount > 9
                              ? "9+"
                              : conversation.unreadCount}
                          </div>
                        )}
                      </div>

                      {/* Conversation Info */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {getConversationName(conversation)}
                          </h3>

                          {/* Improved Member Count Display with Icon */}
                          <div className="flex items-center space-x-2">
                            {conversation.type === "group" && (
                              <div className="flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                <Users className="w-3 h-3" />
                                <span className="text-xs font-medium">
                                  {conversation.participants.length}
                                </span>
                              </div>
                            )}
                            {conversation.lastMessageTime && (
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.lastMessageTime)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-2">
                            {conversation.lastMessage ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center space-x-1 text-xs text-gray-600">
                                  <span className="font-medium">
                                    {getMessageSenderName({
                                      content: conversation.lastMessage,
                                      senderName: "Korisnik",
                                    } as Message)}
                                    :
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 truncate">
                                  {conversation.lastMessage.replace(
                                    /^\[.*?\]\s*/,
                                    ""
                                  )}
                                </p>
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">
                                {conversation.type === "direct"
                                  ? "Počnite razgovor"
                                  : "Nema poruka"}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Typing indicator */}
                        {typingUsers.length > 0 &&
                          conversation.id === selectedConversation?.id && (
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                              <span className="text-xs text-emerald-600">
                                kuca...
                              </span>
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
              style={{ marginBottom: "0px" }}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        // Conversation View - FIXED LAYOUT FOR PROPER SCROLLING
        <div className="h-full flex flex-col">
          {/* Chat Header - Fixed at top */}
          <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
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
                    <div className="flex items-center space-x-2 text-xs text-white/80">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>
                          {selectedConversation.participants.length} članova
                        </span>
                      </div>
                      <span>•</span>
                      <span>{selectedConversation.clubId}</span>
                    </div>
                  )}
                  {selectedConversation.type === "direct" && (
                    <div className="flex items-center space-x-2 text-xs text-white/80">
                      <span>
                        Rating: {getPlayerRating(selectedConversation)}
                      </span>
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
                </>
              )}
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container - Scrollable area with proper height */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 scrollbar-thin">
            {messages.map((message, index) => {
              const isOwnMessage = message.senderId === currentUser.id;
              const showTimestamp = shouldShowTimestamp(message, index);
              const isSystem = message.type === "system";

              // Admin message detection
              const isUrgentMessage = message.content.startsWith("[URGENT]");
              const isAdminMessage =
                message.content.startsWith("[ADMIN]") ||
                message.content.startsWith("[URGENT]") ||
                message.content.startsWith("[BASELINE]") ||
                message.content.startsWith("[MODERATOR]");
              const isReservationMessage =
                message.content.includes("[REZERVACIJE:") ||
                message.content.includes("@rezervacije");
              const isPinnedMessage = message.content.includes("[PINNED]");

              return (
                <div key={message.id} className="mb-4">
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
                  ) : !isOwnMessage ? (
                    <div className="flex items-start space-x-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          isAdminMessage
                            ? isUrgentMessage
                              ? "bg-red-600 text-white"
                              : "bg-emerald-600 text-white"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {isAdminMessage ? "🎾" : message.senderName.charAt(0)}
                      </div>
                      <div className="flex-1 max-w-[75%]">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium text-gray-700">
                            {isAdminMessage
                              ? getMessageSenderName(message)
                              : message.senderName}
                          </span>

                          {/* Admin Badge */}
                          {isAdminMessage && (
                            <div className="flex items-center space-x-1">
                              <Shield
                                className={`w-3 h-3 ${
                                  isUrgentMessage
                                    ? "text-red-600"
                                    : "text-emerald-600"
                                }`}
                              />
                              <span
                                className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                                  isUrgentMessage
                                    ? "bg-red-100 text-red-700"
                                    : "bg-emerald-100 text-emerald-700"
                                }`}
                              >
                                {isUrgentMessage ? "URGENT" : "ADMIN"}
                              </span>
                            </div>
                          )}

                          {/* Reservation Badge */}
                          {isReservationMessage && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                                REZERVACIJE
                              </span>
                            </div>
                          )}

                          <span className="text-xs text-gray-500">
                            {formatTime(message.createdAt)}
                          </span>
                        </div>

                        <div
                          className={`px-4 py-3 rounded-lg shadow-sm ${
                            isAdminMessage
                              ? isUrgentMessage
                                ? "bg-red-600 text-white border-2 border-red-700 shadow-lg animate-pulse"
                                : "bg-emerald-600 text-white border-2 border-emerald-700"
                              : isReservationMessage
                              ? "bg-blue-600 text-white border-2 border-blue-700"
                              : "bg-white border border-gray-200 text-gray-800"
                          }`}
                        >
                          <div
                            className={`text-sm ${
                              isAdminMessage || isReservationMessage
                                ? "font-medium"
                                : ""
                            }`}
                          >
                            {formatMessageContent(
                              isAdminMessage ||
                                isReservationMessage ||
                                isPinnedMessage
                                ? message.content.replace(/^\[.*?\]\s*/, "")
                                : message.content
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="max-w-[75%]">
                        <div className="bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-sm">
                          <div className="text-sm">
                            {formatMessageContent(message.content)}
                          </div>
                        </div>

                        {/* Only show timestamp for last message in group */}
                        {showTimestamp && (
                          <div className="flex items-center justify-end mt-1 space-x-1">
                            <span className="text-xs text-gray-500">
                              {formatTime(message.createdAt)}
                            </span>
                            <div className="text-emerald-600">
                              {message.readBy.length > 1 ? (
                                <CheckCheck className="w-3 h-3" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                            </div>
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

          {/* Message Input - Fixed at bottom */}
          <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
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
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:scale-105"
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
