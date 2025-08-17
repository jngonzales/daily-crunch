// Real news service that fetches actual news from RSS feeds and news APIs
// This will provide real, diverse news content from each country

import axios from 'axios';

export interface RealNewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string[];
  source: string;
  url: string;
  publishedAt: Date;
  category: string;
  region: string;
  country: string;
  imageUrl?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  rssUrl: string;
  country: string;
  region: string;
  language: string;
}

// Real news sources with RSS feeds
export const REAL_NEWS_SOURCES: NewsSource[] = [
  // North America
  {
    id: 'cnn',
    name: 'CNN',
    url: 'https://www.cnn.com',
    rssUrl: 'https://rss.cnn.com/rss/edition.rss',
    country: 'us',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'nyt',
    name: 'The New York Times',
    url: 'https://www.nytimes.com',
    rssUrl: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    country: 'us',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'wapo',
    name: 'Washington Post',
    url: 'https://www.washingtonpost.com',
    rssUrl: 'https://feeds.washingtonpost.com/rss/rss_front-page',
    country: 'us',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    url: 'https://techcrunch.com',
    rssUrl: 'https://techcrunch.com/feed/',
    country: 'us',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'cbc',
    name: 'CBC News',
    url: 'https://www.cbc.ca/news',
    rssUrl: 'https://www.cbc.ca/cmlink/rss-topstories',
    country: 'ca',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'globe-mail',
    name: 'The Globe and Mail',
    url: 'https://www.theglobeandmail.com',
    rssUrl: 'https://www.theglobeandmail.com/feed/',
    country: 'ca',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'el-universal',
    name: 'El Universal',
    url: 'https://www.eluniversal.com.mx',
    rssUrl: 'https://www.eluniversal.com.mx/rss.xml',
    country: 'mx',
    region: 'North America',
    language: 'es'
  },

  // Europe
  {
    id: 'bbc',
    name: 'BBC News',
    url: 'https://www.bbc.com/news',
    rssUrl: 'https://feeds.bbci.co.uk/news/rss.xml',
    country: 'gb',
    region: 'Europe',
    language: 'en'
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    url: 'https://www.theguardian.com',
    rssUrl: 'https://www.theguardian.com/world/rss',
    country: 'gb',
    region: 'Europe',
    language: 'en'
  },
  {
    id: 'reuters',
    name: 'Reuters',
    url: 'https://www.reuters.com',
    rssUrl: 'https://feeds.reuters.com/reuters/topNews',
    country: 'gb',
    region: 'Europe',
    language: 'en'
  },
  {
    id: 'dw',
    name: 'Deutsche Welle',
    url: 'https://www.dw.com',
    rssUrl: 'https://rss.dw.com/xml/rss-de-all',
    country: 'de',
    region: 'Europe',
    language: 'de'
  },
  {
    id: 'le-monde',
    name: 'Le Monde',
    url: 'https://www.lemonde.fr',
    rssUrl: 'https://www.lemonde.fr/rss/une.xml',
    country: 'fr',
    region: 'Europe',
    language: 'fr'
  },
  {
    id: 'el-pais',
    name: 'El País',
    url: 'https://elpais.com',
    rssUrl: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada.xml',
    country: 'es',
    region: 'Europe',
    language: 'es'
  },
  {
    id: 'la-repubblica',
    name: 'La Repubblica',
    url: 'https://www.repubblica.it',
    rssUrl: 'https://www.repubblica.it/rss/homepage/rss2.0.xml',
    country: 'it',
    region: 'Europe',
    language: 'it'
  },
  {
    id: 'nos',
    name: 'NOS',
    url: 'https://nos.nl',
    rssUrl: 'https://feeds.nos.nl/nosnieuwsalgemeen',
    country: 'nl',
    region: 'Europe',
    language: 'nl'
  },
  {
    id: 'svt',
    name: 'SVT Nyheter',
    url: 'https://www.svt.se/nyheter',
    rssUrl: 'https://www.svt.se/nyheter/rss.xml',
    country: 'se',
    region: 'Europe',
    language: 'sv'
  },
  {
    id: 'nrk',
    name: 'NRK',
    url: 'https://www.nrk.no',
    rssUrl: 'https://www.nrk.no/nyheter/siste.rss',
    country: 'no',
    region: 'Europe',
    language: 'no'
  },
  {
    id: 'yle',
    name: 'Yle',
    url: 'https://yle.fi',
    rssUrl: 'https://feeds.yle.fi/uutiset/vko/rss.xml',
    country: 'fi',
    region: 'Europe',
    language: 'fi'
  },
  {
    id: 'swissinfo',
    name: 'SwissInfo',
    url: 'https://www.swissinfo.ch',
    rssUrl: 'https://www.swissinfo.ch/eng/rss',
    country: 'ch',
    region: 'Europe',
    language: 'en'
  },
  {
    id: 'irish-times',
    name: 'The Irish Times',
    url: 'https://www.irishtimes.com',
    rssUrl: 'https://www.irishtimes.com/rss',
    country: 'ie',
    region: 'Europe',
    language: 'en'
  },
  {
    id: 'gazeta',
    name: 'Gazeta Wyborcza',
    url: 'https://wyborcza.pl',
    rssUrl: 'https://rss.gazeta.pl/pub/rss/gazeta.xml',
    country: 'pl',
    region: 'Europe',
    language: 'pl'
  },

  // Asia
  {
    id: 'nhk',
    name: 'NHK News',
    url: 'https://www3.nhk.or.jp/news',
    rssUrl: 'https://www3.nhk.or.jp/rss/news/cat0.xml',
    country: 'jp',
    region: 'Asia',
    language: 'ja'
  },
  {
    id: 'asahi',
    name: 'Asahi Shimbun',
    url: 'https://www.asahi.com',
    rssUrl: 'https://rss.asahi.com/rss/asahi/newsheadlines.rdf',
    country: 'jp',
    region: 'Asia',
    language: 'ja'
  },
  {
    id: 'korea-herald',
    name: 'The Korea Herald',
    url: 'http://www.koreaherald.com',
    rssUrl: 'http://www.koreaherald.com/rss/rss.xml',
    country: 'kr',
    region: 'Asia',
    language: 'en'
  },
  {
    id: 'times-india',
    name: 'The Times of India',
    url: 'https://timesofindia.indiatimes.com',
    rssUrl: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    country: 'in',
    region: 'Asia',
    language: 'en'
  },
  {
    id: 'inquirer',
    name: 'Philippine Daily Inquirer',
    url: 'https://newsinfo.inquirer.net',
    rssUrl: 'https://newsinfo.inquirer.net/feed',
    country: 'ph',
    region: 'Asia',
    language: 'en'
  },
  {
    id: 'straits-times',
    name: 'The Straits Times',
    url: 'https://www.straitstimes.com',
    rssUrl: 'https://www.straitstimes.com/news/singapore/rss.xml',
    country: 'sg',
    region: 'Asia',
    language: 'en'
  },
  {
    id: 'jakarta-post',
    name: 'The Jakarta Post',
    url: 'https://www.thejakartapost.com',
    rssUrl: 'https://www.thejakartapost.com/feed',
    country: 'id',
    region: 'Asia',
    language: 'en'
  },
  {
    id: 'malay-mail',
    name: 'Malay Mail',
    url: 'https://www.malaymail.com',
    rssUrl: 'https://www.malaymail.com/feed',
    country: 'my',
    region: 'Asia',
    language: 'en'
  },

  // Oceania
  {
    id: 'abc-news',
    name: 'ABC News',
    url: 'https://www.abc.net.au/news',
    rssUrl: 'https://www.abc.net.au/news/feed/4590168/rss.xml',
    country: 'au',
    region: 'Oceania',
    language: 'en'
  },
  {
    id: 'smh',
    name: 'Sydney Morning Herald',
    url: 'https://www.smh.com.au',
    rssUrl: 'https://www.smh.com.au/rss/feed.xml',
    country: 'au',
    region: 'Oceania',
    language: 'en'
  },
  {
    id: 'nz-herald',
    name: 'NZ Herald',
    url: 'https://www.nzherald.co.nz',
    rssUrl: 'https://www.nzherald.co.nz/arc/outboundfeeds/rss/',
    country: 'nz',
    region: 'Oceania',
    language: 'en'
  },

  // South America
  {
    id: 'folha',
    name: 'Folha de São Paulo',
    url: 'https://www.folha.uol.com.br',
    rssUrl: 'https://feeds.folha.uol.com.br/emcimadahora/rss091.xml',
    country: 'br',
    region: 'South America',
    language: 'pt'
  },
  {
    id: 'clarin',
    name: 'Clarín',
    url: 'https://www.clarin.com',
    rssUrl: 'https://www.clarin.com/rss/lo-ultimo.xml',
    country: 'ar',
    region: 'South America',
    language: 'es'
  },
  {
    id: 'el-mercurio',
    name: 'El Mercurio',
    url: 'https://www.emol.com',
    rssUrl: 'https://www.emol.com/rss/rss.xml',
    country: 'cl',
    region: 'South America',
    language: 'es'
  },
  {
    id: 'el-tiempo',
    name: 'El Tiempo',
    url: 'https://www.eltiempo.com',
    rssUrl: 'https://www.eltiempo.com/rss/',
    country: 'co',
    region: 'South America',
    language: 'es'
  },

  // Africa
  {
    id: 'news24',
    name: 'News24',
    url: 'https://www.news24.com',
    rssUrl: 'https://www.news24.com/rss',
    country: 'za',
    region: 'Africa',
    language: 'en'
  },
  {
    id: 'daily-nation',
    name: 'Daily Nation',
    url: 'https://nation.africa',
    rssUrl: 'https://nation.africa/kenya/news/rss.xml',
    country: 'ke',
    region: 'Africa',
    language: 'en'
  },
  {
    id: 'punch',
    name: 'Punch',
    url: 'https://punchng.com',
    rssUrl: 'https://punchng.com/feed/',
    country: 'ng',
    region: 'Africa',
    language: 'en'
  },
  {
    id: 'al-ahram',
    name: 'Al-Ahram',
    url: 'https://english.ahram.org.eg',
    rssUrl: 'https://english.ahram.org.eg/rss/feed.aspx',
    country: 'eg',
    region: 'Africa',
    language: 'en'
  }
];

