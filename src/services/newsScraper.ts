// Enhanced news scraper with international sources and current news
// In a real implementation, this would use RSS feeds and web scraping APIs

export interface RawArticle {
  title: string;
  content: string;
  source: string;
  url: string;
  publishedAt: Date;
  category?: string;
  region?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: 'general' | 'tech' | 'business' | 'politics' | 'science';
  language: string;
  region: string;
}

// Enhanced international news sources with more diverse content and better country mapping
const INTERNATIONAL_NEWS_SOURCES: RawArticle[] = [
  // Latest Tech News (August 2025)
  {
    title: "Google Gemini 2.0 Breaks New Ground in Multimodal AI Understanding",
    content: "Google has unveiled Gemini 2.0, its most advanced AI model yet, featuring unprecedented capabilities in understanding and generating content across text, images, audio, and video. The new model demonstrates remarkable improvements in reasoning, creativity, and real-world knowledge, making it a formidable competitor to OpenAI's latest offerings. Early demonstrations show Gemini 2.0 excelling in complex tasks like scientific research, creative writing, and code generation. The model is now available through Google's AI Studio and will be integrated into various Google products.",
    source: "TechCrunch",
    url: "https://techcrunch.com/google-gemini-2",
    publishedAt: new Date('2025-08-16T14:00:00Z'),
    category: "AI",
    region: "US"
  },
  {
    title: "Apple's iPhone 17 Pro Max Introduces Revolutionary Neural Engine",
    content: "Apple's latest flagship smartphone, the iPhone 17 Pro Max, features a next-generation Neural Engine that delivers 40% faster AI processing compared to its predecessor. The new chip enables advanced features like real-time language translation, enhanced computational photography, and improved Siri capabilities. The device also introduces a new titanium design and improved battery life, making it one of the most powerful smartphones ever created.",
    source: "The Verge",
    url: "https://theverge.com/iphone-17-pro-max",
    publishedAt: new Date('2025-08-15T10:30:00Z'),
    category: "Hardware",
    region: "US"
  },
  {
    title: "European Union Approves Comprehensive AI Regulation Framework",
    content: "The European Parliament has passed landmark legislation establishing comprehensive regulations for artificial intelligence development and deployment. The new framework includes strict guidelines for high-risk AI applications, transparency requirements, and consumer protection measures. This represents the world's first comprehensive AI regulation and is expected to influence global AI governance standards.",
    source: "BBC Tech",
    url: "https://bbc.com/eu-ai-regulation",
    publishedAt: new Date('2025-08-14T16:45:00Z'),
    category: "Policy",
    region: "UK"
  },
  {
    title: "China's Baidu Launches Quantum-Safe AI Infrastructure",
    content: "Baidu has announced the launch of its quantum-safe AI infrastructure, designed to protect against future quantum computing threats. The new system combines traditional encryption with quantum-resistant algorithms, ensuring long-term security for AI applications. This development positions China as a leader in quantum-safe computing technology.",
    source: "South China Morning Post",
    url: "https://scmp.com/baidu-quantum-safe",
    publishedAt: new Date('2025-08-13T12:20:00Z'),
    category: "Security",
    region: "China"
  },
  {
    title: "Tesla's Robotaxi Network Goes Live in Three Major Cities",
    content: "Tesla has successfully launched its autonomous robotaxi service in Los Angeles, New York, and Tokyo, marking a significant milestone in autonomous transportation. The service operates 24/7 and has already completed thousands of rides with zero accidents. This development accelerates the transition toward autonomous mobility and could reshape urban transportation systems worldwide.",
    source: "Reuters Tech",
    url: "https://reuters.com/tesla-robotaxi-launch",
    publishedAt: new Date('2025-08-12T09:15:00Z'),
    category: "Transportation",
    region: "Global"
  },
  {
    title: "Meta's Neural Interface Breakthrough: Direct Brain-to-Computer Communication",
    content: "Meta has achieved a breakthrough in neural interface technology, enabling direct communication between the human brain and computers. The new system uses non-invasive sensors to read brain signals and translate them into digital commands. This technology could revolutionize how we interact with technology and assist people with disabilities.",
    source: "Wired",
    url: "https://wired.com/meta-neural-interface",
    publishedAt: new Date('2025-08-11T15:30:00Z'),
    category: "Neuroscience",
    region: "US"
  },
  {
    title: "Japan's SoftBank Invests $10B in AI Startup Ecosystem",
    content: "SoftBank has announced a massive $10 billion investment in Japan's AI startup ecosystem, aiming to position the country as a global AI leader. The investment will support hundreds of startups working on cutting-edge AI applications, from healthcare to robotics. This move signals Japan's commitment to AI innovation and economic growth.",
    source: "Nikkei Asia",
    url: "https://asia.nikkei.com/softbank-ai-investment",
    publishedAt: new Date('2025-08-10T11:45:00Z'),
    category: "Investment",
    region: "Japan"
  },
  {
    title: "UK's DeepMind Achieves Breakthrough in Protein Folding Prediction",
    content: "DeepMind has made significant progress in protein folding prediction, achieving 95% accuracy in predicting complex protein structures. This breakthrough has profound implications for drug discovery, disease understanding, and biotechnology. The research could accelerate the development of new treatments for various diseases.",
    source: "The Guardian",
    url: "https://guardian.com/deepmind-protein-folding",
    publishedAt: new Date('2025-08-09T13:20:00Z'),
    category: "Biotech",
    region: "UK"
  },
  {
    title: "India's Tech Giants Launch Open Source AI Models",
    content: "Leading Indian technology companies have collaborated to launch open-source AI models specifically designed for Indian languages and cultural contexts. This initiative aims to democratize AI access and ensure that AI technology serves India's diverse population effectively. The models support 22 official languages and various regional dialects.",
    source: "Economic Times",
    url: "https://economictimes.com/india-open-source-ai",
    publishedAt: new Date('2025-08-08T08:30:00Z'),
    category: "AI",
    region: "India"
  },
  {
    title: "Brazil's Fintech Revolution: AI-Powered Banking for the Unbanked",
    content: "Brazilian fintech companies are leveraging AI to provide banking services to millions of previously unbanked citizens. These AI-powered platforms offer personalized financial advice, fraud detection, and automated investment strategies. This development is transforming financial inclusion in Latin America's largest economy.",
    source: "Valor Econômico",
    url: "https://valor.com.br/brazil-fintech-ai",
    publishedAt: new Date('2025-08-07T14:15:00Z'),
    category: "Fintech",
    region: "Brazil"
  },
  // Additional international sources with better country mapping
  {
    title: "Germany's Siemens Advances Industrial AI with Edge Computing",
    content: "Siemens has announced a breakthrough in industrial AI applications, combining edge computing with machine learning to optimize manufacturing processes in real-time. The new system reduces energy consumption by 25% and increases production efficiency by 30% across various industrial sectors.",
    source: "Der Spiegel",
    url: "https://spiegel.de/siemens-industrial-ai",
    publishedAt: new Date('2025-08-16T11:00:00Z'),
    category: "Manufacturing",
    region: "Germany"
  },
  {
    title: "France's TotalEnergies Invests in AI-Powered Renewable Energy",
    content: "TotalEnergies has committed €5 billion to AI-powered renewable energy projects, focusing on smart grid optimization and predictive maintenance for wind and solar farms. This investment positions France as a leader in sustainable energy technology.",
    source: "Le Monde",
    url: "https://lemonde.fr/total-energies-ai-renewable",
    publishedAt: new Date('2025-08-15T14:30:00Z'),
    category: "Energy",
    region: "France"
  },
  {
    title: "Spain's Telefónica Launches 6G Research Initiative",
    content: "Telefónica has launched a comprehensive 6G research initiative in partnership with leading Spanish universities and tech companies. The project focuses on AI-driven network optimization and next-generation communication protocols.",
    source: "El País",
    url: "https://elpais.com/telefonica-6g-initiative",
    publishedAt: new Date('2025-08-14T09:15:00Z'),
    category: "Telecommunications",
    region: "Spain"
  },
  {
    title: "Italy's Enel Develops Smart City AI Platform",
    content: "Enel has developed an AI platform for smart city management, integrating IoT sensors with machine learning to optimize urban infrastructure, traffic flow, and energy distribution across Italian cities.",
    source: "La Repubblica",
    url: "https://repubblica.it/enel-smart-city-ai",
    publishedAt: new Date('2025-08-13T16:45:00Z'),
    category: "Smart Cities",
    region: "Italy"
  },
  {
    title: "Netherlands' ASML Advances EUV Lithography with AI",
    content: "ASML has integrated AI into its EUV lithography systems, achieving unprecedented precision in semiconductor manufacturing. This breakthrough enables the production of next-generation chips with 2nm process nodes.",
    source: "NOS",
    url: "https://nos.nl/asml-euv-ai",
    publishedAt: new Date('2025-08-12T12:20:00Z'),
    category: "Semiconductors",
    region: "Netherlands"
  },
  {
    title: "Sweden's Ericsson Pioneers AI-Enhanced 5G Networks",
    content: "Ericsson has developed AI-enhanced 5G network technology that automatically optimizes performance based on real-time traffic patterns and user behavior. This innovation improves network efficiency by 40%.",
    source: "SVT Nyheter",
    url: "https://svt.se/ericsson-ai-5g",
    publishedAt: new Date('2025-08-11T10:30:00Z'),
    category: "5G",
    region: "Sweden"
  },
  {
    title: "Norway's Equinor Deploys AI for Offshore Wind Optimization",
    content: "Equinor has deployed AI systems across its offshore wind farms, using machine learning to predict weather patterns and optimize turbine performance. This technology increases energy output by 15%.",
    source: "NRK",
    url: "https://nrk.no/equinor-ai-wind",
    publishedAt: new Date('2025-08-10T13:15:00Z'),
    category: "Renewable Energy",
    region: "Norway"
  },
  {
    title: "Finland's Nokia Advances Quantum Computing Research",
    content: "Nokia has announced a breakthrough in quantum computing research, developing new quantum algorithms for telecommunications and cybersecurity applications. This research positions Finland at the forefront of quantum technology.",
    source: "Helsingin Sanomat",
    url: "https://hs.fi/nokia-quantum-computing",
    publishedAt: new Date('2025-08-09T15:45:00Z'),
    category: "Quantum Computing",
    region: "Finland"
  },
  {
    title: "Switzerland's Roche Develops AI-Powered Drug Discovery Platform",
    content: "Roche has developed an AI platform that accelerates drug discovery by 10x, using machine learning to predict molecular interactions and optimize drug candidates. This technology could revolutionize pharmaceutical research.",
    source: "SwissInfo",
    url: "https://swissinfo.ch/roche-ai-drug-discovery",
    publishedAt: new Date('2025-08-08T11:20:00Z'),
    category: "Pharmaceuticals",
    region: "Switzerland"
  },
  {
    title: "Ireland's Stripe Launches AI-Powered Fraud Detection",
    content: "Stripe has launched an AI-powered fraud detection system that reduces false positives by 60% while maintaining high security standards. This technology protects millions of online transactions worldwide.",
    source: "The Irish Times",
    url: "https://irishtimes.com/stripe-ai-fraud-detection",
    publishedAt: new Date('2025-08-07T14:10:00Z'),
    category: "Fintech",
    region: "Ireland"
  },
  {
    title: "Poland's CD Projekt Red Revolutionizes Gaming with AI",
    content: "CD Projekt Red has integrated AI into its game development pipeline, creating more realistic NPCs and dynamic storytelling. This innovation sets new standards for immersive gaming experiences.",
    source: "Gazeta Wyborcza",
    url: "https://wyborcza.pl/cd-projekt-ai-gaming",
    publishedAt: new Date('2025-08-06T16:30:00Z'),
    category: "Gaming",
    region: "Poland"
  },
  // More diverse sources for better coverage
  {
    title: "Canada's Shopify Integrates AI-Powered E-commerce Solutions",
    content: "Shopify has launched new AI-powered features for online merchants, including automated product recommendations, dynamic pricing, and intelligent inventory management. These tools help businesses increase sales and reduce operational costs.",
    source: "The Globe and Mail",
    url: "https://theglobeandmail.com/shopify-ai-ecommerce",
    publishedAt: new Date('2025-08-16T13:00:00Z'),
    category: "E-commerce",
    region: "Canada"
  },
  {
    title: "Mexico's Grupo Bimbo Uses AI for Sustainable Food Production",
    content: "Grupo Bimbo has implemented AI systems to optimize its food production processes, reducing waste by 30% and improving energy efficiency. The company is now a leader in sustainable food manufacturing in Latin America.",
    source: "El Universal",
    url: "https://eluniversal.com.mx/bimbo-ai-sustainable",
    publishedAt: new Date('2025-08-15T12:30:00Z'),
    category: "Sustainability",
    region: "Mexico"
  },
  {
    title: "South Korea's Samsung Develops Next-Gen AI Chips",
    content: "Samsung has unveiled its latest AI processor, featuring advanced neural processing units and energy-efficient design. The new chip is designed for edge computing applications and mobile AI workloads.",
    source: "The Korea Herald",
    url: "http://www.koreaherald.com/samsung-ai-chips",
    publishedAt: new Date('2025-08-14T10:15:00Z'),
    category: "Hardware",
    region: "South Korea"
  },
  {
    title: "Philippines' Globe Telecom Deploys AI Network Management",
    content: "Globe Telecom has implemented AI-powered network management systems that automatically optimize performance and predict maintenance needs. This technology improves service quality for millions of Filipino users.",
    source: "Philippine Daily Inquirer",
    url: "https://newsinfo.inquirer.net/globe-ai-network",
    publishedAt: new Date('2025-08-13T15:20:00Z'),
    category: "Telecommunications",
    region: "Philippines"
  },
  {
    title: "Singapore's Grab Expands AI-Powered Mobility Platform",
    content: "Grab has enhanced its mobility platform with AI features including predictive demand forecasting, dynamic route optimization, and intelligent driver matching. These improvements reduce wait times and increase efficiency.",
    source: "The Straits Times",
    url: "https://www.straitstimes.com/grab-ai-mobility",
    publishedAt: new Date('2025-08-12T11:45:00Z'),
    category: "Mobility",
    region: "Singapore"
  },
  {
    title: "Indonesia's GoTo Group Launches AI Financial Services",
    content: "GoTo Group has introduced AI-powered financial services including automated lending decisions, fraud detection, and personalized financial advice. This expands financial inclusion across Indonesia's archipelago.",
    source: "The Jakarta Post",
    url: "https://www.thejakartapost.com/goto-ai-financial",
    publishedAt: new Date('2025-08-11T14:30:00Z'),
    category: "Fintech",
    region: "Indonesia"
  },
  {
    title: "Malaysia's Petronas Develops AI Oil Exploration Platform",
    content: "Petronas has developed an AI platform for oil exploration that analyzes geological data to identify promising drilling locations. This technology has increased discovery rates by 25%.",
    source: "Malay Mail",
    url: "https://www.malaymail.com/petronas-ai-exploration",
    publishedAt: new Date('2025-08-10T16:15:00Z'),
    category: "Energy",
    region: "Malaysia"
  },
  {
    title: "Australia's Atlassian Integrates AI into Development Tools",
    content: "Atlassian has enhanced its development tools with AI capabilities including automated code review, intelligent project management, and predictive issue tracking. These features improve developer productivity.",
    source: "ABC News",
    url: "https://www.abc.net.au/news/atlassian-ai-development",
    publishedAt: new Date('2025-08-09T09:30:00Z'),
    category: "Software Development",
    region: "Australia"
  },
  {
    title: "New Zealand's Xero Launches AI-Powered Accounting",
    content: "Xero has introduced AI features to its accounting platform including automated expense categorization, intelligent financial reporting, and predictive cash flow analysis.",
    source: "NZ Herald",
    url: "https://www.nzherald.co.nz/xero-ai-accounting",
    publishedAt: new Date('2025-08-08T13:45:00Z'),
    category: "Fintech",
    region: "New Zealand"
  },
  {
    title: "Argentina's MercadoLibre Expands AI Marketplace Features",
    content: "MercadoLibre has enhanced its marketplace with AI-powered product recommendations, dynamic pricing, and intelligent fraud detection. These features improve the shopping experience for millions of users.",
    source: "Clarín",
    url: "https://www.clarin.com/mercadolibre-ai-marketplace",
    publishedAt: new Date('2025-08-07T12:20:00Z'),
    category: "E-commerce",
    region: "Argentina"
  },
  {
    title: "Chile's Falabella Implements AI Retail Solutions",
    content: "Falabella has deployed AI systems for inventory management, customer behavior analysis, and personalized marketing. These technologies have increased sales by 18% across its retail network.",
    source: "El Mercurio",
    url: "https://www.emol.com/falabella-ai-retail",
    publishedAt: new Date('2025-08-06T15:10:00Z'),
    category: "Retail",
    region: "Chile"
  },
  {
    title: "Colombia's Rappi Enhances Delivery with AI",
    content: "Rappi has integrated AI into its delivery platform for route optimization, demand prediction, and automated customer service. This improves delivery times and customer satisfaction.",
    source: "El Tiempo",
    url: "https://www.eltiempo.com/rappi-ai-delivery",
    publishedAt: new Date('2025-08-05T14:25:00Z'),
    category: "Logistics",
    region: "Colombia"
  },
  {
    title: "South Africa's Naspers Invests in AI Startups",
    content: "Naspers has announced a $500 million investment fund focused on AI startups across Africa. This initiative aims to accelerate AI innovation and digital transformation on the continent.",
    source: "News24",
    url: "https://www.news24.com/naspers-ai-investment",
    publishedAt: new Date('2025-08-04T11:40:00Z'),
    category: "Investment",
    region: "South Africa"
  },
  {
    title: "Kenya's Safaricom Launches AI-Powered M-Pesa",
    content: "Safaricom has enhanced M-Pesa with AI features including fraud detection, credit scoring, and personalized financial services. This expands financial inclusion across East Africa.",
    source: "Daily Nation",
    url: "https://nation.africa/safaricom-ai-mpesa",
    publishedAt: new Date('2025-08-03T16:50:00Z'),
    category: "Fintech",
    region: "Kenya"
  },
  {
    title: "Nigeria's Flutterwave Integrates AI Payment Security",
    content: "Flutterwave has implemented AI-powered security systems for its payment platform, reducing fraud by 40% and improving transaction success rates across Africa.",
    source: "Punch",
    url: "https://punchng.com/flutterwave-ai-security",
    publishedAt: new Date('2025-08-02T13:15:00Z'),
    category: "Cybersecurity",
    region: "Nigeria"
  },
  {
    title: "Egypt's Fawry Expands AI Financial Services",
    content: "Fawry has launched AI-powered financial services including automated investment advice, risk assessment, and personalized banking solutions for Egyptian consumers.",
    source: "Al-Ahram",
    url: "https://english.ahram.org.eg/fawry-ai-financial",
    publishedAt: new Date('2025-08-01T10:30:00Z'),
    category: "Fintech",
    region: "Egypt"
  }
];

