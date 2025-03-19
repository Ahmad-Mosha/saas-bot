"use client";

import { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  Globe,
  MessageSquare,
  ShoppingCart,
  Share2,
  Smartphone,
  Tablet,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function IntegrationsPage() {
  const [selectedChatbot, setSelectedChatbot] = useState("customer-support");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [appearanceTab, setAppearanceTab] = useState("theme");
  const [chatTheme, setChatTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [messageAlign, setMessageAlign] = useState("right");
  const [bubbleIcon, setBubbleIcon] = useState("chat");
  const [bubbleText, setBubbleText] = useState("Chat with us");
  const [autoOpen, setAutoOpen] = useState(false);
  const [customCSS, setCustomCSS] = useState("");

  // Options for the custom integration
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hello! How can I help you today?"
  );
  const [domain, setDomain] = useState("example.com");

  // Function to copy code snippet
  const copySnippet = (snippetType: string) => {
    // In a real app, this would copy the actual code snippet to clipboard
    navigator.clipboard.writeText(getCodeSnippet(snippetType, selectedChatbot));

    setCopiedSnippet(snippetType);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Function to generate code snippet
  const getCodeSnippet = (snippetType: string, chatbotId: string) => {
    const baseUrl = "https://chatbot.ai";
    const configOptions = `theme: '${chatTheme}', primaryColor: '${primaryColor}', messageAlign: '${messageAlign}', bubbleIcon: '${bubbleIcon}', bubbleText: '${bubbleText}', autoOpen: ${autoOpen}, welcomeMessage: '${welcomeMessage}'`;

    switch (snippetType) {
      case "script":
        return `<script src="${baseUrl}/widget/${chatbotId}.js"></script>
<script>
  ChatbotAI.init({
    ${configOptions}
  });
</script>`;
      case "react":
        return `import { ChatbotAI } from '@chatbot-ai/react';

function App() {
  return (
    <ChatbotAI 
      chatbotId="${chatbotId}"
      theme="${chatTheme}"
      primaryColor="${primaryColor}"
      messageAlign="${messageAlign}"
      bubbleIcon="${bubbleIcon}"
      bubbleText="${bubbleText}"
      autoOpen={${autoOpen}}
      welcomeMessage="${welcomeMessage}"
    />
  );
}`;
      case "shopify":
        return `<!-- Add this to your theme.liquid file -->
<script src="${baseUrl}/widget/${chatbotId}.js"></script>
<script>
  ChatbotAI.init({
    ${configOptions},
    platform: 'shopify'
  });
</script>`;
      case "wordpress":
        return `// Install the ChatbotAI plugin from the WordPress plugin repository
// Then add this to your WordPress site settings:

Chatbot ID: ${chatbotId}
Theme: ${chatTheme}
Primary Color: ${primaryColor}
Message Alignment: ${messageAlign}
Bubble Icon: ${bubbleIcon}
Bubble Text: ${bubbleText}
Auto Open: ${autoOpen ? "Yes" : "No"}
Welcome Message: ${welcomeMessage}`;
      case "api":
        return `// Example API request
fetch('${baseUrl}/api/v1/chatbot/${chatbotId}/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    message: 'Hello, I have a question',
    session_id: 'unique-session-id',
    user_info: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Add your chatbots to websites, apps or other platforms
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Integration Selector */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Chatbot</CardTitle>
              <CardDescription>
                Select which chatbot you want to integrate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedChatbot}
                onValueChange={setSelectedChatbot}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a chatbot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-support">
                    Customer Support Bot
                  </SelectItem>
                  <SelectItem value="marketing-assistant">
                    Marketing Assistant
                  </SelectItem>
                  <SelectItem value="sales-helper">Sales Helper</SelectItem>
                  <SelectItem value="product-recommendation">
                    Product Recommendation Bot
                  </SelectItem>
                  <SelectItem value="faq-bot">FAQ Bot</SelectItem>
                </SelectContent>
              </Select>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Chatbot API Key</h3>
                <div className="flex items-center gap-2">
                  <Input
                    value="sk_live_5f9a8s7d6f9a8s7d6f9a8s7d"
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copySnippet("apiKey")}
                  >
                    {copiedSnippet === "apiKey" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This is your private API key. Do not share it publicly.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/chatbots">
                <Button variant="outline">Manage Chatbots</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customize Appearance</CardTitle>
              <CardDescription>
                Configure how your chatbot will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={appearanceTab} onValueChange={setAppearanceTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="theme">Theme</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="theme" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={chatTheme === "light" ? "default" : "outline"}
                        className="justify-start h-14"
                        onClick={() => setChatTheme("light")}
                      >
                        <div className="w-6 h-6 rounded bg-white border mr-2"></div>
                        Light Theme
                      </Button>
                      <Button
                        variant={chatTheme === "dark" ? "default" : "outline"}
                        className="justify-start h-14"
                        onClick={() => setChatTheme("dark")}
                      >
                        <div className="w-6 h-6 rounded bg-gray-800 border mr-2"></div>
                        Dark Theme
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "#3b82f6",
                        "#ec4899",
                        "#10b981",
                        "#f97316",
                        "#8b5cf6",
                        "#ef4444",
                      ].map((color) => (
                        <Button
                          key={color}
                          variant={
                            primaryColor === color ? "default" : "outline"
                          }
                          className="h-14"
                          style={{
                            backgroundColor:
                              primaryColor === color ? color : "transparent",
                            borderColor: color,
                          }}
                          onClick={() => setPrimaryColor(color)}
                        >
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: color }}
                          ></div>
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Label className="min-w-20">Custom Color</Label>
                      <Input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-8 p-0"
                      />
                      <Input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chat Bubble</Label>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          {
                            id: "chat",
                            icon: <MessageSquare className="h-4 w-4" />,
                          },
                          {
                            id: "support",
                            icon: <Smartphone className="h-4 w-4" />,
                          },
                          { id: "robot", icon: <Tablet className="h-4 w-4" /> },
                        ].map((item) => (
                          <Button
                            key={item.id}
                            variant={
                              bubbleIcon === item.id ? "default" : "outline"
                            }
                            onClick={() => setBubbleIcon(item.id)}
                          >
                            {item.icon}
                          </Button>
                        ))}
                      </div>
                      <Input
                        placeholder="Bubble Text"
                        value={bubbleText}
                        onChange={(e) => setBubbleText(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-open"
                      checked={autoOpen}
                      onCheckedChange={setAutoOpen}
                    />
                    <Label htmlFor="auto-open">
                      Auto-open chat after page load
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Message Alignment</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          messageAlign === "left" ? "default" : "outline"
                        }
                        onClick={() => setMessageAlign("left")}
                      >
                        Left
                      </Button>
                      <Button
                        variant={
                          messageAlign === "right" ? "default" : "outline"
                        }
                        onClick={() => setMessageAlign("right")}
                      >
                        Right
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Welcome Message</Label>
                    <Input
                      placeholder="Welcome Message"
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Domain Restriction (Optional)</Label>
                    <Input
                      placeholder="example.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Limit your chatbot to work only on specific domains.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom CSS</Label>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                      placeholder=".chatbot-container { /* your styles */ }"
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Integration Methods */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your chatbot will look on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-64 h-[420px] border rounded-lg overflow-hidden bg-background">
                <div
                  className="h-12 p-3 border-b flex items-center justify-between"
                  style={{
                    backgroundColor:
                      chatTheme === "dark" ? "#1f2937" : "#f9fafb",
                  }}
                >
                  <span className="text-sm font-medium">Chat with Support</span>
                  <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200/50">
                    &times;
                  </button>
                </div>
                <div
                  className="h-[320px] p-3 overflow-y-auto"
                  style={{
                    backgroundColor:
                      chatTheme === "dark" ? "#111827" : "#ffffff",
                  }}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex">
                      <div
                        className="bg-gray-200 rounded-lg p-2 px-3 max-w-[80%] text-sm"
                        style={{
                          backgroundColor:
                            chatTheme === "dark" ? "#374151" : "#f3f4f6",
                        }}
                      >
                        {welcomeMessage}
                      </div>
                    </div>
                    <div
                      className={`flex ${
                        messageAlign === "right" ? "justify-end" : ""
                      }`}
                    >
                      <div
                        className="rounded-lg p-2 px-3 max-w-[80%] text-sm text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Hi there! I need help with my order.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="h-12 p-2 border-t flex items-center gap-2"
                  style={{
                    backgroundColor:
                      chatTheme === "dark" ? "#1f2937" : "#f9fafb",
                  }}
                >
                  <input
                    type="text"
                    className="flex-1 rounded-full px-3 py-1 text-sm border"
                    placeholder="Type your message..."
                    style={{
                      backgroundColor:
                        chatTheme === "dark" ? "#111827" : "#ffffff",
                      borderColor: chatTheme === "dark" ? "#374151" : "#e5e7eb",
                    }}
                  />
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 2L11 13"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2L15 22L11 13L2 9L22 2Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Methods</CardTitle>
              <CardDescription>
                Choose how to integrate the chatbot with your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="website" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="website">Website</TabsTrigger>
                  <TabsTrigger value="platforms">Platforms</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>

                <TabsContent value="website" className="space-y-4">
                  <Card>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <Code2 className="h-5 w-5 mr-2" />
                          JavaScript Snippet
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copySnippet("script")}
                          className="gap-1"
                        >
                          {copiedSnippet === "script" ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <pre className="overflow-auto bg-muted p-4 rounded-md text-xs">
                        {getCodeSnippet("script", selectedChatbot)}
                      </pre>
                      <p className="text-sm mt-2">
                        Add this code to your website right before the closing{" "}
                        <code>&lt;/body&gt;</code> tag.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <Code2 className="h-5 w-5 mr-2" />
                          React Component
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copySnippet("react")}
                          className="gap-1"
                        >
                          {copiedSnippet === "react" ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <pre className="overflow-auto bg-muted p-4 rounded-md text-xs">
                        {getCodeSnippet("react", selectedChatbot)}
                      </pre>
                      <p className="text-sm mt-2">
                        First install our package:{" "}
                        <code>npm install @chatbot-ai/react</code>
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="platforms" className="space-y-4">
                  <Card>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Shopify
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copySnippet("shopify")}
                          className="gap-1"
                        >
                          {copiedSnippet === "shopify" ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <pre className="overflow-auto bg-muted p-4 rounded-md text-xs">
                        {getCodeSnippet("shopify", selectedChatbot)}
                      </pre>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm">
                          Alternatively, install our Shopify app.
                        </p>
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Shopify App
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <Globe className="h-5 w-5 mr-2" />
                          WordPress
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copySnippet("wordpress")}
                          className="gap-1"
                        >
                          {copiedSnippet === "wordpress" ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <pre className="overflow-auto bg-muted p-4 rounded-md text-xs">
                        {getCodeSnippet("wordpress", selectedChatbot)}
                      </pre>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm">
                          Alternatively, install our WordPress plugin.
                        </p>
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-3.5 w-3.5" />
                          WordPress Plugin
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="api" className="space-y-4">
                  <Card>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <Share2 className="h-5 w-5 mr-2" />
                          REST API
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copySnippet("api")}
                          className="gap-1"
                        >
                          {copiedSnippet === "api" ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <pre className="overflow-auto bg-muted p-4 rounded-md text-xs">
                        {getCodeSnippet("api", selectedChatbot)}
                      </pre>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm">
                          View our full API documentation for more details.
                        </p>
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-3.5 w-3.5" />
                          API Docs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SDKs & Libraries</CardTitle>
                      <CardDescription>
                        Official packages for various languages and frameworks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                          { name: "JavaScript", logo: "/images/js-logo.png" },
                          { name: "Python", logo: "/images/python-logo.png" },
                          { name: "React", logo: "/images/react-logo.png" },
                          { name: "Node.js", logo: "/images/node-logo.png" },
                          { name: "PHP", logo: "/images/php-logo.png" },
                          { name: "Ruby", logo: "/images/ruby-logo.png" },
                        ].map((sdk) => (
                          <div
                            key={sdk.name}
                            className="flex flex-col items-center p-3 border rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-8 h-8 mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                              {/* <Image src={sdk.logo} alt={sdk.name} width={20} height={20} /> */}
                              <Code2 className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">
                              {sdk.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-muted/30">
        <h3 className="text-lg font-medium mb-2">
          Need help with integration?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our team can help you integrate your chatbot with your website or
          application.
        </p>
        <div className="flex gap-3">
          <Button variant="default">Contact Support</Button>
          <Button variant="outline">View Documentation</Button>
        </div>
      </div>
    </div>
  );
}
