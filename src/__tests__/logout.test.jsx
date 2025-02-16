import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/authContext";
import Header from "../components/Header";

// Mock useAuth hook
vi.mock("../context/authContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      authData: { profile: { name: "TestUser" } },
      logout: vi.fn(),
    })),
  };
});

describe("Logout Functionality", () => {
  it("logs out successfully when clicking the logout button", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(useAuth().logout).toHaveBeenCalled();
  });
});
