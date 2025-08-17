// Mock news scraper - In a real implementation, this would use a backend service
// For now, we'll simulate scraping with sample data

export interface RawArticle {
  title: string;
  content: string;
  source: string;
  url: string;
  publishedAt: Date;
  category?: string;
}

const SAMPLE_ARTICLES: RawArticle[] = [
  {
    title: "OpenAI Releases GPT-5 with Revolutionary Reasoning Capabilities",
    content: "OpenAI has announced the release of GPT-5, marking a significant leap in artificial intelligence capabilities. The new model demonstrates unprecedented reasoning abilities, showing remarkable improvements in logical deduction, mathematical problem-solving, and complex analysis. Unlike its predecessors, GPT-5 can maintain context across much longer conversations and exhibits what researchers are calling 'true understanding' rather than pattern matching. The model has been trained on a diverse dataset and shows particular strength in scientific reasoning, code generation, and creative problem-solving. Early testing reveals that GPT-5 can solve complex multi-step problems that previously required human intervention, making it a game-changer for industries ranging from software development to scientific research.",
    source: "TechCrunch",
    url: "https://techcrunch.com/gpt5-release",
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    category: "AI"
  },
  {
    title: "Apple Vision Pro 2 Rumors: Lighter Design and Higher Resolution Displays",
    content: "Industry insiders are reporting exciting developments regarding Apple's next-generation Vision Pro headset. Sources familiar with the matter suggest that Apple is working on a significantly lighter design that addresses one of the main criticisms of the original Vision Pro. The new model is expected to feature micro-OLED displays with even higher pixel density, potentially reaching 4K per eye. Additionally, Apple is reportedly developing new gesture recognition technology that would eliminate the need for hand controllers entirely. The company is also said to be working on improving battery life and reducing the external battery pack size. These improvements could make the Vision Pro 2 more appealing to mainstream consumers and potentially accelerate adoption of spatial computing technology.",
    source: "The Verge",
    url: "https://theverge.com/vision-pro-2-rumors",
    publishedAt: new Date('2024-01-14T14:30:00Z'),
    category: "Hardware"
  },
  {
    title: "Quantum Computing Breakthrough: IBM Achieves 1000-Qubit Processor",
    content: "IBM has reached a major milestone in quantum computing with the successful development of a 1000-qubit quantum processor, codenamed 'Condor Plus'. This achievement represents a significant step toward practical quantum computing applications that could revolutionize fields such as drug discovery, financial modeling, and cryptography. The new processor features improved error correction and quantum coherence, addressing two of the most significant challenges in quantum computing. IBM researchers report that the system can maintain quantum states for significantly longer periods, enabling more complex calculations. The company plans to make this technology available through its quantum cloud services, allowing researchers worldwide to experiment with quantum algorithms at unprecedented scale.",
    source: "Wired",
    url: "https://wired.com/ibm-1000-qubit",
    publishedAt: new Date('2024-01-13T09:15:00Z'),
    category: "Hardware"
  },
  {
    title: "Tesla's Full Self-Driving Beta Achieves Human-Level Performance",
    content: "Tesla has announced that its Full Self-Driving (FSD) beta has achieved human-level performance in standardized driving tests, marking a crucial milestone in autonomous vehicle development. The latest version of FSD utilizes Tesla's custom AI chips and neural networks trained on billions of miles of real-world driving data. Independent testing shows that the system now handles complex scenarios like construction zones, emergency vehicles, and adverse weather conditions with remarkable accuracy. Tesla CEO Elon Musk stated that the company is preparing for wide release of the technology, pending regulatory approval. This development could accelerate the adoption of autonomous vehicles and transform the transportation industry, though safety regulators continue to scrutinize the technology carefully.",
    source: "TechCrunch",
    url: "https://techcrunch.com/tesla-fsd-milestone",
    publishedAt: new Date('2024-01-12T16:45:00Z'),
    category: "AI"
  }
];

export class NewsScraper {
  static async scrapeNews(): Promise<RawArticle[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // In a real implementation, this would:
    // 1. Fetch from multiple news sources (TechCrunch, The Verge, Wired, etc.)
    // 2. Extract title and content using web scraping
    // 3. Clean and normalize the data
    
    return SAMPLE_ARTICLES.map(article => ({
      ...article,
      publishedAt: new Date(article.publishedAt.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time within last week
    }));
  }
}