import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, TrendingUp, Globe, Bookmark, BookmarkCheck } from "lucide-react";
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
}

export const ArticleCard = ({ article, onSaveChange }: ArticleCardProps) => {
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

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-2">
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
            <Badge variant="outline" className="shrink-0 text-accent border-accent/20">
              {article.source}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{format(article.publishedAt, 'MMM d, yyyy')}</span>
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
                <li key={index} className="text-sm leading-relaxed flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-accent rounded-full mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            asChild
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read Full Article
              <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};