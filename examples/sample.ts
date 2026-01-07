import { ref, computed, onMounted } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

class UserService {
  private users: User[] = [];

  async fetchUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    this.users = await response.json();
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }
}

// Usage
const service = new UserService();
const users = await service.fetchUsers();
console.log(`Found ${users.length} users`);