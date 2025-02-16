import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import Login from "../components/Login";

// Mock API response for login
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "fake-token", profile: { name: "TestUser" } }),
  })
);

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

    expect(await screen.findByRole("alert")).toHaveTextContent(/failed to login/i);
  });
});

