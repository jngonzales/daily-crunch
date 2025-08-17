import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ArticleCard, Article } from "@/components/ArticleCard";
import { LoadingState } from "@/components/LoadingState";
import { NewsScraper, RawArticle } from "@/services/newsScraper";
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
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState("latest");
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot-password' | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]); // No default countries
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

    // Initialize the NLP summarizer with timeout
    const initializeSummarizer = async () => {
      try {
        // Try to initialize AI with a reasonable timeout
        await Promise.race([
          NLPSummarizer.initialize(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Initialization timeout')), 20000)
          )
        ]);
        
        toast({
          title: "AI Ready",
          description: "NLP summarizer initialized successfully",
        });
      } catch (error) {
        console.warn("AI initialization failed or timed out, using fallback mode:", error);
        toast({
          title: "AI Fallback Mode",
          description: "Using simplified summarization (no AI model)",
          variant: "default",
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initializeSummarizer();
    
    // Automatically fetch default news on page load
    handleScrapeNews();
  }, [toast]);

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
      
      // Convert to Article format
      const processedArticles: Article[] = realArticles.map(convertToArticle);

      setArticles(processedArticles);
      
      const successMessage = selectedCountries.length > 0 
        ? `Fetched ${processedArticles.length} articles from ${selectedCountries.length} countries`
        : `Fetched ${processedArticles.length} trending articles from around the world`;
        
      toast({
        title: "Success!",
        description: successMessage,
      });
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

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
            <div className="p-4 rounded-full bg-gradient-hero shadow-glow animate-pulse">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Initializing AI Engine</h2>
              <p className="text-muted-foreground">Setting up NLP summarization...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter articles based on current tab
  const getFilteredArticles = () => {
    const filtered = filterOldReadArticles(articles);
    
    switch (activeTab) {
      case 'latest':
        return filtered;
      case 'international':
        return filtered;
      case 'countries':
        // Return articles from selected countries
        return filtered.filter(article => 
          selectedCountries.some(countryId => {
            const country = getCountryById(countryId);
            return country && article.region === country.region;
          })
        );
      default:
        return filtered;
    }
  };

  const filteredArticles = getFilteredArticles();

  return (
    <div className="min-h-screen bg-background">
      <Header onScrape={handleScrapeNews} isLoading={isLoading} />
      
      <main className="container mx-auto px-6 py-8">
        {articles.length === 0 && !isLoading && (
          <div className="flex items-center justify-center min-h-[60vh] flex-col gap-6">
            <div className="text-center">
              <div className="p-4 rounded-full bg-gradient-hero shadow-glow mb-6">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-foreground">Welcome to TechNews AI</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Get the latest trending news from around the world with AI-powered summaries. News is automatically fetched, or use the Countries tab to filter by specific regions.
              </p>
              
              {/* Country Selection */}
              <div className="mb-6">
                <Button 
                  onClick={() => setActiveTab("countries")}
                  variant="outline"
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Select Countries (Optional)
                </Button>
              </div>
              
              {selectedCountries.length > 0 && (
                <div className="mb-6">
                  <CountrySelector
                    selectedCountries={selectedCountries}
                    onCountryToggle={handleCountryToggle}
                    onSelectAll={handleSelectAllCountries}
                    onClearAll={handleClearAllCountries}
                  />
                </div>
              )}
              
              <div className="text-center">
                <Button 
                  onClick={handleScrapeNews}
                  className="bg-gradient-hero hover:shadow-glow transition-all duration-300"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {selectedCountries.length > 0 
                    ? `Fetch News from ${selectedCountries.length} Countries`
                    : 'Fetch Trending News'
                  }
                </Button>
              </div>
            </div>
            
            {!currentUser && (
              <Alert className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary hover:underline"
                    onClick={() => handleAuthModeChange('login')}
                  >
                    Sign up or log in
                  </Button> to save articles and access more features.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {isLoading && <LoadingState />}

        {articles.length > 0 && !isLoading && (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="latest" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Latest News
                </TabsTrigger>
                {currentUser && (
                  <TabsTrigger value="saved" className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    Saved ({savedArticles.length})
                  </TabsTrigger>
                )}
                <TabsTrigger value="international" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  International
                </TabsTrigger>
                <TabsTrigger value="countries" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Countries
                </TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Latest News</h2>
                  <span className="text-muted-foreground text-sm">
                    {filteredArticles.length} articles • From {selectedCountries.length} countries
                  </span>
                </div>
                
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {filteredArticles.map((article, index) => (
                    <div key={article.id} style={{ animationDelay: `${index * 100}ms` }}>
                      <ArticleCard 
                        article={article} 
                        onSaveChange={refreshSavedArticles}
                        isRead={readArticles.has(article.id)}
                        onMarkAsRead={() => markArticleAsRead(article.id)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {currentUser && (
                <TabsContent value="saved" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Your Saved Articles</h2>
                    <span className="text-muted-foreground text-sm">
                      {savedArticles.length} saved articles
                    </span>
                  </div>
                  
                  {savedArticles.length === 0 ? (
                    <div className="text-center py-12">
                      <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2 text-foreground">No saved articles yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Save articles you're interested in to read later.
                      </p>
                      <Button onClick={() => setActiveTab("latest")}>
                        Browse Latest News
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                      {savedArticles.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 100}ms` }}>
                          <ArticleCard 
                            article={article} 
                            onSaveChange={refreshSavedArticles}
                            isRead={readArticles.has(article.id)}
                            onMarkAsRead={() => markArticleAsRead(article.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              )}

              <TabsContent value="international" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">International News</h2>
                  <span className="text-muted-foreground text-sm">
                    Global coverage • Multiple regions
                  </span>
                </div>
                
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {filteredArticles.map((article, index) => (
                    <div key={article.id} style={{ animationDelay: `${index * 100}ms` }}>
                      <ArticleCard 
                        article={article} 
                        onSaveChange={refreshSavedArticles}
                        isRead={readArticles.has(article.id)}
                        onMarkAsRead={() => markArticleAsRead(article.id)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="countries" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Country-Specific News</h2>
                  <span className="text-muted-foreground text-sm">
                    Optional: Select countries to filter news by region
                  </span>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    💡 <strong>Tip:</strong> You can get news without selecting countries. Use this tab only if you want news from specific regions.
                  </p>
                </div>
                
                <CountrySelector
                  selectedCountries={selectedCountries}
                  onCountryToggle={handleCountryToggle}
                  onSelectAll={handleSelectAllCountries}
                  onClearAll={handleClearAllCountries}
                />

                {/* Show news from selected countries */}
                {selectedCountries.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">News from Selected Countries</h3>
                      <Button 
                        onClick={handleScrapeNews}
                        size="sm"
                        className="bg-gradient-hero hover:shadow-glow transition-all duration-300"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Fetch Country News
                      </Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                      {filteredArticles.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 100}ms` }}>
                          <ArticleCard 
                            article={article} 
                            onSaveChange={refreshSavedArticles}
                            isRead={readArticles.has(article.id)}
                            onMarkAsRead={() => markArticleAsRead(article.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedCountries.length === 0 && (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-foreground">No Countries Selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select countries above to get region-specific news, or use the main "Fetch Trending News" button for global coverage.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      {/* Authentication Overlay */}
      {authMode && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeAuth}
              className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground"
            >
              ✕ Close
            </Button>
            
            {authMode === 'login' && (
              <LoginForm
                onSwitchToSignup={() => handleAuthModeChange('signup')}
                onSwitchToForgotPassword={() => handleAuthModeChange('forgot-password')}
                onSuccess={closeAuth}
              />
            )}
            
            {authMode === 'signup' && (
              <SignupForm
                onSwitchToLogin={() => handleAuthModeChange('login')}
                onSuccess={closeAuth}
              />
            )}
            
            {authMode === 'forgot-password' && (
              <ForgotPasswordForm
                onBackToLogin={() => handleAuthModeChange('login')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;