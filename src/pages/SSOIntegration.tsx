import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Link2, 
  Shield, 
  CheckCircle2, 
  Copy, 
  Eye,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  Play,
  Loader2
} from "lucide-react";

const SSOIntegration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("configure");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  // SSO Configuration State
  const [ssoConfig, setSsoConfig] = useState({
    provider: "saml",
    entityId: "",
    ssoUrl: "",
    certificate: "",
    partnerName: "TechLearn Academy",
    attributeMapping: {
      email: "email",
      firstName: "firstName",
      lastName: "lastName",
      userId: "userId"
    }
  });

  const [previewUrl] = useState("https://partner-lms.example.com/courses");
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    // Simulate SSO test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      setTestResult(success ? "success" : "error");
      setIsTesting(false);
      
      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success 
          ? "SSO configuration is valid and ready to use"
          : "Please check your configuration and try again",
        variant: success ? "default" : "destructive",
      });
    }, 2500);
  };

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "SSO settings have been updated successfully",
    });
  };

  const loadPreview = () => {
    setIsPreviewLoading(true);
    setTimeout(() => {
      setIsPreviewLoading(false);
    }, 1500);
  };

  // Generate callback URL based on partner
  const callbackUrl = `https://msp-marketplace.com/sso/callback/${ssoConfig.partnerName.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              SSO <span className="gradient-text">Integration</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Configure Single Sign-On for seamless partner LMS connectivity
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="configure">Configure</TabsTrigger>
                  <TabsTrigger value="test">Test & Preview</TabsTrigger>
                  <TabsTrigger value="docs">Documentation</TabsTrigger>
                </TabsList>

                {/* Configuration Tab */}
                <TabsContent value="configure" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        SSO Provider Settings
                      </CardTitle>
                      <CardDescription>
                        Configure your external LMS SSO integration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="provider">SSO Protocol</Label>
                        <Select 
                          value={ssoConfig.provider} 
                          onValueChange={(value) => setSsoConfig({...ssoConfig, provider: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saml">SAML 2.0</SelectItem>
                            <SelectItem value="oauth">OAuth 2.0</SelectItem>
                            <SelectItem value="oidc">OpenID Connect</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="partnerName">Partner Name</Label>
                        <Input
                          id="partnerName"
                          value={ssoConfig.partnerName}
                          onChange={(e) => setSsoConfig({...ssoConfig, partnerName: e.target.value})}
                          placeholder="Your Organization Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="entityId">Entity ID / Client ID</Label>
                        <Input
                          id="entityId"
                          value={ssoConfig.entityId}
                          onChange={(e) => setSsoConfig({...ssoConfig, entityId: e.target.value})}
                          placeholder="urn:example:entity:id"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ssoUrl">SSO URL / Authorization Endpoint</Label>
                        <Input
                          id="ssoUrl"
                          value={ssoConfig.ssoUrl}
                          onChange={(e) => setSsoConfig({...ssoConfig, ssoUrl: e.target.value})}
                          placeholder="https://idp.partner.com/sso"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="certificate">Certificate / Client Secret</Label>
                        <Input
                          id="certificate"
                          type="password"
                          value={ssoConfig.certificate}
                          onChange={(e) => setSsoConfig({...ssoConfig, certificate: e.target.value})}
                          placeholder="Paste certificate or secret key"
                        />
                        <p className="text-xs text-muted-foreground">
                          Your certificate or secret is encrypted and stored securely
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Attribute Mapping</CardTitle>
                      <CardDescription>
                        Map SSO attributes to user profile fields
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email Attribute</Label>
                          <Input
                            value={ssoConfig.attributeMapping.email}
                            onChange={(e) => setSsoConfig({
                              ...ssoConfig, 
                              attributeMapping: {...ssoConfig.attributeMapping, email: e.target.value}
                            })}
                            placeholder="email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>User ID Attribute</Label>
                          <Input
                            value={ssoConfig.attributeMapping.userId}
                            onChange={(e) => setSsoConfig({
                              ...ssoConfig, 
                              attributeMapping: {...ssoConfig.attributeMapping, userId: e.target.value}
                            })}
                            placeholder="userId"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>First Name Attribute</Label>
                          <Input
                            value={ssoConfig.attributeMapping.firstName}
                            onChange={(e) => setSsoConfig({
                              ...ssoConfig, 
                              attributeMapping: {...ssoConfig.attributeMapping, firstName: e.target.value}
                            })}
                            placeholder="firstName"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name Attribute</Label>
                          <Input
                            value={ssoConfig.attributeMapping.lastName}
                            onChange={(e) => setSsoConfig({
                              ...ssoConfig, 
                              attributeMapping: {...ssoConfig.attributeMapping, lastName: e.target.value}
                            })}
                            placeholder="lastName"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Reset</Button>
                    <Button onClick={handleSaveConfig} className="shadow-glow">
                      Save Configuration
                    </Button>
                  </div>
                </TabsContent>

                {/* Test & Preview Tab */}
                <TabsContent value="test" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        Test SSO Connection
                      </CardTitle>
                      <CardDescription>
                        Verify your SSO configuration before going live
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                          <div className="space-y-1 flex-1">
                            <p className="font-medium text-sm">Test Authentication Flow</p>
                            <p className="text-sm text-muted-foreground">
                              This will simulate a complete SSO login attempt using your configuration
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handleTestConnection} 
                        disabled={isTesting}
                        className="w-full shadow-glow"
                        size="lg"
                      >
                        {isTesting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Testing Connection...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-5 w-5" />
                            Test SSO Connection
                          </>
                        )}
                      </Button>

                      {testResult && (
                        <div className={`p-4 rounded-lg border-2 ${
                          testResult === "success" 
                            ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900" 
                            : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                        }`}>
                          <div className="flex items-start gap-3">
                            {testResult === "success" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                            )}
                            <div className="space-y-2 flex-1">
                              <p className={`font-semibold ${
                                testResult === "success" 
                                  ? "text-green-900 dark:text-green-100" 
                                  : "text-red-900 dark:text-red-100"
                              }`}>
                                {testResult === "success" ? "Test Successful!" : "Test Failed"}
                              </p>
                              <p className={`text-sm ${
                                testResult === "success" 
                                  ? "text-green-800 dark:text-green-200" 
                                  : "text-red-800 dark:text-red-200"
                              }`}>
                                {testResult === "success" 
                                  ? "SSO authentication completed successfully. User attributes received and mapped correctly."
                                  : "Unable to authenticate. Please verify your Entity ID, SSO URL, and certificate."}
                              </p>
                              {testResult === "success" && (
                                <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                                  <p className="text-xs font-medium text-green-900 dark:text-green-100 mb-2">
                                    Received Attributes:
                                  </p>
                                  <div className="text-xs space-y-1 text-green-800 dark:text-green-200">
                                    <p>• Email: test.user@partner.com</p>
                                    <p>• User ID: usr_12345</p>
                                    <p>• Name: John Doe</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Integration Preview
                      </CardTitle>
                      <CardDescription>
                        See how learners will access your LMS content
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Input 
                          value={previewUrl} 
                          readOnly 
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={loadPreview}
                        >
                          <RefreshCw className={`h-4 w-4 ${isPreviewLoading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => window.open(previewUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* IFrame Preview Window */}
                      <div className="border-2 rounded-lg overflow-hidden bg-background relative" style={{ height: '500px' }}>
                        {isPreviewLoading && (
                          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          </div>
                        )}
                        <iframe
                          src={previewUrl}
                          className="w-full h-full"
                          title="LMS Preview"
                          sandbox="allow-same-origin allow-scripts"
                        />
                      </div>

                      <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                        <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          This preview shows how your LMS content will appear to learners. 
                          The actual integration will include automatic authentication via SSO.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documentation Tab */}
                <TabsContent value="docs" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Integration Guide</CardTitle>
                      <CardDescription>
                        Step-by-step instructions for SSO setup
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                            1
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Obtain SSO Credentials</p>
                            <p className="text-sm text-muted-foreground">
                              Contact your LMS provider to get your Entity ID, SSO URL, and certificate
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                            2
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Configure Your LMS</p>
                            <p className="text-sm text-muted-foreground">
                              Add our callback URL and service provider metadata to your LMS
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                            3
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Enter Configuration</p>
                            <p className="text-sm text-muted-foreground">
                              Fill in the SSO settings in the Configure tab
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                            4
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Test & Verify</p>
                            <p className="text-sm text-muted-foreground">
                              Use the Test tab to verify your configuration works correctly
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <p className="font-medium text-sm">Need Help?</p>
                        <p className="text-sm text-muted-foreground">
                          Our integration team is available 24/7 to assist with SSO setup
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Contact Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Service Provider Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Callback URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={callbackUrl} 
                        readOnly 
                        className="text-xs"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleCopy(callbackUrl, "Callback URL")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Metadata URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        value="https://msp-marketplace.com/sso/metadata" 
                        readOnly 
                        className="text-xs"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleCopy("https://msp-marketplace.com/sso/metadata", "Metadata URL")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Entity ID</Label>
                    <div className="flex gap-2">
                      <Input 
                        value="urn:msp:marketplace:sp" 
                        readOnly 
                        className="text-xs"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleCopy("urn:msp:marketplace:sp", "Entity ID")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Configuration</span>
                    <Badge variant="secondary">Incomplete</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Test Status</span>
                    <Badge variant={testResult === "success" ? "default" : "outline"}>
                      {testResult === "success" ? "Passed" : "Not Tested"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active</span>
                    <Badge variant="outline">No</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Test your SSO config before activating</p>
                  <p>• Keep certificates up to date</p>
                  <p>• Map all required user attributes</p>
                  <p>• Use HTTPS for all endpoints</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SSOIntegration;
