import { logout } from "../src/js/api/auth/logout"; // Import the function to be tested

describe("logout function", () => {
	beforeEach(() => {
		// Mock localStorage methods
		jest.spyOn(Storage.prototype, "removeItem"); // Mock localStorage.removeItem
	});

	it("removes the token and profile from localStorage when logging out", () => {
		// Call the logout function
		logout();

		// Assert that localStorage.removeItem was called with 'token' and 'profile'
		expect(localStorage.removeItem).toHaveBeenCalledWith("token");
		expect(localStorage.removeItem).toHaveBeenCalledWith("profile");
	});
});
