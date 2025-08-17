import { pipeline } from '@huggingface/transformers';

// Define a type for the summarizer pipeline
type SummarizerPipeline = (text: string, options?: { max_length?: number; min_length?: number }) => Promise<Array<{ summary_text: string }> | { summary_text: string }>;

export class NLPSummarizer {
  private static summarizer: SummarizerPipeline | null = null;
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Initialization timeout')), 15000); // 15 second timeout
    });

    try {
      // Try to initialize with timeout
      await Promise.race([
        (async () => {
          try {
            // Initialize the summarization pipeline
            this.summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6', {
              device: 'webgpu' // Use WebGPU for better performance
            });
            this.isInitialized = true;
            console.log('NLP Summarizer initialized successfully with WebGPU');
          } catch (error) {
            console.warn('WebGPU not available, falling back to CPU');
            this.summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
            this.isInitialized = true;
            console.log('NLP Summarizer initialized with CPU');
          }
        })(),
        timeoutPromise
      ]);
    } catch (error) {
      console.warn('AI model initialization failed or timed out, using fallback mode:', error);
      // Set flag to use fallback method
      this.isInitialized = false;
    }
  }

  static async summarizeToPoints(content: string): Promise<string[]> {
    if (!this.isInitialized || !this.summarizer) {
      // Fallback to simple text processing if ML model fails
      return this.extractKeyPointsFallback(content);
    }

    try {
      // Split content into chunks if it's too long
      const chunks = this.splitIntoChunks(content, 500);
      const summaries: string[] = [];

      for (const chunk of chunks.slice(0, 2)) { // Limit to first 2 chunks for performance
        try {
          const result = await this.summarizer(chunk, {
            max_length: 100,
            min_length: 30
          });

          if (Array.isArray(result) && result[0] && 'summary_text' in result[0]) {
            summaries.push(result[0].summary_text);
          } else if (result && 'summary_text' in result) {
            summaries.push(result.summary_text);
          }
        } catch (chunkError) {
          console.warn('Failed to process chunk, skipping:', chunkError);
        }
      }

      // If we got summaries, convert them to bullet points
      if (summaries.length > 0) {
        return this.convertToBulletPoints(summaries.join(' '));
      }
      
      // Fallback if no summaries were generated
      return this.extractKeyPointsFallback(content);
    } catch (error) {
      console.error('Summarization failed, using fallback:', error);
      return this.extractKeyPointsFallback(content);
    }
  }

  private static splitIntoChunks(text: string, maxLength: number): string[] {
    const words = text.split(' ');
    const chunks: string[] = [];
    let currentChunk: string[] = [];

    for (const word of words) {
      if (currentChunk.join(' ').length + word.length > maxLength && currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [word];
      } else {
        currentChunk.push(word);
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
    }

    return chunks;
  }

  private static convertToBulletPoints(summary: string): string[] {
    // Split the summary into sentences and clean them up
    const sentences = summary
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 10)
      .slice(0, 5); // Limit to 5 points

    return sentences.map(sentence => {
      // Clean up and format as bullet point
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });
  }

  private static extractKeyPointsFallback(content: string): string[] {
    // Simple fallback method using keyword extraction and sentence ranking
    const sentences = content
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20);

    // Score sentences based on keyword frequency and position
    const keyWords = this.extractKeywords(content);
    const scoredSentences = sentences.map(sentence => {
      let score = 0;
      const words = sentence.toLowerCase().split(/\s+/);
      
      // Score based on keyword presence
      keyWords.forEach(keyword => {
        if (words.includes(keyword.toLowerCase())) {
          score += 2;
        }
      });

      // Boost score for sentences at the beginning
      const position = sentences.indexOf(sentence);
      if (position < 3) score += 1;

      return { sentence, score };
    });

    // Return top 3-5 sentences as bullet points
    return scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(5, Math.max(3, Math.floor(sentences.length / 3))))
      .map(item => item.sentence)
      .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1));
  }

  private static extractKeywords(text: string): string[] {
    // Simple keyword extraction
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 4);

    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }
}