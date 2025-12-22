import { mockAdapter } from '@/lib/mock-adapter';
import { User } from '@/types';

export const authService = {
  async login(username: string, password: string): Promise<User | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = await mockAdapter.get('users');
    const user = users.find(u => u.username === username);

    // Simple password check (in real app, compare hashes)
    // For this prototype, password is same as username as per instructions
    if (user && password === username) {
      return user;
    }
    return null;
  },

  async logout(): Promise<void> {
    return;
  }
};
