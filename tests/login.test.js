import { login } from "../src/js/api/auth/login"; // Import the function to be tested

global.fetch = jest.fn(); // Mock the fetch API

describe("login function", () => {
	beforeEach(() => {
		fetch.mockClear();

		// Mock localStorage methods
		jest.spyOn(Storage.prototype, "setItem"); // Mock localStorage.setItem
		jest.spyOn(Storage.prototype, "getItem").mockReturnValue("mockedToken"); // Mock localStorage.getItem to return a token
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
		); // Expect the value to be JSON serialized
	});
});
