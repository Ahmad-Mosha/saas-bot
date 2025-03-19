"use client";

import { useState } from "react";
import {
  Bot,
  Plus,
  File,
  FileText,
  Globe,
  Upload,
  Database,
  Trash2,
  Edit,
  MoreHorizontal,
  RefreshCcw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Link as LinkIcon,
  Search,
  RotateCw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DataCard } from "@/components/dashboard/DataCard";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for knowledge sources
const knowledgeSources = [
  {
    id: "1",
    name: "Product FAQ",
    type: "document",
    format: "pdf",
    size: "2.4 MB",
    status: "processed",
    dateAdded: "2023-10-15T10:30:00Z",
    tags: ["faq", "product"],
    docCount: 24,
  },
  {
    id: "2",
    name: "Company Website",
    type: "website",
    format: "crawler",
    size: "15 pages",
    status: "processing",
    dateAdded: "2023-10-20T14:20:00Z",
    tags: ["website", "company"],
    progress: 65,
    docCount: 15,
  },
  {
    id: "3",
    name: "Support Guidelines",
    type: "document",
    format: "docx",
    size: "1.2 MB",
    status: "processed",
    dateAdded: "2023-09-28T09:15:00Z",
    tags: ["guidelines", "support"],
    docCount: 12,
  },
  {
    id: "4",
    name: "Product Manual",
    type: "document",
    format: "pdf",
    size: "4.8 MB",
    status: "error",
    dateAdded: "2023-10-18T16:45:00Z",
    tags: ["manual", "product"],
    error: "Failed to parse document structure",
    docCount: 0,
  },
  {
    id: "5",
    name: "Company Blog",
    type: "website",
    format: "crawler",
    size: "32 pages",
    status: "processed",
    dateAdded: "2023-10-05T11:20:00Z",
    tags: ["blog", "content"],
    docCount: 32,
  },
];

// Mock training history
const trainingHistory = [
  {
    id: "tr-1",
    date: "2023-10-22T15:30:00Z",
    sources: ["Product FAQ", "Company Website"],
    duration: "45 minutes",
    status: "completed",
    model: "GPT-4",
    improvements: "Enhanced product knowledge and response accuracy",
  },
  {
    id: "tr-2",
    date: "2023-10-15T10:45:00Z",
    sources: ["Support Guidelines"],
    duration: "20 minutes",
    status: "completed",
    model: "GPT-4",
    improvements: "Improved support protocol adherence",
  },
  {
    id: "tr-3",
    date: "2023-10-10T14:20:00Z",
    sources: ["Product Manual"],
    duration: "35 minutes",
    status: "failed",
    model: "GPT-3.5",
    error: "Training interrupted due to input data errors",
  },
];

