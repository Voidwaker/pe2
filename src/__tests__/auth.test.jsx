import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import Login from "../components/Login";

// Mock API response for login
global.fetch = vi.fn((url, options) => {
  if (options.method === "POST") {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: { token: "fake-token", profile: { name: "TestUser" } } }),
    });
  }
  return Promise.reject(new Error("Unexpected request"));
});

describe("Login Component", () => {
  it("renders login form", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("logs in successfully", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "testo4@noroff.no" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "Sommer12" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: "POST",
    }));
  });
});
