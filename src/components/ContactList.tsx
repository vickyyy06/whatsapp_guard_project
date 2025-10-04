import { Contact } from "./ChatInterface";
import { Users, User, Shield, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  onToggleGuard: (contactId: string) => void;
}

const ContactList = ({ contacts, selectedContact, onSelectContact, onToggleGuard }: ContactListProps) => {
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
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">12:30</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleGuard(contact.id);
                  }}
                  title={contact.isGuarded ? "Disable Guard" : "Enable Guard"}
                >
                  {contact.isGuarded ? (
                    <Shield className="h-4 w-4 text-primary" />
                  ) : (
                    <ShieldOff className="h-4 w-4 text-muted-foreground/60" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
