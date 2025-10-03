import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings2, Shield, AlertTriangle } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const SettingsPanel = () => {
  const {
    warningsEnabled,
    setWarningsEnabled,
    warningMode,
    setWarningMode,
    newContactWarning,
    setNewContactWarning,
    similarNameWarning,
    setSimilarNameWarning,
    groupWarning,
    setGroupWarning,
  } = useSettings();

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-medium">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Settings2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">General Settings</h2>
            <p className="text-sm text-muted-foreground">Configure warning preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="warnings-enabled" className="text-base font-medium">
                Enable Warnings
              </Label>
              <p className="text-sm text-muted-foreground">
                Show confirmation dialogs before sending messages
              </p>
            </div>
            <Switch
              id="warnings-enabled"
              checked={warningsEnabled}
              onCheckedChange={setWarningsEnabled}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-medium">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-warning/10 p-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Warning Triggers</h2>
            <p className="text-sm text-muted-foreground">Choose when to show warnings</p>
          </div>
        </div>

        <div className="space-y-6">
          <RadioGroup value={warningMode} onValueChange={setWarningMode} className="space-y-3">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <RadioGroupItem value="never" id="never" />
              <Label htmlFor="never" className="flex-1 cursor-pointer">
                <div className="font-medium">Never Show Warnings</div>
                <div className="text-sm text-muted-foreground">
                  Disable all warning prompts
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <RadioGroupItem value="always" id="always" />
              <Label htmlFor="always" className="flex-1 cursor-pointer">
                <div className="font-medium">Always Show Warnings</div>
                <div className="text-sm text-muted-foreground">
                  Confirm every message before sending
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-primary/5 border-2 border-primary">
              <RadioGroupItem value="smart" id="smart" />
              <Label htmlFor="smart" className="flex-1 cursor-pointer">
                <div className="font-medium">Smart Mode (Recommended)</div>
                <div className="text-sm text-muted-foreground">
                  Warn for new contacts and groups
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="flex-1 cursor-pointer">
                <div className="font-medium">Custom Rules</div>
                <div className="text-sm text-muted-foreground">
                  Configure specific warning conditions
                </div>
              </Label>
            </div>
          </RadioGroup>

          {warningMode === "custom" && (
            <div className="space-y-4 mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                <Label htmlFor="new-contact" className="text-sm font-medium">
                  Warn for new contacts
                </Label>
                <Switch
                  id="new-contact"
                  checked={newContactWarning}
                  onCheckedChange={setNewContactWarning}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                <Label htmlFor="similar-name" className="text-sm font-medium">
                  Warn for similar names
                </Label>
                <Switch
                  id="similar-name"
                  checked={similarNameWarning}
                  onCheckedChange={setSimilarNameWarning}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                <Label htmlFor="group-warning" className="text-sm font-medium">
                  Always warn for groups
                </Label>
                <Switch
                  id="group-warning"
                  checked={groupWarning}
                  onCheckedChange={setGroupWarning}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

    </div>
  );
};

export default SettingsPanel;
