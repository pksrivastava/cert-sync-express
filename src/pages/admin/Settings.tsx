import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Platform <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Configure marketplace settings and preferences
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage marketplace configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" defaultValue="MSP Learning Marketplace" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" defaultValue="support@msp.com" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Partner Auto-Approval</Label>
              <p className="text-sm text-muted-foreground">Automatically approve new partner registrations</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
            </div>
            <Switch />
          </div>

          <Button className="shadow-glow">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Enrollment Settings</CardTitle>
          <CardDescription>Configure enrollment and access policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="default-limit">Default Enrollment Limit</Label>
            <Input id="default-limit" type="number" defaultValue="1000" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Approval for Paid Courses</Label>
              <p className="text-sm text-muted-foreground">Admin approval needed before learners can enroll in paid courses</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Button className="shadow-glow">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
