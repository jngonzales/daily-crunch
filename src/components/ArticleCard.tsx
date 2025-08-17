import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, TrendingUp, Globe, Bookmark, BookmarkCheck, Eye, EyeOff, Languages } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { NewsService } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export interface Article {
  id: string;
  title: string;
  summary: string[];
  source: string;
  url: string;
  publishedAt: Date;
  category?: string;
  region?: string;
}

interface ArticleCardProps {
  article: Article;
  onSaveChange?: () => void;
  isRead?: boolean;
  onMarkAsRead?: () => void;
}

export const ArticleCard = ({ article, onSaveChange, isRead = false, onMarkAsRead }: ArticleCardProps) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      checkIfSaved();
    }
  }, [currentUser, article.url]);

  const checkIfSaved = async () => {
    try {
      const saved = await NewsService.isArticleSaved(article.url, currentUser!.uid);
      setIsSaved(saved);
    } catch (error) {
      console.error('Failed to check saved status:', error);
    }
  };

  const handleSaveToggle = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save articles.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        await NewsService.removeSavedArticle(article.id);
        setIsSaved(false);
        toast({
          title: "Article Removed",
          description: "Article removed from your saved list.",
        });
        onSaveChange?.();
      } else {
        await NewsService.saveArticle(article, currentUser.uid);
        setIsSaved(true);
        toast({
          title: "Article Saved",
          description: "Article added to your saved list.",
        });
        onSaveChange?.();
      }
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Failed to save/remove article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkAsRead = () => {
    if (onMarkAsRead) {
      onMarkAsRead();
      toast({
        title: "Article Marked as Read",
        description: "This article will be hidden after 1 month.",
      });
    }
  };

  const handleMarkAsUnread = () => {
    if (onMarkAsRead) {
      // Remove from read list by calling markAsRead again (toggles state)
      onMarkAsRead();
      toast({
        title: "Article Marked as Unread",
        description: "This article will remain visible.",
      });
    }
  };

  return (
    <Card className={`bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group dark:bg-gradient-card dark:shadow-card dark:hover:shadow-card-hover ${
      isRead ? 'opacity-75 border-l-4 border-l-green-500' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-semibold text-lg leading-tight text-card-foreground group-hover:text-primary transition-colors ${
            isRead ? 'line-through text-muted-foreground' : ''
          }`}>
            {article.title}
          </h3>
          <div className="flex items-center gap-2">
            {/* Mark as Read/Unread Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={isRead ? handleMarkAsUnread : handleMarkAsRead}
              className="h-8 w-8 p-0 hover:bg-accent/20"
              title={isRead ? "Mark as unread" : "Mark as read"}
            >
              {isRead ? (
                <EyeOff className="h-4 w-4 text-green-500" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            
            {/* Save Button */}
            {currentUser && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveToggle}
                disabled={isSaving}
                className="h-8 w-8 p-0 hover:bg-accent/20"
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-accent" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            )}
            
            {/* Source Badge - Fixed for dark mode visibility */}
            <Badge 
              variant="outline" 
              className="shrink-0 text-accent border-accent/20 bg-background dark:bg-card dark:text-foreground dark:border-border"
            >
              {article.source}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {article.publishedAt && !isNaN(article.publishedAt.getTime()) 
                ? format(article.publishedAt, 'MMM d, yyyy')
                : 'Date unavailable'
              }
            </span>
          </div>
          {article.category && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{article.category}</span>
            </div>
          )}
          {article.region && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>{article.region}</span>
            </div>
          )}
          {isRead && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-700"
            >
              Read
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Key Points
            </h4>
            <ul className="space-y-1">
              {article.summary.map((point, index) => (
                <li key={index} className="text-sm leading-relaxed flex items-start gap-2 text-card-foreground">
                  <span className="h-1.5 w-1.5 bg-accent rounded-full mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              asChild
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read Full Article
                <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="px-3 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
              onClick={() => {
                const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(article.url)}`;
                window.open(googleTranslateUrl, '_blank', 'noopener,noreferrer');
              }}
              title="Translate to English"
            >
              <Languages className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};