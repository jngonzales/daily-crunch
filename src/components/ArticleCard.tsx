import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export interface Article {
  id: string;
  title: string;
  summary: string[];
  source: string;
  url: string;
  publishedAt: Date;
  category?: string;
}

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <Badge variant="outline" className="shrink-0 text-accent border-accent/20">
            {article.source}
          </Badge>
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