import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import Header from "../components/Header";

describe("Logout Functionality", () => {
  it("logs out successfully when clicking the logout button", async () => {
    localStorage.setItem("Token", "fake-token");
    localStorage.setItem("Profile", JSON.stringify({ name: "TestUser" }));

    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(localStorage.getItem("Token")).toBeNull();
    expect(localStorage.getItem("Profile")).toBeNull();

    expect(await screen.findByText(/login/i)).toBeInTheDocument();
  });
});
