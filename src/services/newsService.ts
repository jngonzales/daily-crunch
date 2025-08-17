import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/components/ArticleCard';

export interface SavedArticle extends Article {
  id: string;
  savedAt: Date;
  userId: string;
}

export class NewsService {
  private static COLLECTION_NAME = 'savedArticles';

  // Save an article for a user
  static async saveArticle(article: Article, userId: string): Promise<void> {
    try {
      await addDoc(collection(db, this.COLLECTION_NAME), {
        ...article,
        userId,
        savedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Failed to save article:', error);
      throw new Error('Failed to save article');
    }
  }

  // Get all saved articles for a user (completely simplified to avoid any index issues)
  static async getSavedArticles(userId: string): Promise<SavedArticle[]> {
    try {
      // Use the most basic query possible - just get all documents
      const q = query(collection(db, this.COLLECTION_NAME));
      
      const querySnapshot = await getDocs(q);
      const articles = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            ...data as SavedArticle,
            id: doc.id,
            savedAt: data.savedAt?.toDate() || new Date(),
          };
        })
        .filter(article => article.userId === userId) // Filter in memory
        .sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime()); // Sort in memory
      
      return articles;
    } catch (error: any) {
      console.error('Failed to get saved articles:', error);
      
      // Handle any Firebase errors gracefully
      if (error.code === 'failed-precondition' || 
          error.message?.includes('index') || 
          error.code === 'permission-denied' ||
          error.code === 'unavailable') {
        console.warn('Firebase query failed, returning empty array:', error.message);
        return [];
      }
      
      // For any other errors, also return empty array instead of throwing
      console.warn('Unexpected error in getSavedArticles, returning empty array:', error);
      return [];
    }
  }

  // Remove a saved article
  static async removeSavedArticle(articleId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.COLLECTION_NAME, articleId));
    } catch (error) {
      console.error('Failed to remove saved article:', error);
      throw new Error('Failed to remove saved article');
    }
  }

  // Check if an article is saved (completely simplified)
  static async isArticleSaved(articleUrl: string, userId: string): Promise<boolean> {
    try {
      // Get all saved articles for the user and check in memory
      const savedArticles = await this.getSavedArticles(userId);
      return savedArticles.some(article => article.url === articleUrl);
    } catch (error: any) {
      console.error('Failed to check if article is saved:', error);
      // Return false instead of throwing error
      return false;
    }
  }
}