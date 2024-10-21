import { login } from "../src/js/api/auth/login";

global.fetch = jest.fn(); // Mock the fetch API

describe("login function", () => {
	beforeEach(() => {
		fetch.mockClear();

		// Mock localStorage
		jest.spyOn(Storage.prototype, "setItem");
		jest.spyOn(Storage.prototype, "getItem").mockReturnValue("mockedToken");
	});

	it("stores a token in localStorage when provided with valid credentials", async () => {
		const email = "test@example.com";
		const password = "password123";
		const mockToken = "mockedAccessToken";

		// Mock the API response
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ accessToken: mockToken }),
		});

		// Call the login function with valid credentials
		await login(email, password);

		// Assert that localStorage.setItem was called to store the token
		expect(localStorage.setItem).toHaveBeenCalledWith(
			"token",
			JSON.stringify(mockToken),
		);
	});
});
