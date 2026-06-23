import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ForgotPasswordFlow } from "./ForgotPasswordFlow";
import { forgotPassword } from "../../../../services/api";

// Mock API calls
vi.mock("../../../../services/api", () => ({
  forgotPassword: vi.fn(),
  verifyOtp: vi.fn(),
  resetPassword: vi.fn(),
}));

// Mock useToast hook
const mockToast = vi.fn();
vi.mock("../../../../hooks/useToast", () => ({
  useToast: () => ({
    toast: mockToast,
    toasts: [],
  }),
}));

describe("ForgotPasswordFlow toast unification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should trigger custom toast on email submission success", async () => {
    vi.mocked(forgotPassword).mockResolvedValueOnce({} as any);

    render(<ForgotPasswordFlow theme="light" onBackToLogin={() => {}} />);

    // Enter email and submit
    const emailInput = screen.getByPlaceholderText("admin@portfolio.com");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    
    const submitBtn = screen.getByRole("button", { name: /Send OTP/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(forgotPassword).toHaveBeenCalledWith({ email: "test@example.com" });
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "OTP Sent",
      description: "OTP sent to your email successfully.",
      variant: "success",
    });
  });

  it("should trigger custom destructive toast on email submission error", async () => {
    const errorResponse = {
      response: {
        data: {
          message: "User not found.",
        },
      },
    };
    vi.mocked(forgotPassword).mockRejectedValueOnce(errorResponse);

    render(<ForgotPasswordFlow theme="light" onBackToLogin={() => {}} />);

    const emailInput = screen.getByPlaceholderText("admin@portfolio.com");
    fireEvent.change(emailInput, { target: { value: "notfound@example.com" } });
    
    const submitBtn = screen.getByRole("button", { name: /Send OTP/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(forgotPassword).toHaveBeenCalledWith({ email: "notfound@example.com" });
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "Error",
      description: "User not found.",
      variant: "destructive",
    });
  });
});
