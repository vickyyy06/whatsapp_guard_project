import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Contact, Message } from "./ChatInterface";
import { AlertTriangle, Users, User } from "lucide-react";

interface WarningModalProps {
  contact: Contact;
  message: Message;
  onConfirm: () => void;
  onCancel: () => void;
}

const WarningModal = ({ contact, message, onConfirm, onCancel }: WarningModalProps) => {
  return (
    <AlertDialog open={true} onOpenChange={onCancel}>
      <AlertDialogContent className="max-w-md shadow-strong">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full p-3 bg-warning/10">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <AlertDialogTitle className="text-xl">Confirm Message Send</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-4 pt-2">
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="text-sm font-medium text-foreground mb-2">Sending to:</p>
              <div className="flex items-center gap-2">
                {contact.type === "group" ? (
                  <Users className="h-5 w-5 text-primary" />
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
                <p className="text-base font-semibold text-foreground">
                  {contact.name}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {contact.type === "group" ? "Group Chat" : "Individual Chat"}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm font-medium text-foreground mb-2">Your message:</p>
              {message.text && (
                <p className="text-sm text-foreground italic mb-2">"{message.text}"</p>
              )}
              {message.fileUrl && (
                <p className="text-sm text-muted-foreground">
                  📎 {message.fileName || "Attached file"}
                </p>
              )}
            </div>

            {contact.isNew && (
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                <p className="text-sm text-warning font-medium">First Message</p>
                <p className="text-xs text-foreground/80 mt-1">
                  This is your first message to this contact.
                </p>
              </div>
            )}

            {contact.type === "group" && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary font-medium">Group Chat</p>
                <p className="text-xs text-foreground/80 mt-1">
                  This message will be sent to multiple people.
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel onClick={onCancel} className="sm:mr-0">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/90"
          >
            Send Message
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WarningModal;
