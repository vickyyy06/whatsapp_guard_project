import { useState } from "react";
import { Card } from "@/components/ui/card";
import ContactList from "./ContactList";
import MessageComposer from "./MessageComposer";
import WarningModal from "./WarningModal";
import { MessageCircle } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

export interface Contact {
  id: string;
  name: string;
  type: "individual" | "group";
  isNew: boolean;
  lastMessage?: string;
  avatar?: string;
  isGuarded?: boolean;
}

export interface Message {
  text: string;
  sender: "me" | "them";
  timestamp: Date;
  fileUrl?: string;
  fileName?: string;
  fileType?: "image" | "video" | "document";
}

const initialContacts: Contact[] = [
  { id: "1", name: "Office Team", type: "group", isNew: false, lastMessage: "Meeting at 3 PM", isGuarded: true },
  { id: "2", name: "Office Friends", type: "group", isNew: false, lastMessage: "Let's grab lunch" },
  { id: "3", name: "Mom", type: "individual", isNew: false, lastMessage: "Love you!", isGuarded: false },
  { id: "4", name: "New Client", type: "individual", isNew: true },
  { id: "5", name: "Project Team A", type: "group", isNew: false },
  { id: "6", name: "Dad", type: "individual", isNew: false, lastMessage: "On my way" },
];

const ChatInterface = () => {
  const { warningsEnabled, warningMode, newContactWarning, groupWarning } = useSettings();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const toggleContactGuard = (contactId: string) => {
    setContacts(currentContacts =>
      currentContacts.map(contact =>
        contact.id === contactId
          ? { ...contact, isGuarded: contact.isGuarded === undefined ? true : !contact.isGuarded }
          : contact
      )
    );
  };

  const handleSendMessage = (message: Message) => {
    if (!selectedContact) return;

    let shouldWarn = false;

    // Per-contact setting takes the highest priority.
    if (typeof selectedContact.isGuarded === 'boolean') {
      shouldWarn = selectedContact.isGuarded;
    } else {
      // Fallback to global settings if per-contact is not explicitly set.
      if (warningsEnabled) {
        if (warningMode === "always") {
          shouldWarn = true;
        } else if (warningMode === "smart") {
          shouldWarn = selectedContact.isNew || selectedContact.type === "group";
        } else if (warningMode === "custom") {
          if (newContactWarning && selectedContact.isNew) shouldWarn = true;
          if (groupWarning && selectedContact.type === "group") shouldWarn = true;
        }
      }
    }

    if (shouldWarn) {
      setPendingMessage(message);
      setShowWarning(true);
    } else {
      confirmSend(message);
    }
  };

  const confirmSend = (message: Message) => {
    setMessages(prev => [...prev, { ...message, sender: "me", timestamp: new Date() }]);
    setPendingMessage(null);
    setShowWarning(false);
  };

  const cancelSend = () => {
    setPendingMessage(null);
    setShowWarning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[calc(100vh-180px)]">
      {/* Contact List */}
      <Card className="lg:col-span-1 p-0 shadow-soft overflow-y-auto bg-card">
        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          onToggleGuard={toggleContactGuard}
        />
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2 flex flex-col shadow-soft overflow-hidden">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-border p-3 bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedContact.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.type === "group" ? "Group chat" : "online"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0gMCwxMDAgTCAyMDAsMTAwIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mb-2 opacity-30" />
                  <p className="text-sm">No messages yet</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-3 py-2 shadow-soft ${
                        msg.sender === "me"
                          ? "bg-[hsl(var(--message-bubble-me))] text-foreground"
                          : "bg-[hsl(var(--message-bubble-them))] text-foreground"
                      }`}
                    >
                      {msg.fileUrl && (
                        <div className="mb-2">
                          {msg.fileType === "image" ? (
                            <img src={msg.fileUrl} alt={msg.fileName} className="rounded max-w-full h-auto" />
                          ) : msg.fileType === "video" ? (
                            <video src={msg.fileUrl} controls className="rounded max-w-full" />
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-background/50 rounded">
                              <span className="text-xs">{msg.fileName}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {msg.text && <p className="text-sm">{msg.text}</p>}
                      <span className="text-xs opacity-60 mt-1 block">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Composer */}
            <MessageComposer onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/30">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">WhatsApp Guard</p>
              <p className="text-sm mt-2">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </Card>

      {/* Warning Modal */}
      {showWarning && selectedContact && pendingMessage && (
        <WarningModal
          contact={selectedContact}
          message={pendingMessage}
          onConfirm={() => confirmSend(pendingMessage)}
          onCancel={cancelSend}
        />
      )}
    </div>
  );
};

export default ChatInterface;
