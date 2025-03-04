import { ref, set, get } from 'firebase/database';
import { db } from './config';
import initialData from '../data/data.json';

export const initializeDatabase = async () => {
  try {
    const portfolioRef = ref(db, 'portfolio');
    const snapshot = await get(portfolioRef);

    // Only initialize if data doesn't exist
    if (!snapshot.exists()) {
      await set(portfolioRef, initialData);
      console.log('Database initialized with initial data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
