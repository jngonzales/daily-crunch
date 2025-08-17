import { Button } from "@/components/ui/button";
import { RefreshCw, Rss, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { TimeDisplay } from "./TimeDisplay";

interface HeaderProps {
  onScrape: () => void;
  isLoading: boolean;
}

export const Header = ({ onScrape, isLoading }: HeaderProps) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="border-b border-border bg-gradient-card shadow-card dark:bg-gradient-card dark:shadow-card">
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
          
          <div className="flex items-center gap-4">
            <TimeDisplay />
            <ThemeToggle />
            
            {currentUser && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{currentUser.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <Button
              onClick={onScrape}
              disabled={isLoading}
              className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-white"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {isLoading ? 'Fetching...' : 'Fetch News'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};