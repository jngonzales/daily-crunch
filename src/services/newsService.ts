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

  // Get all saved articles for a user (simplified query to avoid index requirement)
  static async getSavedArticles(userId: string): Promise<SavedArticle[]> {
    try {
      // Use a simple query without orderBy to avoid index requirement
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const articles = querySnapshot.docs.map(doc => ({
        ...doc.data() as SavedArticle,
        id: doc.id,
        savedAt: doc.data().savedAt.toDate(),
      }));
      
      // Sort in memory instead of in the database
      return articles.sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
    } catch (error: any) {
      console.error('Failed to get saved articles:', error);
      
      // Handle Firebase index error specifically
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.warn('Firebase index not created yet. This is normal for new installations.');
        console.warn('Saved articles will work once the database is fully set up.');
        // Return empty array instead of throwing error
        return [];
      }
      
      throw new Error('Failed to get saved articles');
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

  // Check if an article is saved (simplified to avoid index requirement)
  static async isArticleSaved(articleUrl: string, userId: string): Promise<boolean> {
    try {
      // Get all saved articles for the user and check in memory
      const savedArticles = await this.getSavedArticles(userId);
      return savedArticles.some(article => article.url === articleUrl);
    } catch (error: any) {
      console.error('Failed to check if article is saved:', error);
      return false;
    }
  }
}