export class NewsScraper {
  static async scrapeNews(): Promise<RawArticle[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // In a real implementation, this would:
    // 1. Fetch from multiple international news sources via RSS feeds
    // 2. Use web scraping APIs for real-time content
    // 3. Implement content filtering and categorization
    // 4. Handle multiple languages and regions
    
    // For now, return current international news with some randomization
    return INTERNATIONAL_NEWS_SOURCES.map(article => ({
      ...article,
      publishedAt: new Date(article.publishedAt.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000) // Random time within last 3 days
    }));
  }

  // New method to scrape news from specific sources
  static async scrapeNewsFromSources(sources: NewsSource[]): Promise<RawArticle[]> {
    // Simulate API delay based on number of sources
    const delay = 1000 + (sources.length * 200) + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // In a real implementation, this would:
    // 1. Fetch from the specified news sources
    // 2. Handle different languages and formats
    // 3. Implement source-specific parsing
    // 4. Return articles from selected sources
    
    // For now, filter existing articles based on source names and return more diverse results
    const sourceNames = sources.map(s => s.name);
    const filteredArticles = INTERNATIONAL_NEWS_SOURCES.filter(article => 
      sourceNames.some(sourceName => 
        article.source.toLowerCase().includes(sourceName.toLowerCase()) ||
        sourceName.toLowerCase().includes(article.source.toLowerCase())
      )
    );
    
    // If no exact matches, return a diverse subset of articles
    if (filteredArticles.length === 0) {
      const shuffled = [...INTERNATIONAL_NEWS_SOURCES].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(20, sources.length * 3)).map(article => ({
        ...article,
        publishedAt: new Date(article.publishedAt.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000)
      }));
    }
    
