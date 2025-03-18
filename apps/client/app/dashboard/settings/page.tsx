"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AtSign,
  Bell,
  Camera,
  Check,
  Globe,
  Lock,
  Save,
  Shield,
  UserCircle,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formState, setFormState] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Inc.",
    bio: "Product manager with a passion for AI and automation tools.",
    avatarUrl: "https://github.com/shadcn.png",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving profile
    setTimeout(() => {
      alert("Profile updated successfully!");
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile and account preferences
          </p>
        </div>

        {/* Settings Content */}
        <Tabs
          defaultValue="profile"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 md:w-[400px] mb-8">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
            >
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your profile photo</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32 border-2 border-blue-500/30">
                        <AvatarImage src={formState.avatarUrl} />
                        <AvatarFallback>
                          <UserCircle className="h-16 w-16" />
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-500 text-white">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-lg">{formState.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formState.email}
                      </p>
                      <Badge className="mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        Pro Plan
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" className="border-blue-500/20">
                      Remove Photo
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="col-span-2">
                <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formState.name}
                            onChange={handleInputChange}
                            className="border-blue-500/20 bg-card/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formState.email}
                            onChange={handleInputChange}
                            className="border-blue-500/20 bg-card/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Your company"
                            value={formState.company}
                            onChange={handleInputChange}
                            className="border-blue-500/20 bg-card/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="website"
                              name="website"
                              placeholder="https://yourwebsite.com"
                              className="pl-10 border-blue-500/20 bg-card/50"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          placeholder="Tell us about yourself"
                          rows={4}
                          value={formState.bio}
                          onChange={handleInputChange}
                          className="resize-none border-blue-500/20 bg-card/50"
                        />
                        <p className="text-xs text-muted-foreground">
                          Brief description for your profile. URLs are
                          hyperlinked.
                        </p>
                      </div>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
                      >
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="border-blue-500/20 bg-card/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="border-blue-500/20 bg-card/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="border-blue-500/20 bg-card/50"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-purple-400 mr-2" />
                        <h4 className="font-medium">
                          Two-Factor Authentication
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Secure your account with 2FA
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="pt-4 border-t border-blue-500/10">
                    <h4 className="text-sm font-medium mb-2">Recovery Codes</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Recovery codes can be used to access your account in the
                      event you lose access to your device.
                    </p>
                    <Button variant="outline" className="border-blue-500/20">
                      View Recovery Codes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm md:col-span-2">
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>Manage your active sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      device: "Windows PC",
                      location: "San Francisco, CA",
                      lastActive: "Active now",
                      current: true,
                    },
                    {
                      device: "iPhone 13",
                      location: "Los Angeles, CA",
                      lastActive: "2 days ago",
                      current: false,
                    },
                  ].map((session, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        session.current
                          ? "border-blue-500/20 bg-blue-500/5"
                          : "border-blue-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-500/10">
                          <Globe className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{session.device}</h4>
                            {session.current && (
                              <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {session.location} • {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/5"
                        >
                          Logout
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-blue-500/20"
                  >
                    Logout of All Devices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    title: "Email Notifications",
                    items: [
                      { name: "Product updates", enabled: true },
                      { name: "Weekly reports", enabled: true },
                      { name: "Account activity", enabled: true },
                      { name: "Marketing emails", enabled: false },
                    ],
                  },
                  {
                    title: "Push Notifications",
                    items: [
                      { name: "New chatbot messages", enabled: true },
                      { name: "Performance alerts", enabled: true },
                      { name: "Billing reminders", enabled: true },
                      { name: "New features", enabled: false },
                    ],
                  },
                ].map((group, i) => (
                  <div key={i} className="space-y-4">
                    <h3 className="font-medium">{group.title}</h3>
                    <div className="space-y-3">
                      {group.items.map((item, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <Switch checked={item.enabled} />
                        </div>
                      ))}
                    </div>
                    {i < 1 && (
                      <div className="pt-2 border-t border-blue-500/10" />
                    )}
                  </div>
                ))}
                <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                  <Check className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
