import { apiPath } from "../src/js/api/constants.js";
import { headers } from "../src/js/api/headers.js";
import { login } from '../src/js/api/auth/login';
import { save, load } from '../src/js/storage/index.js';

global.fetch = jest.fn();
jest.mock('../src/js/storage/index.js', () => ({
  save: jest.fn(),
  load: jest.fn(() => 'mockedToken'), // Mock load function to return a token
}));

describe('login function', () => {
  beforeEach(() => {
    fetch.mockClear();
    save.mockClear();
    load.mockClear();
  });

  it('stores a token when provided with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockToken = 'mockedAccessToken';

    // Mock the API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: mockToken, username: 'testUser' }),
    });

    const result = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: headers('application/json'),
    });

    expect(save).toHaveBeenCalledWith('token', mockToken);
    expect(save).toHaveBeenCalledWith('profile', { username: 'testUser' });
    expect(result).toEqual({ username: 'testUser' });
  });

  it('throws an error when the login fails', async () => {
    const email = 'test@example.com';
    const password = 'wrongPassword';

    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    });

    await expect(login(email, password)).rejects.toThrow('Unauthorized');

    expect(save).not.toHaveBeenCalled();
  });
});
