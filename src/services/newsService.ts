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

  // Get all saved articles for a user
  static async getSavedArticles(userId: string): Promise<SavedArticle[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('savedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data() as SavedArticle,
        id: doc.id,
        savedAt: doc.data().savedAt.toDate(),
      }));
    } catch (error: any) {
      console.error('Failed to get saved articles:', error);
      
      // Handle Firebase index error specifically
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.warn('Firebase index not created yet. Please create the required index.');
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

  // Check if an article is saved
  static async isArticleSaved(articleUrl: string, userId: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        where('url', '==', articleUrl)
      );
      
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error: any) {
      console.error('Failed to check if article is saved:', error);
      
      // Handle Firebase index error specifically
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.warn('Firebase index not created yet. Please create the required index.');
        return false;
      }
      
      return false;
    }
  }
}