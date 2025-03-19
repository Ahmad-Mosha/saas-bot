"use client";

import { useState } from "react";
import { Bot, ChevronLeft, Wand2 } from "lucide-react";
import Link from "next/link";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NewChatbotPage() {
  const [chatbotName, setChatbotName] = useState("");
  const [chatbotDescription, setChatbotDescription] = useState("");
  const [chatbotType, setChatbotType] = useState("text");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      // In a real app, we would redirect to the new chatbot page
      window.location.href = "/dashboard/chatbots";
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/chatbots">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create New Chatbot</h1>
        </div>
      </div>

      <Tabs defaultValue="blank" className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="blank">Start from Scratch</TabsTrigger>
          <TabsTrigger value="template">Use Template</TabsTrigger>
        </TabsList>

        <TabsContent value="blank">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Provide basic details for your new chatbot.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Chatbot Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Customer Support Assistant"
                    value={chatbotName}
                    onChange={(e) => setChatbotName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What this chatbot will do..."
                    value={chatbotDescription}
                    onChange={(e) => setChatbotDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Chatbot Type</Label>
                  <Select value={chatbotType} onValueChange={setChatbotType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Bot</SelectItem>
                      <SelectItem value="image">Image Bot</SelectItem>
                      <SelectItem value="audio">Audio Bot</SelectItem>
                      <SelectItem value="multimodal">Multimodal Bot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/dashboard/chatbots">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={!chatbotName || submitting}>
                  {submitting ? (
                    <>Creating...</>
                  ) : (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Create Chatbot
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="template">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Customer Support Bot",
                description: "Handle customer inquiries and support tickets",
                icon: <Bot className="h-8 w-8 text-blue-500" />,
              },
              {
                title: "Sales Assistant",
                description: "Help customers find products and make purchases",
                icon: <Bot className="h-8 w-8 text-green-500" />,
              },
              {
                title: "FAQ Bot",
                description:
                  "Answer frequently asked questions about your business",
                icon: <Bot className="h-8 w-8 text-purple-500" />,
              },
            ].map((template, i) => (
              <Card
                key={i}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>{template.icon}</div>
                    <Button variant="ghost" size="icon">
                      <Wand2 className="h-4 w-4 text-blue-500" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
