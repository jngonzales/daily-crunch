import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ArticleCard, Article } from "@/components/ArticleCard";
import { LoadingState } from "@/components/LoadingState";
import { NewsScraper, RawArticle } from "@/services/newsScraper";
import { NLPSummarizer } from "@/services/nlpSummarizer";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
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
                Get the latest tech news with AI-powered summaries. Click "Scrape News" to start.
              </p>
            </div>
            
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This demo uses sample articles. In production, it would scrape live content from TechCrunch, The Verge, and Wired.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {isLoading && <LoadingState />}

        {articles.length > 0 && !isLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Latest Tech News</h2>
              <span className="text-muted-foreground text-sm">
                {articles.length} articles • AI summarized
              </span>
            </div>
            
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {articles.map((article, index) => (
                <div key={article.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;