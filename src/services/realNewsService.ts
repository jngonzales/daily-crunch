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
  isTranslated?: boolean;
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

// Real news sources with RSS feeds (prioritizing working sources)
export const REAL_NEWS_SOURCES: NewsSource[] = [
  // North America - Working sources first
  {
    id: 'npr',
    name: 'NPR News',
    url: 'https://www.npr.org',
    rssUrl: 'https://feeds.npr.org/1001/rss.xml',
    country: 'us',
    region: 'North America',
    language: 'en'
  },
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
    id: 'ap-news',
    name: 'Associated Press',
    url: 'https://apnews.com',
    rssUrl: 'https://apnews.com/index.rss',
    country: 'us',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'usa-today',
    name: 'USA Today',
    url: 'https://www.usatoday.com',
    rssUrl: 'https://rssfeeds.usatoday.com/usatoday-NewsTopStories',
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
      
      // Parse items with better error handling
      const items: any[] = [];
      const itemElements = xmlDoc.querySelectorAll('item, entry');
      
      itemElements.forEach(item => {
        try {
          const title = item.querySelector('title')?.textContent?.trim() || '';
          
          // Try multiple ways to get the link
          let link = '';
          const linkElement = item.querySelector('link');
          if (linkElement) {
            link = linkElement.textContent?.trim() || linkElement.getAttribute('href')?.trim() || '';
          }
          
          // Try multiple content fields
          const description = item.querySelector('description')?.textContent?.trim() || '';
          const summary = item.querySelector('summary')?.textContent?.trim() || '';
          const content = item.querySelector('content')?.textContent?.trim() || 
                         item.querySelector('content\\:encoded')?.textContent?.trim() || '';
          
          const pubDateElement = item.querySelector('pubDate, published, updated, dc\\:date');
          const pubDate = pubDateElement?.textContent?.trim() || '';
          
          // Look for enclosures (images)
          const enclosure = item.querySelector('enclosure');
          const enclosureUrl = enclosure?.getAttribute('url') || '';
          
          // Only add items with at least a title and link
          if (title && link) {
            items.push({
              title,
              link,
              description: description || summary || content,
              content: content || description || summary,
              contentSnippet: summary || description,
              summary: summary || description,
              'content:encoded': content,
              pubDate,
              enclosure: enclosureUrl ? { url: enclosureUrl } : undefined
            });
          }
        } catch (itemError) {
          // Skip malformed items silently
          return;
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
      
      // Use a CORS proxy to avoid CORS issues in the browser
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.rssUrl)}`;
      
      const response = await axios.get(proxyUrl, {
        timeout: 15000
      });

      if (!response.data) {
        return [];
      }

      // Parse the RSS feed using browser-compatible parser
      const feed = this.parseRSSXML(response.data);
      
      if (!feed.items || feed.items.length === 0) {
        return [];
      }

      // Convert RSS items to RealNewsArticle format
      const articles: RealNewsArticle[] = feed.items
        .filter(item => item.title && item.link) // Filter out items without title or link
        .slice(0, 10) // Limit to 10 articles per source
        .map((item, index) => {
          // Parse date safely with multiple fallbacks
          let publishedAt = new Date();
          if (item.pubDate && item.pubDate.trim()) {
            try {
              const parsedDate = new Date(item.pubDate.trim());
              if (!isNaN(parsedDate.getTime()) && parsedDate.getFullYear() > 1900) {
                publishedAt = parsedDate;
              }
            } catch (error) {
              // Fallback to current date if parsing fails
              publishedAt = new Date();
            }
          }
          
          // Ensure publishedAt is always a valid Date object
          if (!(publishedAt instanceof Date) || isNaN(publishedAt.getTime())) {
            publishedAt = new Date();
          }
          
          // Extract content from different possible fields with better fallbacks
          let content = '';
          let rawContent = '';
          
          // Try multiple content fields in order of preference
          if (item.content && item.content.trim()) {
            rawContent = item.content;
          } else if (item['content:encoded'] && item['content:encoded'].trim()) {
            rawContent = item['content:encoded'];
          } else if (item.description && item.description.trim()) {
            rawContent = item.description;
          } else if (item.contentSnippet && item.contentSnippet.trim()) {
            rawContent = item.contentSnippet;
          } else if (item.summary && item.summary.trim()) {
            rawContent = item.summary;
          } else {
            // Use title as last resort but make it more descriptive
            rawContent = `${item.title || 'News Article'}. Read the full article for complete details.`;
          }

          // Clean HTML tags from content
          content = this.cleanHtmlContent(rawContent);
          
          // If content is still too short, try to extract from other fields
          if (content.length < 50) {
            const additionalContent = [
              item.title,
              item.description,
              item.summary,
              item.contentSnippet
            ].filter(Boolean).join('. ');
            
            if (additionalContent.length > content.length) {
              content = this.cleanHtmlContent(additionalContent);
            }
          }

          // Generate summary from content with better handling
          const summary = this.generateSummary(content, item.title || '');

          const article = {
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
          
          return article;
        });

      // Silently return articles
      
              // Disable auto-translation to avoid rate limiting
        const translatedArticles = articles.map(article => ({
          ...article,
          isTranslated: false
        }));
      
      return translatedArticles;
    } catch (error) {
      // Silently handle all RSS errors to reduce console noise
      return [];
    }
  }

  // Fallback: Fetch news from NewsAPI.org (disabled due to rate limits)
  static async fetchNewsFromAPI(country?: string): Promise<RealNewsArticle[]> {
    // NewsAPI.org has strict rate limits on free tier, so we'll skip this
    // to avoid console errors and just return empty array
    return [];
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

  // Generate summary from content with better handling
  private static generateSummary(content: string, title: string = ''): string[] {
    if (!content || content.length < 20) {
      // If we have a title, create a basic summary from it
      if (title && title.length > 10) {
        return [
          title,
          "Full article content available at the source",
          "Click 'Read Full Article' for complete details"
        ];
      }
      return ["Article summary not available", "Please read the full article for details"];
    }
    
    // Clean up content first
    let cleanContent = content
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    // If content is very short, supplement with title
    if (cleanContent.length < 100 && title) {
      cleanContent = `${title}. ${cleanContent}`;
    }
    
    // Split into sentences and filter appropriately
    const sentences = cleanContent
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 15 && s.length < 300) // Allow longer sentences
      .slice(0, 4); // Allow up to 4 sentences
    
    // If we have good sentences, return them
    if (sentences.length >= 2) {
      return sentences;
    }
    
    // If we only have one sentence but it's substantial, break it down
    if (sentences.length === 1 && sentences[0].length > 100) {
      const longSentence = sentences[0];
      // Try to split on common conjunctions
      const parts = longSentence.split(/(?:, and |, but |, however |; )/);
      if (parts.length > 1) {
        return parts.slice(0, 3).map(part => part.trim());
      }
      return [longSentence];
    }
    
    // Last resort: create summary from available content
    if (cleanContent.length > 50) {
      const words = cleanContent.split(' ');
      const chunks = [];
      for (let i = 0; i < Math.min(words.length, 60); i += 20) {
        const chunk = words.slice(i, i + 20).join(' ');
        if (chunk.length > 15) {
          chunks.push(chunk);
        }
      }
      return chunks.length > 0 ? chunks : [cleanContent.substring(0, 200) + '...'];
    }
    
    // Final fallback
    return [
      title || "News article available",
      "Content summary not available",
      "Read the full article for complete information"
    ];
  }

  // Fetch news from multiple sources with fallback
  static async fetchNewsFromSources(sources: NewsSource[]): Promise<RealNewsArticle[]> {
    try {
      
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
      
      // Skip fallback API to avoid rate limiting issues
      
      // Sort by publish date (newest first)
      const sortedArticles = allArticles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      
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