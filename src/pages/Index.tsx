import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ArticleCard, Article } from "@/components/ArticleCard";
import { LoadingState } from "@/components/LoadingState";
import { NewsScraper, RawArticle } from "@/services/newsScraper";
import { NLPSummarizer } from "@/services/nlpSummarizer";
import { NewsService, SavedArticle } from "@/services/newsService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Sparkles, Bookmark, Globe, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState("latest");
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
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

  const handleScrapeNews = async () => {
    setIsLoading(true);
    
    try {
      toast({
        title: "Scraping Started",
        description: "Fetching latest tech news from multiple sources...",
      });

      // Scrape news articles
      const rawArticles: RawArticle[] = await NewsScraper.scrapeNews();
      
      toast({
        title: "Processing Articles",
        description: "Generating AI-powered summaries...",
      });

      // Process articles with AI summarization
      const processedArticles: Article[] = await Promise.all(
        rawArticles.map(async (rawArticle, index) => {
          try {
            const summary = await NLPSummarizer.summarizeToPoints(rawArticle.content);
            
            return {
              id: `article-${index}-${Date.now()}`,
              title: rawArticle.title,
              summary,
              source: rawArticle.source,
              url: rawArticle.url,
              publishedAt: rawArticle.publishedAt,
              category: rawArticle.category,
            };
          } catch (error) {
            console.error(`Failed to process article ${index}:`, error);
            // Return with fallback summary
            return {
              id: `article-${index}-${Date.now()}`,
              title: rawArticle.title,
              summary: ["Article content processing failed", "Please read the full article for details"],
              source: rawArticle.source,
              url: rawArticle.url,
              publishedAt: rawArticle.publishedAt,
              category: rawArticle.category,
            };
          }
        })
      );

      setArticles(processedArticles);
      
      toast({
        title: "Success!",
        description: `Processed ${processedArticles.length} articles with AI summaries`,
      });
    } catch (error) {
      console.error("Scraping failed:", error);
      toast({
        title: "Scraping Failed",
        description: "Unable to fetch news articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              <h2 className="text-2xl font-bold mb-3">Welcome to TechNews AI</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Get the latest international tech news with AI-powered summaries. Click "Scrape News" to start.
              </p>
            </div>
            
            {!currentUser && (
              <Alert className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <a href="/auth" className="text-primary hover:underline">Sign up or log in</a> to save articles and access more features.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {isLoading && <LoadingState />}

        {articles.length > 0 && !isLoading && (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
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
              </TabsList>

              <TabsContent value="latest" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Latest Tech News</h2>
                  <span className="text-muted-foreground text-sm">
                    {articles.length} articles • AI summarized
                  </span>
                </div>
                
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {articles.map((article, index) => (
                    <div key={article.id} style={{ animationDelay: `${index * 100}ms` }}>
                      <ArticleCard article={article} onSaveChange={refreshSavedArticles} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {currentUser && (
                <TabsContent value="saved" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Your Saved Articles</h2>
                    <span className="text-muted-foreground text-sm">
                      {savedArticles.length} saved articles
                    </span>
                  </div>
                  
                  {savedArticles.length === 0 ? (
                    <div className="text-center py-12">
                      <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No saved articles yet</h3>
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
                      <ArticleCard article={article} onSaveChange={refreshSavedArticles} />
                    </div>
                  ))}
                    </div>
                  )}
                </TabsContent>
              )}

              <TabsContent value="international" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">International Tech News</h2>
                  <span className="text-muted-foreground text-sm">
                    Global coverage • Multiple regions
                  </span>
                </div>
                
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {articles.map((article, index) => (
                    <div key={article.id} style={{ animationDelay: `${index * 100}ms` }}>
                      <ArticleCard article={article} onSaveChange={refreshSavedArticles} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;