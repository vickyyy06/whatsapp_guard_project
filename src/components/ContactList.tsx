import { Contact } from "./ChatInterface";
import { Users, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

const ContactList = ({ contacts, selectedContact, onSelectContact }: ContactListProps) => {
  return (
    <div>
      <div className="p-4 border-b border-border bg-muted/30">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Chats</h2>
      </div>
      <div className="divide-y divide-border">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedContact?.id === contact.id ? "bg-muted" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                {contact.type === "group" ? (
                  <Users className="h-6 w-6 text-primary" />
                ) : (
                  <User className="h-6 w-6 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
                  {contact.isNew && (
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                      New
                    </Badge>
                  )}
                </div>
                {contact.lastMessage && (
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                12:30
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
