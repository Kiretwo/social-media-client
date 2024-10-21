import { logout } from "../src/js/api/auth/logout";

describe("logout function", () => {
	beforeEach(() => {
		// Mock localStorage
		jest.spyOn(Storage.prototype, "removeItem");
	});

	it("removes the token and profile from localStorage when logging out", () => {
		logout();

		expect(localStorage.removeItem).toHaveBeenCalledWith("token");
		expect(localStorage.removeItem).toHaveBeenCalledWith("profile");
	});
});
