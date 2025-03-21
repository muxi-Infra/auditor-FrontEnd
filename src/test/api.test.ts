import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login, getMyInfo, getProjectList } from '../apis';
import { post, getWithAuth } from '../utils/request';
import type { User } from '../types';

// Mock request functions
vi.mock('../utils/request', () => ({
  post: vi.fn(),
  getWithAuth: vi.fn(),
}));

// Mock useUserStore
const mockGetToken = vi.fn();
vi.mock('../stores/user', () => ({
  default: () => ({
    getToken: mockGetToken,
  }),
}));

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should call post with correct parameters and return token', async () => {
      const mockCode = 'test-code';
      const mockToken = 'test-token';

      // Setup mock response
      vi.mocked(post).mockResolvedValue(mockToken);

      // Execute login
      const result = await login(mockCode);

      // Verify post was called with correct parameters
      expect(post).toHaveBeenCalledWith('/api/v1/auth/login', {
        body: {
          code: mockCode,
        },
      });

      // Verify result
      expect(result).toBe(mockToken);
    });
  });

  describe('getMyInfo', () => {
    it('should call getWithAuth with correct parameters', async () => {
      const mockUserInfo: Omit<User, 'token'> = {
        avatar: 'https://example.com/avatar.jpg',
        email: 'test@example.com',
        name: 'Test User',
        role: 1,
      };

      // Setup mock response
      vi.mocked(getWithAuth).mockResolvedValue(mockUserInfo);

      // Execute getMyInfo
      const result = await getMyInfo();

      // Verify getWithAuth was called with correct parameters
      expect(getWithAuth).toHaveBeenCalledWith('/api/v1/user/getMyInfo');

      // Verify result
      expect(result).toEqual(mockUserInfo);
    });
  });

  describe('getProjectList', () => {
    it('should call getWithAuth with correct parameters and return project list', async () => {
      const mockProjects = [
        { project_id: 1, project_name: 'Project 1' },
        { project_id: 2, project_name: 'Project 2' },
      ];

      // Setup mock response
      vi.mocked(getWithAuth).mockResolvedValue(mockProjects);

      // Execute getProjectList
      const result = await getProjectList();

      // Verify getWithAuth was called with correct parameters
      expect(getWithAuth).toHaveBeenCalledWith(
        '/api/v1/project/getProjectList'
      );

      // Verify result
      expect(result).toEqual(mockProjects);
    });
  });
});
