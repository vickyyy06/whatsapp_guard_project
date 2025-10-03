import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Image as ImageIcon, Video } from "lucide-react";
import { Message } from "./ChatInterface";

interface MessageComposerProps {
  onSend: (message: Message) => void;
}

const MessageComposer = ({ onSend }: MessageComposerProps) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || selectedFile) {
      const messageData: Message = {
        text: message,
        sender: "me",
        timestamp: new Date(),
      };

      if (selectedFile) {
        const fileUrl = URL.createObjectURL(selectedFile);
        messageData.fileUrl = fileUrl;
        messageData.fileName = selectedFile.name;
        
        if (selectedFile.type.startsWith("image/")) {
          messageData.fileType = "image";
        } else if (selectedFile.type.startsWith("video/")) {
          messageData.fileType = "video";
        } else {
          messageData.fileType = "document";
        }
      }

      onSend(messageData);
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="border-t border-border p-3 bg-muted/50">
      {selectedFile && (
        <div className="mb-2 p-2 bg-background rounded-lg flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-primary" />
          <span className="text-sm truncate flex-1">{selectedFile.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFile(null)}
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      )}
      <div className="flex gap-2 items-end">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-muted-foreground hover:text-primary"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="min-h-[42px] max-h-[120px] resize-none"
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim() && !selectedFile}
          size="icon"
          className="bg-primary hover:bg-primary/90 rounded-full h-10 w-10"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessageComposer;