    // Return filtered articles plus some additional diverse content
    const additionalArticles = INTERNATIONAL_NEWS_SOURCES
      .filter(article => !filteredArticles.includes(article))
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    
    const allArticles = [...filteredArticles, ...additionalArticles];
    
    return allArticles.map(article => ({
      ...article,
      publishedAt: new Date(article.publishedAt.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000)
    }));
  }

  // Get news by region
  static async getNewsByRegion(region: string): Promise<RawArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return INTERNATIONAL_NEWS_SOURCES
      .filter(article => article.region === region)
      .map(article => ({
        ...article,
        publishedAt: new Date(article.publishedAt.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000)
      }));
  }

  // Get news by category
  static async getNewsByCategory(category: string): Promise<RawArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return INTERNATIONAL_NEWS_SOURCES
      .filter(article => article.category === category)
      .map(article => ({
        ...article,
        publishedAt: new Date(article.publishedAt.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000)
      }));
  }

  // Get news by country
  static async getNewsByCountry(countryId: string): Promise<RawArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Map country IDs to regions for filtering
    const countryRegionMap: { [key: string]: string } = {
      'us': 'US', 'ca': 'Canada', 'mx': 'Mexico',
      'gb': 'UK', 'de': 'Germany', 'fr': 'France', 'es': 'Spain', 'it': 'Italy', 'nl': 'Netherlands', 'se': 'Sweden', 'no': 'Norway', 'fi': 'Finland', 'ch': 'Switzerland', 'ie': 'Ireland', 'pl': 'Poland',
      'jp': 'Japan', 'kr': 'South Korea', 'in': 'India', 'ph': 'Philippines', 'sg': 'Singapore', 'id': 'Indonesia', 'my': 'Malaysia',
      'au': 'Australia', 'nz': 'New Zealand',
      'br': 'Brazil', 'ar': 'Argentina', 'cl': 'Chile', 'co': 'Colombia',
      'za': 'South Africa', 'ke': 'Kenya', 'ng': 'Nigeria', 'eg': 'Egypt'
    };
    
    const region = countryRegionMap[countryId] || 'Global';
    
    return INTERNATIONAL_NEWS_SOURCES
      .filter(article => article.region === region || article.region === 'Global')
      .map(article => ({
        ...article,
        publishedAt: new Date(article.publishedAt.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000)
      }));
  }
}