"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Bot,
  Sparkles,
  PencilLine,
  Image as ImageIcon,
  MessageSquare,
  ChevronRight,
  Check,
  ArrowRight,
  Palette,
  Settings,
  Save,
  Play,
  Braces,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

// Form schema for bot configuration
const formSchema = z.object({
  name: z.string().min(3, "Bot name must be at least 3 characters"),
  description: z.string().optional(),
  type: z.enum(["text", "image", "mixed"]),
  welcomeMessage: z.string().min(5, "Welcome message is required"),
  primaryColor: z.string(),
  botIcon: z.enum(["default", "robot", "assistant", "spark", "custom"]),
  customInstructions: z.string().optional(),
  temperature: z.number().min(0).max(1),
  knowledgeBase: z.boolean(),
  imageCapabilities: z.boolean(),
  apiEndpoint: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ChatBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const botId = searchParams.get("id");
  const isEditMode = !!botId;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBot, setIsLoadingBot] = useState(false);
  const [previewChat, setPreviewChat] = useState(false);
  const [previewMessages, setPreviewMessages] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "text",
      welcomeMessage: "Hello! How can I assist you today?",
      primaryColor: "#3b82f6",
      botIcon: "default",
      temperature: 0.7,
      knowledgeBase: false,
      imageCapabilities: false,
    },
  });

  // Load bot data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoadingBot(true);
      // In a real app, this would be an API call to get the bot configuration
      // For now, we'll simulate loading with a timeout
      setTimeout(() => {
        // Simulate bot data for editing
        form.setValue("name", `Bot #${botId}`);
        form.setValue("description", "This is a bot you're editing");
        form.setValue("welcomeMessage", "Hello! I'm a bot that's been edited.");
        setIsLoadingBot(false);
      }, 1000);
    }
  }, [botId, form, isEditMode]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    console.log("Bot configuration:", data);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the bots list or dashboard
      router.push("/dashboard");
    }, 1500);
  };

  // Handle template selection
  const selectTemplate = (template: string) => {
    setSelectedTemplate(template);

    // Apply template settings
    if (template === "customer-support") {
      form.setValue("name", "Customer Support Bot");
      form.setValue("type", "text");
      form.setValue(
        "welcomeMessage",
        "Hello! I'm your customer support assistant. How can I help you today?"
      );
      form.setValue(
        "customInstructions",
        "You are a helpful customer support assistant. Answer questions about products, policies, and services in a friendly, professional manner."
      );
    } else if (template === "image-generator") {
      form.setValue("name", "Image Creator");
      form.setValue("type", "image");
      form.setValue(
        "welcomeMessage",
        "Hi there! Tell me what kind of image you'd like me to create."
      );
      form.setValue("imageCapabilities", true);
      form.setValue(
        "customInstructions",
        "You are an AI that creates images based on user descriptions. Ask clarifying questions to ensure you understand what they want."
      );
    } else if (template === "code-assistant") {
      form.setValue("name", "Code Helper");
      form.setValue("type", "text");
      form.setValue(
        "welcomeMessage",
        "Hello developer! What coding challenge are you working on?"
      );
      form.setValue(
        "customInstructions",
        "You are a coding assistant. Help users with programming questions, debugging, and explaining code concepts."
      );
    }
  };

  // For preview chat
  const addMessage = (content: string, sender: "user" | "bot") => {
    setPreviewMessages([...previewMessages, { content, sender }]);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              {isEditMode ? `Edit Bot #${botId}` : "Create Your ChatBot"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditMode
                ? "Update your bot's behavior, appearance, and capabilities"
                : "Customize your bot's behavior, appearance, and capabilities"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2 border-blue-500/20"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              className="gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading || isLoadingBot}
            >
              {isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Bot"
                : "Create Bot"}
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {isLoadingBot ? (
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Loading bot configuration...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Configuration Area */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              {/* Only show templates section if not in edit mode */}
              {!isEditMode && (
                <Card className="border-blue-500/20 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-400" />
                      Start with a Template
                    </CardTitle>
                    <CardDescription>
                      Choose a pre-configured template or start from scratch
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          id: "customer-support",
                          name: "Customer Support",
                          icon: (
                            <MessageSquare className="h-8 w-8 text-blue-400" />
                          ),
                          description:
                            "Handle customer inquiries and support requests",
                        },
                        {
                          id: "image-generator",
                          name: "Image Generator",
                          icon: (
                            <ImageIcon className="h-8 w-8 text-purple-400" />
                          ),
                          description:
                            "Create images based on text descriptions",
                        },
                        {
                          id: "code-assistant",
                          name: "Code Assistant",
                          icon: <Braces className="h-8 w-8 text-pink-400" />,
                          description: "Help with programming and coding tasks",
                        },
                      ].map((template) => (
                        <motion.div
                          key={template.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`cursor-pointer p-4 rounded-lg border ${
                            selectedTemplate === template.id
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-blue-500/20 hover:border-blue-500/40"
                          }`}
                          onClick={() => selectTemplate(template.id)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="p-2 rounded-md bg-card/80">
                              {template.icon}
                            </div>
                            {selectedTemplate === template.id && (
                              <Check className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Main Configuration Tabs */}
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="basic" className="flex gap-2">
                    <Bot className="h-4 w-4" />
                    <span className="hidden sm:inline">Basic Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="flex gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Appearance</span>
                  </TabsTrigger>
                  <TabsTrigger value="behavior" className="flex gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Behavior</span>
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex gap-2">
                    <Braces className="h-4 w-4" />
                    <span className="hidden sm:inline">Advanced</span>
                  </TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-4">
                  <Card className="border-blue-500/20">
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>
                        Set up the fundamental details of your chatbot
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Bot Name</Label>
                        <Input
                          id="name"
                          placeholder="My Awesome Bot"
                          {...form.register("name")}
                          className="border-blue-500/20"
                        />
                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description (Optional)
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="A brief description of what your bot does"
                          {...form.register("description")}
                          className="border-blue-500/20 resize-none min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Bot Type</Label>
                        <Select
                          defaultValue={form.getValues("type")}
                          onValueChange={(value: "text" | "image" | "mixed") =>
                            form.setValue("type", value)
                          }
                        >
                          <SelectTrigger className="border-blue-500/20">
                            <SelectValue placeholder="Select bot type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Bot</SelectItem>
                            <SelectItem value="image">
                              Image Generation Bot
                            </SelectItem>
                            <SelectItem value="mixed">
                              Text + Image Capabilities
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="welcomeMessage">Welcome Message</Label>
                        <Textarea
                          id="welcomeMessage"
                          placeholder="Hello! How can I assist you today?"
                          {...form.register("welcomeMessage")}
                          className="border-blue-500/20 resize-none"
                        />
                        {form.formState.errors.welcomeMessage && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.welcomeMessage.message}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-4">
                  <Card className="border-blue-500/20">
                    <CardHeader>
                      <CardTitle>Bot Appearance</CardTitle>
                      <CardDescription>
                        Customize how your chatbot looks on your website
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Bot Icon</Label>
                        <div className="grid grid-cols-5 gap-4">
                          {[
                            "default",
                            "robot",
                            "assistant",
                            "spark",
                            "custom",
                          ].map((icon) => (
                            <div
                              key={icon}
                              className={`cursor-pointer p-4 rounded-lg border text-center ${
                                form.getValues("botIcon") === icon
                                  ? "border-blue-500 bg-blue-500/10"
                                  : "border-blue-500/20"
                              }`}
                              onClick={() =>
                                form.setValue("botIcon", icon as any)
                              }
                            >
                              <div className="flex justify-center mb-2">
                                {icon === "default" && (
                                  <Bot className="h-8 w-8 text-blue-400" />
                                )}
                                {icon === "robot" && (
                                  <Bot className="h-8 w-8 text-purple-400" />
                                )}
                                {icon === "assistant" && (
                                  <MessageSquare className="h-8 w-8 text-pink-400" />
                                )}
                                {icon === "spark" && (
                                  <Sparkles className="h-8 w-8 text-yellow-400" />
                                )}
                                {icon === "custom" && (
                                  <ImageIcon className="h-8 w-8 text-green-400" />
                                )}
                              </div>
                              <span className="text-xs capitalize">{icon}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="color"
                            value={form.getValues("primaryColor")}
                            onChange={(e) =>
                              form.setValue("primaryColor", e.target.value)
                            }
                            className="w-16 h-10 p-1 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={form.getValues("primaryColor")}
                            onChange={(e) =>
                              form.setValue("primaryColor", e.target.value)
                            }
                            className="border-blue-500/20 w-32"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Chat Window Position</Label>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {["Bottom Left", "Bottom Right", "Full Page"].map(
                            (position, idx) => (
                              <div
                                key={position}
                                className={`cursor-pointer p-3 rounded-lg border ${
                                  idx === 1
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-blue-500/20"
                                } text-center`}
                              >
                                <div className="text-xs font-medium">
                                  {position}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="advanced-appearance">
                          <AccordionTrigger>
                            Advanced Appearance Settings
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Rounded Corners</Label>
                                <div className="text-sm text-muted-foreground">
                                  Adjust the roundness of the chat interface
                                </div>
                              </div>
                              <Slider
                                defaultValue={[12]}
                                max={24}
                                step={2}
                                className="w-[200px]"
                              />
                            </div>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Custom Font</Label>
                                <div className="text-sm text-muted-foreground">
                                  Use your website's font in the chat
                                </div>
                              </div>
                              <Switch defaultChecked={false} />
                            </div>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Dark Mode Support</Label>
                                <div className="text-sm text-muted-foreground">
                                  Automatically adapt to user's theme preference
                                </div>
                              </div>
                              <Switch defaultChecked={true} />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Behavior Tab */}
                <TabsContent value="behavior" className="space-y-4">
                  <Card className="border-blue-500/20">
                    <CardHeader>
                      <CardTitle>Bot Behavior</CardTitle>
                      <CardDescription>
                        Configure how your chatbot interacts with users
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="temperature" className="block mb-1">
                              Response Creativity
                            </Label>
                            <div className="text-sm text-muted-foreground">
                              Lower values give more predictable responses
                            </div>
                          </div>
                          <span className="font-mono bg-blue-500/10 text-blue-500 px-2 py-1 rounded text-sm">
                            {form.getValues("temperature").toFixed(1)}
                          </span>
                        </div>
                        <Slider
                          defaultValue={[form.getValues("temperature")]}
                          max={1}
                          step={0.1}
                          className="w-full"
                          onValueChange={([value]) =>
                            form.setValue("temperature", value)
                          }
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Precise</span>
                          <span>Balanced</span>
                          <span>Creative</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Bot Instructions</Label>
                        <Textarea
                          placeholder="Enter custom instructions for your bot's behavior and tone..."
                          {...form.register("customInstructions")}
                          className="border-blue-500/20 resize-none min-h-[150px]"
                        />
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <HelpCircle className="h-4 w-4" />
                          These instructions tell your bot how to respond and
                          what tone to use
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Knowledge Base</Label>
                            <div className="text-sm text-muted-foreground">
                              Allow bot to use your uploaded documents
                            </div>
                          </div>
                          <Switch
                            checked={form.getValues("knowledgeBase")}
                            onCheckedChange={(checked) =>
                              form.setValue("knowledgeBase", checked)
                            }
                          />
                        </div>

                        {form.getValues("knowledgeBase") && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 border-l-2 border-blue-500/20 space-y-4 mt-2"
                          >
                            <div className="border-2 border-dashed border-blue-500/20 rounded-lg p-6 text-center">
                              <div className="flex justify-center mb-4">
                                <PencilLine className="h-10 w-10 text-blue-500/50" />
                              </div>
                              <h3 className="font-medium mb-1">
                                No documents uploaded
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Upload documents for your bot to learn from
                              </p>
                              <Button
                                variant="outline"
                                className="border-blue-500/20"
                              >
                                Upload Documents
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Image Generation</Label>
                          <div className="text-sm text-muted-foreground">
                            Allow the bot to generate images
                          </div>
                        </div>
                        <Switch
                          checked={form.getValues("imageCapabilities")}
                          onCheckedChange={(checked) =>
                            form.setValue("imageCapabilities", checked)
                          }
                        />
                      </div>

                      {form.getValues("imageCapabilities") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 border-l-2 border-blue-500/20 space-y-4"
                        >
                          <div className="space-y-2">
                            <Label>Image Style</Label>
                            <Select defaultValue="realistic">
                              <SelectTrigger className="border-blue-500/20">
                                <SelectValue placeholder="Select image style" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="realistic">
                                  Realistic
                                </SelectItem>
                                <SelectItem value="artistic">
                                  Artistic
                                </SelectItem>
                                <SelectItem value="cartoon">Cartoon</SelectItem>
                                <SelectItem value="abstract">
                                  Abstract
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Image Quality</Label>
                            <Select defaultValue="standard">
                              <SelectTrigger className="border-blue-500/20">
                                <SelectValue placeholder="Select quality" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">
                                  Standard
                                </SelectItem>
                                <SelectItem value="high">
                                  High Definition
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-4">
                  <Card className="border-blue-500/20">
                    <CardHeader>
                      <CardTitle>Advanced Configuration</CardTitle>
                      <CardDescription>
                        Fine-tune your chatbot's capabilities and integrations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Memory Length</Label>
                            <div className="text-sm text-muted-foreground">
                              How many previous messages to remember
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              10 messages
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    Longer memory uses more resources but gives
                                    more context-aware responses
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <Slider
                          defaultValue={[10]}
                          max={20}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Custom API Endpoint</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Use your own API for processing messages</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          placeholder="https://your-api-endpoint.com/chat"
                          {...form.register("apiEndpoint")}
                          className="border-blue-500/20"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Rate Limiting</Label>
                            <div className="text-sm text-muted-foreground">
                              Limit message frequency per user
                            </div>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Web Browsing</Label>
                            <div className="text-sm text-muted-foreground">
                              Allow bot to search the web for information
                            </div>
                          </div>
                          <Switch defaultChecked={false} />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Data Collection</Label>
                            <div className="text-sm text-muted-foreground">
                              Store conversations to improve the bot
                            </div>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Preview Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <Card className="border-blue-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>Preview</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs gap-1"
                        onClick={() => setPreviewChat(!previewChat)}
                      >
                        {previewChat ? "Reset" : "Test Chat"}
                        <Play className="h-3 w-3" />
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      See how your bot will look
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden shadow-sm max-w-[320px] mx-auto">
                      {/* Preview Chat Header */}
                      <div
                        className="p-3 flex items-center gap-2 text-white"
                        style={{
                          backgroundColor: form.getValues("primaryColor"),
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                          {form.getValues("name") || "Your Bot Name"}
                        </div>
                      </div>

                      {/* Chat Area */}
                      <div className="h-[320px] p-3 bg-dot-pattern bg-opacity-5 flex flex-col">
                        {!previewChat ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-sm text-muted-foreground">
                              {form.getValues("welcomeMessage") ||
                                "Hello! How can I assist you today?"}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4 text-xs"
                              onClick={() => setPreviewChat(true)}
                            >
                              Start Testing
                            </Button>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col space-y-3 overflow-y-auto">
                            {/* Bot welcome message */}
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                                <Bot className="h-4 w-4 text-blue-500" />
                              </div>
                              <div className="bg-card p-3 rounded-lg rounded-tl-none text-sm max-w-[80%]">
                                {form.getValues("welcomeMessage")}
                              </div>
                            </div>

                            {/* Display previous messages */}
                            {previewMessages.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`flex items-start ${
                                  msg.sender === "user" ? "justify-end" : ""
                                }`}
                              >
                                {msg.sender === "bot" && (
                                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                                    <Bot className="h-4 w-4 text-blue-500" />
                                  </div>
                                )}
                                <div
                                  className={`p-3 rounded-lg text-sm max-w-[80%] ${
                                    msg.sender === "user"
                                      ? "bg-blue-500 text-white rounded-tr-none"
                                      : "bg-card rounded-tl-none"
                                  }`}
                                >
                                  {msg.content}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Chat Input */}
                        {previewChat && (
                          <div className="pt-3 mt-auto">
                            <form
                              className="flex gap-2"
                              onSubmit={(e) => {
                                e.preventDefault();
                                const input =
                                  e.currentTarget.elements.namedItem(
                                    "message"
                                  ) as HTMLInputElement;
                                if (input.value.trim()) {
                                  addMessage(input.value, "user");
                                  input.value = "";
                                  setTimeout(() => {
                                    let response =
                                      "I understand, thank you for your message!";
                                    if (form.getValues("type") === "image") {
                                      response =
                                        "Here's an image based on your request [Image would appear here]";
                                    }
                                    addMessage(response, "bot");
                                  }, 1000);
                                }
                              }}
                            >
                              <Input
                                name="message"
                                className="flex-1 border-blue-500/20 text-sm"
                                placeholder="Type a message..."
                              />
                              <Button
                                type="submit"
                                size="icon"
                                style={{
                                  backgroundColor:
                                    form.getValues("primaryColor"),
                                }}
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                      Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      {[
                        "Customize your bot's appearance",
                        "Configure behavior and responses",
                        "Test your bot's capabilities",
                        "Deploy to your website",
                        "Monitor performance in analytics",
                      ].map((step, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">
                            {i + 1}
                          </div>
                          <span className="text-foreground/70">{step}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        )}

        {/* Help & Tutorial Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 border-t border-blue-500/20 pt-8"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="getting-started"
              className="border-blue-500/20"
            >
              <AccordionTrigger className="hover:no-underline py-4 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-lg font-medium">
                    How to Create an Effective Bot
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Choose the Right Template",
                      icon: <Sparkles className="h-8 w-8 text-blue-400" />,
                      description:
                        "Start with a template that matches your needs. Customer support bots handle inquiries, while image bots create visuals from descriptions.",
                      tip: "For complex use cases, start with a template and customize from there.",
                    },
                    {
                      title: "Craft Clear Instructions",
                      icon: <PencilLine className="h-8 w-8 text-purple-400" />,
                      description:
                        "The quality of your bot instructions directly affects its performance. Be specific about its tone, knowledge, and limitations.",
                      tip: "Write instructions as if explaining the role to a new employee.",
                    },
                    {
                      title: "Test Before Deploying",
                      icon: <Settings className="h-8 w-8 text-pink-400" />,
                      description:
                        "Use the preview feature to interact with your bot and refine its behavior before making it available to users.",
                      tip: "Try edge cases and uncommon questions to see how your bot handles them.",
                    },
                  ].map((step, i) => (
                    <Card key={i} className="border-blue-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-card/80">
                            {step.icon}
                          </div>
                          <CardTitle className="text-lg">
                            {step.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {step.description}
                        </p>
                        <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                          <div className="flex gap-2 text-sm">
                            <Sparkles className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span>
                              <span className="font-medium">Tip:</span>{" "}
                              {step.tip}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-400" />
                    Bot Creation Process
                  </h4>
                  <ol className="space-y-2 ml-8 list-decimal text-muted-foreground">
                    <li>Select a template or start from scratch</li>
                    <li>
                      Configure basic information like name and welcome message
                    </li>
                    <li>Customize appearance to match your brand</li>
                    <li>
                      Set behavior parameters including response style and
                      capabilities
                    </li>
                    <li>
                      Add advanced settings like API integrations if needed
                    </li>
                    <li>Test your bot using the preview</li>
                    <li>
                      Deploy to your website with the generated code snippet
                    </li>
                  </ol>

                  <div className="mt-6 flex justify-center">
                    <a
                      href="https://docs.example.com/bot-creation-guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      View complete documentation
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </motion.div>
    </div>
  );
}