export class RealNewsService {
  // Browser-compatible RSS parser using DOMParser
  private static parseRSSXML(xmlString: string): any {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        console.warn('XML parsing failed for RSS feed');
        throw new Error('Invalid XML format');
      }
      
      // Extract feed information
      const channel = xmlDoc.querySelector('channel') || xmlDoc.querySelector('feed');
      if (!channel) {
        throw new Error('Invalid RSS/Atom feed: no channel or feed element found');
      }
      
      // Get feed title and description
      const feedTitle = channel.querySelector('title')?.textContent || 'Unknown Feed';
      const feedDescription = channel.querySelector('description')?.textContent || '';
      
      // Parse items
      const items: any[] = [];
      const itemElements = xmlDoc.querySelectorAll('item, entry');
      
      itemElements.forEach(item => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || item.querySelector('link')?.getAttribute('href') || '';
        const description = item.querySelector('description, summary, content')?.textContent || '';
        const pubDateElement = item.querySelector('pubDate, published, updated');
        const pubDate = pubDateElement?.textContent || '';
        
        // Look for enclosures (images)
        const enclosure = item.querySelector('enclosure');
        const enclosureUrl = enclosure?.getAttribute('url') || '';
        
        if (title && link) {
          items.push({
            title,
            link,
            description,
            content: description,
            contentSnippet: description,
            summary: description,
            pubDate,
            enclosure: enclosureUrl ? { url: enclosureUrl } : undefined
          });
        }
      });
      
      return {
        title: feedTitle,
        description: feedDescription,
        items
      };
    } catch (error) {
      console.error('RSS parsing error:', error);
      throw error;
    }
  }

  // Fallback news API (NewsAPI.org) - free tier
  private static NEWS_API_KEY = 'demo'; // Using demo key for free access
  private static NEWS_API_BASE_URL = 'https://newsapi.org/v2';

  // Fetch news from RSS feeds
  static async fetchNewsFromRSS(source: NewsSource): Promise<RealNewsArticle[]> {
    try {
      console.log(`Fetching RSS from ${source.name}: ${source.rssUrl}`);
      
      // Use a CORS proxy to avoid CORS issues in the browser
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.rssUrl)}`;
      
      const response = await axios.get(proxyUrl, {
        timeout: 15000
      });

      if (!response.data) {
        console.warn(`No data received from ${source.name}`);
        return [];
      }

      // Parse the RSS feed using browser-compatible parser
      const feed = this.parseRSSXML(response.data);
      
      if (!feed.items || feed.items.length === 0) {
        console.warn(`No items found in RSS feed for ${source.name}`);
        return [];
      }

      // Convert RSS items to RealNewsArticle format
      const articles: RealNewsArticle[] = feed.items
        .filter(item => item.title && item.link) // Filter out items without title or link
        .slice(0, 10) // Limit to 10 articles per source
        .map((item, index) => {
          // Parse date safely
          let publishedAt = new Date();
          if (item.pubDate) {
            try {
              const parsedDate = new Date(item.pubDate);
              if (!isNaN(parsedDate.getTime())) {
                publishedAt = parsedDate;
              }
            } catch (error) {
              console.warn('Invalid date format:', item.pubDate);
            }
          }
          
          // Extract content from different possible fields
          let content = '';
          if (item.content) {
            content = item.content;
          } else if (item.contentSnippet) {
            content = item.contentSnippet;
          } else if (item.summary) {
            content = item.summary;
          } else if (item.description) {
            content = item.description;
          } else {
            content = item.title || 'No content available';
          }

          // Clean HTML tags from content
          content = this.cleanHtmlContent(content);

          // Generate summary from content
          const summary = this.generateSummary(content);

          return {
            id: `${source.id}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: item.title || 'Untitled Article',
            content: content,
            summary,
            source: source.name,
            url: item.link || source.url,
            publishedAt,
            category: this.detectCategory(item.title || '', content),
            region: source.region,
            country: source.country,
            imageUrl: item.enclosure?.url || undefined
          };
        });

      console.log(`Successfully fetched ${articles.length} articles from ${source.name}`);
      return articles;
    } catch (error) {
      console.error(`Failed to fetch news from ${source.name}:`, error);
      
      // If RSS fails, try to get at least one article from the fallback API
      if (source.country) {
        try {
          console.log(`Trying fallback API for ${source.name}...`);
          const fallbackArticles = await this.fetchNewsFromAPI(source.country);
          return fallbackArticles.slice(0, 5); // Return up to 5 articles
        } catch (fallbackError) {
          console.error(`Fallback API also failed for ${source.name}:`, fallbackError);
        }
      }
      
      return [];
    }
  }

  // Fallback: Fetch news from NewsAPI.org
  static async fetchNewsFromAPI(country?: string): Promise<RealNewsArticle[]> {
    try {
      console.log('Using fallback NewsAPI.org service...');
      
      const params: any = {
        apiKey: this.NEWS_API_KEY,
        pageSize: 50,
        language: 'en'
      };

      if (country) {
        params.country = country;
      } else {
        params.category = 'general';
      }

      const response = await axios.get(`${this.NEWS_API_BASE_URL}/top-headlines`, {
        params,
        timeout: 15000
      });

      if (!response.data?.articles) {
        console.warn('No articles received from NewsAPI');
        return [];
      }

      const articles: RealNewsArticle[] = response.data.articles
        .filter((article: any) => article.title && article.url)
        .map((article: any, index: number) => {
          const content = article.content || article.description || article.title;
          const summary = this.generateSummary(content);

          return {
            id: `newsapi-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: article.title,
            content: content,
            summary,
            source: article.source?.name || 'NewsAPI',
            url: article.url,
            publishedAt: new Date(article.publishedAt),
            category: this.detectCategory(article.title, content),
            region: this.getRegionFromCountry(article.source?.country || 'us'),
            country: article.source?.country || 'us',
            imageUrl: article.urlToImage
          };
        });

      console.log(`Successfully fetched ${articles.length} articles from NewsAPI`);
      return articles;
    } catch (error) {
      console.error('Failed to fetch news from NewsAPI:', error);
      return [];
    }
  }

  // Get region from country code
  private static getRegionFromCountry(country: string): string {
    const regionMap: { [key: string]: string } = {
      'us': 'North America',
      'ca': 'North America',
      'mx': 'North America',
      'gb': 'Europe',
      'de': 'Europe',
      'fr': 'Europe',
      'es': 'Europe',
      'it': 'Europe',
      'nl': 'Europe',
      'se': 'Europe',
      'no': 'Europe',
      'fi': 'Europe',
      'ch': 'Europe',
      'ie': 'Europe',
      'pl': 'Europe',
      'jp': 'Asia',
      'kr': 'Asia',
      'in': 'Asia',
      'ph': 'Asia',
      'sg': 'Asia',
      'id': 'Asia',
      'my': 'Asia',
      'au': 'Oceania',
      'nz': 'Oceania',
      'br': 'South America',
      'ar': 'South America',
      'cl': 'South America',
      'co': 'South America',
      'za': 'Africa',
      'ke': 'Africa',
      'ng': 'Africa',
      'eg': 'Africa'
    };
    
    return regionMap[country] || 'International';
  }

  // Clean HTML content
  private static cleanHtmlContent(content: string): string {
    if (!content) return '';
    
    // Remove HTML tags
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim();

    return cleanContent;
  }

  // Detect category from title and content
  private static detectCategory(title: string, content: string): string {
    const text = (title + ' ' + content).toLowerCase();
    
    if (text.includes('tech') || text.includes('technology') || text.includes('ai') || text.includes('artificial intelligence')) {
      return 'Technology';
    } else if (text.includes('politics') || text.includes('government') || text.includes('election')) {
      return 'Politics';
    } else if (text.includes('economy') || text.includes('business') || text.includes('finance') || text.includes('market')) {
      return 'Economy';
    } else if (text.includes('health') || text.includes('medical') || text.includes('covid') || text.includes('vaccine')) {
      return 'Health';
    } else if (text.includes('science') || text.includes('research') || text.includes('study')) {
      return 'Science';
    } else if (text.includes('sports') || text.includes('football') || text.includes('basketball') || text.includes('tennis')) {
      return 'Sports';
    } else if (text.includes('entertainment') || text.includes('movie') || text.includes('music') || text.includes('celebrity')) {
      return 'Entertainment';
    } else {
      return 'General';
    }
  }

  // Generate summary from content
  private static generateSummary(content: string): string[] {
    if (!content || content.length < 50) {
      return ["Article content not available", "Please read the full article for details"];
    }
    
    // Split into sentences and filter out short ones
    const sentences = content
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200)
      .slice(0, 3);
    
    if (sentences.length === 0) {
      return ["Article content not available", "Please read the full article for details"];
    }
    
    return sentences;
  }

  // Fetch news from multiple sources with fallback
  static async fetchNewsFromSources(sources: NewsSource[]): Promise<RealNewsArticle[]> {
    try {
      console.log(`Fetching news from ${sources.length} sources...`);
      
      const allArticles: RealNewsArticle[] = [];
      
      // Fetch news from each source concurrently
      const fetchPromises = sources.map(source => this.fetchNewsFromRSS(source));
      const results = await Promise.allSettled(fetchPromises);
      
      // Collect successful results
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allArticles.push(...result.value);
        } else {
          console.error(`Failed to fetch from ${sources[index].name}:`, result.reason);
        }
      });
      
      // If we got no articles from RSS feeds, try the fallback API
      if (allArticles.length === 0) {
        console.log('No articles from RSS feeds, trying fallback API...');
        const fallbackArticles = await this.fetchNewsFromAPI();
        allArticles.push(...fallbackArticles);
      }
      
      // Sort by publish date (newest first)
      const sortedArticles = allArticles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      
      console.log(`Successfully fetched ${sortedArticles.length} total articles`);
      return sortedArticles;
    } catch (error) {
      console.error('Failed to fetch news from sources:', error);
      
      // Try fallback API as last resort
      try {
        console.log('Trying fallback API as last resort...');
        return await this.fetchNewsFromAPI();
      } catch (fallbackError) {
        console.error('Fallback API also failed:', fallbackError);
        return [];
      }
    }
  }

  // Get news by country
  static async getNewsByCountry(countryId: string): Promise<RealNewsArticle[]> {
    const countrySources = REAL_NEWS_SOURCES.filter(source => source.country === countryId);
    
    if (countrySources.length > 0) {
      return this.fetchNewsFromSources(countrySources);
    } else {
      // If no RSS sources for this country, use API
      return this.fetchNewsFromAPI(countryId);
    }
  }

  // Get news by region
  static async getNewsByRegion(region: string): Promise<RealNewsArticle[]> {
    const regionSources = REAL_NEWS_SOURCES.filter(source => source.region === region);
    return this.fetchNewsFromSources(regionSources);
  }

  // Get all available sources
  static getAvailableSources(): NewsSource[] {
    return REAL_NEWS_SOURCES;
  }

  // Get sources by country
  static getSourcesByCountry(countryId: string): NewsSource[] {
    return REAL_NEWS_SOURCES.filter(source => source.country === countryId);
  }

  // Test function to verify RSS fetching works
  static async testRSSFetching(): Promise<boolean> {
    try {
      console.log('Testing RSS fetching...');
      
      // Test with a reliable RSS feed
      const testSource: NewsSource = {
        id: 'test-bbc',
        name: 'BBC News (Test)',
        url: 'https://www.bbc.com/news',
        rssUrl: 'https://feeds.bbci.co.uk/news/rss.xml',
        country: 'gb',
        region: 'Europe',
        language: 'en'
      };
      
      const articles = await this.fetchNewsFromRSS(testSource);
      
      if (articles.length > 0) {
        console.log('✅ RSS fetching test successful!');
        return true;
      } else {
        console.log('❌ RSS fetching test failed - no articles returned');
        return false;
      }
    } catch (error) {
      console.error('❌ RSS fetching test failed:', error);
      return false;
    }
  }

  // Get a small sample of news for testing
  static async getSampleNews(): Promise<RealNewsArticle[]> {
    try {
      // Try to get news from a few reliable sources
      const reliableSources = REAL_NEWS_SOURCES.slice(0, 3); // First 3 sources
      const articles = await this.fetchNewsFromSources(reliableSources);
      
      if (articles.length === 0) {
        // If RSS fails completely, use fallback API
        console.log('RSS failed, using fallback API for sample news...');
        return await this.fetchNewsFromAPI();
      }
      
      return articles.slice(0, 10); // Return first 10 articles
    } catch (error) {
      console.error('Failed to get sample news:', error);
      return [];
    }
  }
}