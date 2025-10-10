import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, CreditCard } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();

  const handleSaveRevenue = () => {
    toast({
      title: "Revenue Settings Saved",
      description: "Payment split configuration has been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Platform <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Configure marketplace, revenue sharing, and payment settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Sharing</TabsTrigger>
          <TabsTrigger value="payments">Payment Providers</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage marketplace configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="iGOT Karmayogi Bharat" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@igot.gov.in" />
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
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Revenue Sharing Model
              </CardTitle>
              <CardDescription>
                Configure automated payment splits between platform and partners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform-share">Platform Share (%)</Label>
                <Input 
                  id="platform-share" 
                  type="number" 
                  min="0" 
                  max="100" 
                  defaultValue="30" 
                />
                <p className="text-xs text-muted-foreground">
                  Percentage of revenue retained by the platform
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner-share">Partner Share (%)</Label>
                <Input 
                  id="partner-share" 
                  type="number" 
                  min="0" 
                  max="100" 
                  defaultValue="70" 
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Automatically calculated based on platform share
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payout-frequency">Payout Frequency</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-payout">Minimum Payout Amount (₹)</Label>
                <Input 
                  id="min-payout" 
                  type="number" 
                  defaultValue="1000" 
                />
                <p className="text-xs text-muted-foreground">
                  Minimum earnings required before payout is processed
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Payout</Label>
                  <p className="text-sm text-muted-foreground">Automatically process payouts on schedule</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={handleSaveRevenue} className="shadow-glow">
                Save Revenue Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>Revenue Distribution Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                <span className="text-muted-foreground">Example Course: ₹1,000</span>
                <span className="font-semibold">Total Revenue</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                <span className="text-muted-foreground">Platform (30%)</span>
                <span className="font-semibold text-primary">₹300</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                <span className="text-muted-foreground">Partner (70%)</span>
                <span className="font-semibold text-primary">₹700</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Provider Configuration
              </CardTitle>
              <CardDescription>
                Configure national and international payment gateways
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primary-provider">Primary Payment Provider</Label>
                <Select defaultValue="razorpay">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="razorpay">Razorpay (India)</SelectItem>
                    <SelectItem value="paytm">Paytm (India)</SelectItem>
                    <SelectItem value="stripe">Stripe (Global)</SelectItem>
                    <SelectItem value="paypal">PayPal (Global)</SelectItem>
                    <SelectItem value="phonepe">PhonePe (India)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key / Merchant ID</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Enter your API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret</Label>
                <Input 
                  id="api-secret" 
                  type="password" 
                  placeholder="Enter your API secret"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input 
                  id="webhook-url" 
                  type="url" 
                  placeholder="https://api.igot.gov.in/webhooks/payment"
                  defaultValue="https://api.igot.gov.in/webhooks/payment"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Test Mode</Label>
                  <p className="text-sm text-muted-foreground">Use sandbox environment for testing</p>
                </div>
                <Switch />
              </div>

              <Button className="shadow-glow">Save Payment Settings</Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Supported Payment Methods</CardTitle>
              <CardDescription>Enable payment methods for learners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Credit/Debit Cards</Label>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>UPI</Label>
                  <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Net Banking</Label>
                  <p className="text-sm text-muted-foreground">All major Indian banks</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Wallets</Label>
                  <p className="text-sm text-muted-foreground">Paytm, PhonePe, Amazon Pay</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>International Cards</Label>
                  <p className="text-sm text-muted-foreground">For global learners</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
