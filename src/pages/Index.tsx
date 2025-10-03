import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Settings } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import SettingsPanel from "@/components/SettingsPanel";
import { SettingsProvider } from "@/contexts/SettingsContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-muted">
        {/* Header */}
        <header className="bg-primary text-primary-foreground shadow-medium">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded p-1">
                <img src="/pngtree-whatsapp-icon-png-image_3584844.jpg" alt="WhatsApp Guard Logo" className="h-8 w-8" />
              </div>
              <h1 className="text-xl font-semibold">WhatsApp Guard</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-card">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Chats</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <ChatInterface />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SettingsProvider>
  );
};

export default Index;
