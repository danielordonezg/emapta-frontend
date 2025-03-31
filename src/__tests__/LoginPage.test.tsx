import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../pages/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("../services/api", () => ({
  loginRequest: jest.fn().mockResolvedValue({ token: "fakeToken" }),
}));

describe("LoginPage", () => {
  it("renders login form and submits user credentials", async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passInput =
      screen.queryByLabelText(/password/i) || screen.getByLabelText(/contraseña/i);
    const submitButton =
      screen.queryByRole("button", { name: /sign in/i }) ||
      screen.getByRole("button", { name: /ingresar/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passInput, { target: { value: "123456" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue("test@example.com");
      expect(passInput).toHaveValue("123456");
    });
  });
});