export default function TrainingPage() {
  const [selectedTab, setSelectedTab] = useState("sources");
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [newSourceType, setNewSourceType] = useState("document");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  // Filter sources based on search query
  const filteredSources = knowledgeSources.filter(
    (source) =>
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Stats for the dashboard
  const totalSources = knowledgeSources.length;
  const processedSources = knowledgeSources.filter(
    (s) => s.status === "processed"
  ).length;
  const totalDocuments = knowledgeSources.reduce(
    (acc, source) => acc + source.docCount,
    0
  );
  const lastTrainingDate =
    trainingHistory.length > 0
      ? new Date(trainingHistory[0].date).toLocaleDateString()
      : "Never";

  // Simulate training
  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsTraining(false), 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training</h1>
          <p className="text-muted-foreground">
            Train your chatbot with custom knowledge and sources
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAddingSource(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={startTraining}
            disabled={isTraining}
          >
            {isTraining ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Training...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Start Training
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Training progress indicator - only show when training */}
      {isTraining && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center">
                  <RotateCw className="mr-2 h-4 w-4 animate-spin text-blue-500" />
                  Training in progress
                </h3>
                <span className="text-sm">{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                Your chatbot is being trained with the latest knowledge sources.
                This may take several minutes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <DataCard
          title="Knowledge Sources"
          value={totalSources.toString()}
          icon={Database}
          description="Total sources added"
          variant="default"
        />
        <DataCard
          title="Processed Sources"
          value={`${processedSources}/${totalSources}`}
          icon={CheckCircle2}
          description="Ready for training"
          variant="success"
          change={Math.round((processedSources / totalSources) * 100)}
          positive={true}
        />
        <DataCard
          title="Documents"
          value={totalDocuments.toString()}
          icon={FileText}
          description="Individual documents"
          variant="default"
        />
        <DataCard
          title="Last Training"
          value={lastTrainingDate}
          icon={Clock}
          description="Most recent training date"
          variant="default"
        />
      </div>

      <Tabs
        defaultValue="sources"
        className="space-y-4"
        onValueChange={setSelectedTab}
      >
        <TabsList>
          <TabsTrigger value="sources">Knowledge Sources</TabsTrigger>
          <TabsTrigger value="training">Training History</TabsTrigger>
          <TabsTrigger value="settings">Training Settings</TabsTrigger>
        </TabsList>

        {/* Knowledge Sources Tab */}
        <TabsContent value="sources" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search sources..."
                className="pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Database className="h-4 w-4" />
              Export Sources
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSources.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No sources found. Try a different search or add a new
                      source.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {source.type === "document" ? (
                            <FileText className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Globe className="h-4 w-4 text-green-500" />
                          )}
                          <span>{source.name}</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {source.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {source.type === "document" ? "Document" : "Website"}
                      </TableCell>
                      <TableCell>{source.size}</TableCell>
                      <TableCell>
                        {source.status === "processed" ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Processed</span>
                          </div>
                        ) : source.status === "processing" ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-amber-500" />
                              <span>Processing</span>
                            </div>
                            <Progress
                              value={source.progress}
                              className="h-1.5"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span>Error</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(source.dateAdded).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Source</span>
                            </DropdownMenuItem>
                            {source.status === "error" && (
                              <DropdownMenuItem className="flex items-center">
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                <span>Retry Processing</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete Source</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Training History Tab */}
        <TabsContent value="training" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sources</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingHistory.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell>
                      {new Date(training.date).toLocaleDateString()}{" "}
                      <span className="text-muted-foreground">
                        {new Date(training.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {training.sources.map((source) => (
                          <Badge
                            key={source}
                            variant="outline"
                            className="text-xs"
                          >
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{training.duration}</TableCell>
                    <TableCell>{training.model}</TableCell>
                    <TableCell>
                      {training.status === "completed" ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span>Failed</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More History</Button>
          </div>
        </TabsContent>

        {/* Training Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Settings</CardTitle>
              <CardDescription>
                Configure the training model and parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">AI Model</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="custom">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Select which AI model to use for training your chatbot
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="training-style">Training Style</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="precise">
                        Precise (Fact-based)
                      </SelectItem>
                      <SelectItem value="balanced">
                        Balanced (Recommended)
                      </SelectItem>
                      <SelectItem value="creative">
                        Creative (More flexibility)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose how your chatbot responds based on training data
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="system-prompt">System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  placeholder="You are a helpful AI assistant that..."
                  className="min-h-[100px]"
                  defaultValue="You are a helpful AI assistant that specializes in providing customer support. Always be polite, clear, and concise in your responses. If you don't know the answer, say so and offer to connect the user with a human agent."
                />
                <p className="text-xs text-muted-foreground">
                  The system prompt defines your chatbot's personality and
                  behavior
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Advanced Settings</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-training">Automatic Training</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically train when new sources are added
                    </p>
                  </div>
                  <Switch id="auto-training" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="use-examples">
                      Use Conversation Examples
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Include sample conversation examples in training
                    </p>
                  </div>
                  <Switch id="use-examples" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="fine-tuning">Model Fine-tuning</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable fine-tuning for better performance (costs more
                      credits)
                    </p>
                  </div>
                  <Switch id="fine-tuning" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t pt-5">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Source Dialog */}
      <Dialog open={isAddingSource} onOpenChange={setIsAddingSource}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Knowledge Source</DialogTitle>
            <DialogDescription>
              Add a new knowledge source to improve your chatbot's responses
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="source-type">Source Type</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={newSourceType === "document" ? "default" : "outline"}
                  className="justify-start h-20 p-4"
                  onClick={() => setNewSourceType("document")}
                >
                  <div className="flex flex-col items-center justify-center">
                    <File className="h-6 w-6 mb-2" />
                    <span>Document</span>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant={newSourceType === "website" ? "default" : "outline"}
                  className="justify-start h-20 p-4"
                  onClick={() => setNewSourceType("website")}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Globe className="h-6 w-6 mb-2" />
                    <span>Website</span>
                  </div>
                </Button>
              </div>
            </div>

            {newSourceType === "document" ? (
              <div className="space-y-2">
                <Label htmlFor="document">Upload Document</Label>
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Drag and drop file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOCX, TXT, CSV, and Markdown files (Max
                      20MB)
                    </p>
                  </div>
                  <Input id="document" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-4">
                    Select File
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website-url">Website URL</Label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input
                        id="website-url"
                        placeholder="https://example.com"
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of the website to crawl for knowledge
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crawl-depth">Crawl Depth</Label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select crawl depth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1 - Homepage only</SelectItem>
                      <SelectItem value="2">
                        Level 2 - Homepage + linked pages
                      </SelectItem>
                      <SelectItem value="3">
                        Level 3 - Deep crawl (may take longer)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How many levels of links to follow from the homepage
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="source-name">Source Name</Label>
              <Input
                id="source-name"
                placeholder="e.g., Product Manual, Company Website"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source-tags">Tags (optional)</Label>
              <Input
                id="source-tags"
                placeholder="e.g., manual, product, support"
              />
              <p className="text-xs text-muted-foreground">
                Separate tags with commas to help organize your knowledge
                sources
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingSource(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setIsAddingSource(false)}>
              Add Source
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
