import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Monitor, 
  Heart, 
  Workflow, 
  Send, 
  Zap, 
  Clock, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import autobotHero from "@/assets/autobot-hero.png";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryCard = ({ icon, title, description, examples, color, isSelected, onClick }: CategoryCardProps) => (
  <Card 
    className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-medium ${
      isSelected ? 'ring-2 ring-primary shadow-medium' : 'hover:shadow-soft'
    }`}
    onClick={onClick}
  >
    <CardHeader className="pb-3">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${color}`}>
        {icon}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Examples:</p>
        {examples.map((example, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {example}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const AutoBotInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    {
      id: "enterprise-it",
      icon: <Monitor className="w-6 h-6 text-white" />,
      title: "Enterprise IT",
      description: "Employee support, password resets, system troubleshooting",
      examples: ["Reset password", "Account access", "System issues"],
      color: "bg-category-it"
    },
    {
      id: "healthcare",
      icon: <Heart className="w-6 h-6 text-white" />,
      title: "Healthcare",
      description: "Appointment booking, medicine reminders, health reports",
      examples: ["Book appointment", "Medicine reminders", "Report management"],
      color: "bg-category-healthcare"
    },
    {
      id: "workflow",
      icon: <Workflow className="w-6 h-6 text-white" />,
      title: "Workflow Automation",
      description: "Task creation, notifications, tool integrations",
      examples: ["Create Trello card", "Send notifications", "Generate reports"],
      color: "bg-category-workflow"
    }
  ];

  const exampleRequests = [
    "Book a cardiologist appointment next Monday at 10 AM",
    "Reset my office email and Slack passwords",
    "Create a Trello card for project tasks and notify the team",
    "Remind me to take my medicines every day at 8 PM"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setMessage("");
      // Here you would integrate with actual AI processing
    }, 2000);
  };

  const handleExampleClick = (example: string) => {
    setMessage(example);
  };

  return (
    <div className="min-h-screen bg-autobot-gradient-subtle">
      {/* Header */}
      <div className="bg-autobot-gradient">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Auto-Bot
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Universal AI-powered automation assistant for Enterprise IT, Healthcare, and Workflow Management
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Instant Actions
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Clock className="w-3 h-3 mr-1" />
                  24/7 Available
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Smart Automation
                </Badge>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={autobotHero} 
                alt="Auto-Bot Assistant" 
                className="w-64 h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">What can I help you with?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                title={category.title}
                description={category.description}
                examples={category.examples}
                color={category.color}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="max-w-4xl mx-auto shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-autobot-gradient rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Chat with Auto-Bot
            </CardTitle>
            <CardDescription>
              Describe your request and I'll handle it automatically or connect you with the right person.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Example Requests */}
            <div>
              <p className="text-sm font-medium mb-3">Try these examples:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {exampleRequests.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto p-3 text-wrap"
                    onClick={() => handleExampleClick(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <Textarea
                placeholder="Type your request here... (e.g., 'Book a doctor appointment for next Friday at 2 PM')"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {selectedCategory && (
                    <Badge variant="outline">
                      Category: {categories.find(c => c.id === selectedCategory)?.title}
                    </Badge>
                  )}
                </div>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isProcessing}
                  className="bg-autobot-gradient hover:opacity-90"
                >
                  {isProcessing ? (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm">Auto-Bot is processing your request...</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoBotInterface;