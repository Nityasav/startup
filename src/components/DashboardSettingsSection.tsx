
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function DashboardSettingsSection() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          <Settings className="inline-block mr-2" />
          Settings
        </CardTitle>
        <CardDescription>Configure your dashboard preferences and account settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-base mb-1">Notification Preferences</h3>
            <div className="flex gap-4">
              <Button variant="secondary">Enable Email Alerts</Button>
              <Button variant="secondary">Enable SMS Alerts</Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-1">Account</h3>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
