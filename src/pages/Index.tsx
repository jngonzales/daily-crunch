import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ArticleCard, Article } from "@/components/ArticleCard";
import { LoadingState } from "@/components/LoadingState";
import { NLPSummarizer } from "@/services/nlpSummarizer";
import { NewsService, SavedArticle } from "@/services/newsService";
import { RealNewsService, RealNewsArticle, NewsSource } from "@/services/realNewsService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Sparkles, Bookmark, Globe, TrendingUp, Settings, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { CountrySelector } from "@/components/CountrySelector";
import { COUNTRIES, getSourcesByCountry, getCountryById } from "@/data/countries";

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false); // Changed to false initially
  const [activeTab, setActiveTab] = useState("latest");
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot-password' | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load read articles from localStorage
    const savedReadArticles = localStorage.getItem('readArticles');
    if (savedReadArticles) {
      setReadArticles(new Set(JSON.parse(savedReadArticles)));
    }

    // Don't automatically initialize AI or fetch news - let user do it manually
    setIsInitializing(false);
  }, []);

  // Load saved articles when user is authenticated
  useEffect(() => {
    if (currentUser) {
      loadSavedArticles();
    }
  }, [currentUser]);

  const loadSavedArticles = async () => {
    if (!currentUser) return;
    
    try {
      const saved = await NewsService.getSavedArticles(currentUser.uid);
      setSavedArticles(saved);
    } catch (error) {
      console.error('Failed to load saved articles:', error);
    }
  };

  // Refresh saved articles when they change
  const refreshSavedArticles = () => {
    if (currentUser) {
      loadSavedArticles();
    }
  };

  // Handle authentication mode switching
  const handleAuthModeChange = (mode: 'login' | 'signup' | 'forgot-password' | null) => {
    setAuthMode(mode);
  };

  // Close authentication forms
  const closeAuth = () => {
    setAuthMode(null);
  };

  // Handle country selection
  const handleCountryToggle = (countryId: string) => {
    setSelectedCountries(prev => 
      prev.includes(countryId)
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };

  const handleSelectAllCountries = () => {
    setSelectedCountries(COUNTRIES.map(country => country.id));
  };

  const handleClearAllCountries = () => {
    setSelectedCountries([]);
  };

  // Mark article as read
  const markArticleAsRead = (articleId: string) => {
    const newReadArticles = new Set(readArticles);
    newReadArticles.add(articleId);
    setReadArticles(newReadArticles);
    localStorage.setItem('readArticles', JSON.stringify([...newReadArticles]));
  };

  // Filter out old read articles (older than 1 month)
  const filterOldReadArticles = (articles: Article[]) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return articles.filter(article => {
      // If article is older than 1 month and marked as read, filter it out
      if (article.publishedAt < oneMonthAgo && readArticles.has(article.id)) {
        return false;
      }
      return true;
    });
  };

  // Convert RealNewsArticle to Article format
  const convertToArticle = (realArticle: RealNewsArticle): Article => {
    return {
      id: realArticle.id,
      title: realArticle.title,
      summary: realArticle.summary,
      source: realArticle.source,
      url: realArticle.url,
      publishedAt: realArticle.publishedAt,
      category: realArticle.category,
      region: realArticle.region,
    };
  };

  const handleScrapeNews = async () => {
    setIsLoading(true);
    
    try {
      let toastDescription = "Getting latest trending news from around the world...";
      
      if (selectedCountries.length > 0) {
        toastDescription = `Getting latest news from ${selectedCountries.length} selected countries...`;
      }
      
      toast({
        title: "Fetching News",
        description: toastDescription,
      });

      let realArticles: RealNewsArticle[] = [];
      
      if (selectedCountries.length > 0) {
        // Get news from selected countries
        const allSources: NewsSource[] = [];
        selectedCountries.forEach(countryId => {
          const countrySources = RealNewsService.getSourcesByCountry(countryId);
          allSources.push(...countrySources);
        });
        
        // Fetch news articles from selected sources
        realArticles = await RealNewsService.fetchNewsFromSources(allSources);
      } else {
        // Get default trending news from all sources
        const allSources = RealNewsService.getAvailableSources();
        realArticles = await RealNewsService.fetchNewsFromSources(allSources);
      }
      
      // If no articles from RSS, try fallback
      if (realArticles.length === 0) {
        toast({
          title: "RSS Feeds Unavailable",
          description: "Trying alternative news sources...",
        });
        
        // Try fallback API
        realArticles = await RealNewsService.fetchNewsFromAPI();
      }
      
      // Convert to Article format
      const processedArticles: Article[] = realArticles.map(convertToArticle);

      setArticles(processedArticles);
      
      if (processedArticles.length === 0) {
        toast({
          title: "No News Available",
          description: "Unable to fetch news at this time. Please try again later.",
          variant: "destructive",
        });
      } else {
        const successMessage = selectedCountries.length > 0 
          ? `Fetched ${processedArticles.length} articles from ${selectedCountries.length} countries`
          : `Fetched ${processedArticles.length} trending articles from around the world`;
          
        toast({
          title: "Success!",
          description: successMessage,
        });
      }
    } catch (error) {
      console.error("News fetching failed:", error);
      toast({
        title: "News Fetching Failed",
        description: "Unable to fetch news articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get news for specific country
  const getNewsForCountry = async (countryId: string): Promise<Article[]> => {
    if (!countryId) return [];
    
    try {
      const countryNews = await RealNewsService.getNewsByCountry(countryId);
      return countryNews.map(convertToArticle);
    } catch (error) {
      console.error(`Failed to get news for country ${countryId}:`, error);
      return [];
    }
  };

  // Simplified render - just show a welcome message and a button to fetch news
  return (
    <div className="min-h-screen bg-background">
      <Header onScrape={handleScrapeNews} isLoading={isLoading} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[60vh] flex-col gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Daily Crunch</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your AI-powered news aggregator
            </p>
            <Button 
              onClick={handleScrapeNews} 
              disabled={isLoading}
              size="lg"
              className="text-lg px-8 py-4"
            >
              {isLoading ? "Fetching News..." : "Get Latest News"}
            </Button>
          </div>
          
          {articles.length > 0 && (
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {articles.slice(0, 6).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isRead={readArticles.has(article.id)}
                    onMarkAsRead={() => markArticleAsRead(article.id)}
                    onSave={refreshSavedArticles}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;