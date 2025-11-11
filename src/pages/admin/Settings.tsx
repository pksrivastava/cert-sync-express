import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, CreditCard, Users, TrendingUp, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [maxEnrollments, setMaxEnrollments] = useState(5);
  const [minKarmaPoints, setMinKarmaPoints] = useState(0);
  const [annualLimit, setAnnualLimit] = useState(20);
  const [yearStartMonth, setYearStartMonth] = useState(4);
  const [yearStartDay, setYearStartDay] = useState(1);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("marketplace_settings")
        .select("*");

      if (error) throw error;

      data?.forEach((setting) => {
        const value = setting.setting_value as any;
        if (setting.setting_key === "max_concurrent_enrollments") {
          setMaxEnrollments(value.value || 5);
        } else if (setting.setting_key === "min_karma_points") {
          setMinKarmaPoints(value.value || 0);
        } else if (setting.setting_key === "annual_enrollment_limit") {
          setAnnualLimit(value.value || 20);
          setYearStartMonth(value.year_start_month || 4);
          setYearStartDay(value.year_start_day || 1);
        }
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from("marketplace_settings")
        .update({ setting_value: value })
        .eq("setting_key", key);

      if (error) throw error;
      toast.success("Setting updated successfully");
    } catch (error) {
      console.error("Error saving setting:", error);
      toast.error("Failed to save setting");
    }
  };

  const handleSaveEnrollmentLimit = () => {
    saveSetting("max_concurrent_enrollments", { value: maxEnrollments });
  };

  const handleSaveKarmaPoints = () => {
    saveSetting("min_karma_points", { value: minKarmaPoints });
  };

  const handleSaveAnnualLimit = () => {
    saveSetting("annual_enrollment_limit", {
      value: annualLimit,
      year_start_month: yearStartMonth,
      year_start_day: yearStartDay
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

      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-3xl">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Learner Enrollment Settings
              </CardTitle>
              <CardDescription>Configure enrollment limits and access policies for learners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="max-enrollments">Maximum Concurrent Enrollments</Label>
                <Input 
                  id="max-enrollments" 
                  type="number" 
                  min="0"
                  value={maxEnrollments}
                  onChange={(e) => setMaxEnrollments(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of courses a learner can be enrolled in simultaneously (0 = unlimited)
                </p>
              </div>
              <Button onClick={handleSaveEnrollmentLimit} className="shadow-glow">
                Save Enrollment Limit
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Karma Point Requirements
              </CardTitle>
              <CardDescription>Set minimum karma points for marketplace access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="min-karma">Minimum Karma Points for Marketplace Access</Label>
                <Input 
                  id="min-karma" 
                  type="number" 
                  min="0"
                  value={minKarmaPoints}
                  onChange={(e) => setMinKarmaPoints(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Learners need this many karma points to access marketplace content (0 = no requirement)
                </p>
              </div>
              <Button onClick={handleSaveKarmaPoints} className="shadow-glow">
                Save Karma Requirement
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Annual Enrollment Limits
              </CardTitle>
              <CardDescription>Configure annual/financial year enrollment restrictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="annual-limit">Maximum Annual Marketplace Enrollments</Label>
                <Input 
                  id="annual-limit" 
                  type="number" 
                  min="0"
                  value={annualLimit}
                  onChange={(e) => setAnnualLimit(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum marketplace courses per learner per year (0 = unlimited)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year-start-month">Financial Year Start Month</Label>
                  <Select value={yearStartMonth.toString()} onValueChange={(v) => setYearStartMonth(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ].map((month, idx) => (
                        <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year-start-day">Start Day</Label>
                  <Input 
                    id="year-start-day" 
                    type="number" 
                    min="1"
                    max="31"
                    value={yearStartDay}
                    onChange={(e) => setYearStartDay(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Current year resets on: Day {yearStartDay} of Month {yearStartMonth}
              </p>

              <Button onClick={handleSaveAnnualLimit} className="shadow-glow">
                Save Annual Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

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

              <Button className="shadow-glow">
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
