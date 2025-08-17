import { Button } from "@/components/ui/button";
import { RefreshCw, Rss } from "lucide-react";

interface HeaderProps {
  onScrape: () => void;
  isLoading: boolean;
}

export const Header = ({ onScrape, isLoading }: HeaderProps) => {
  return (
    <header className="border-b bg-gradient-card shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-hero shadow-glow">
              <Rss className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                TechNews AI
              </h1>
              <p className="text-muted-foreground text-sm">
                Intelligent tech news summarization
              </p>
            </div>
          </div>
          
          <Button
            onClick={onScrape}
            disabled={isLoading}
            className="bg-gradient-hero hover:shadow-glow transition-all duration-300"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Scraping...' : 'Scrape News'}
          </Button>
        </div>
      </div>
    </header>
  );
};