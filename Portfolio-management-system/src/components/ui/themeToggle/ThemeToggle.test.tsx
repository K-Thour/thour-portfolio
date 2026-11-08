import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { ThemeProvider } from "../../../context/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle Component", () => {
  const originalAnimate = document.documentElement.animate;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    vi.clearAllMocks();

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    delete (document as any).startViewTransition;
    document.documentElement.animate = originalAnimate;
    vi.restoreAllMocks();
  });

  const renderWithProviders = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </Provider>,
    );
  };

  it("renders with proper accessibility attributes and default dark theme shield icon", () => {
    renderWithProviders();
    const button = screen.getByRole("button", { name: /toggle visual theme/i });
    expect(button).toBeDefined();
    expect(button.getAttribute("aria-pressed")).toBe("false");
  });

  it("toggles theme when clicked (fallback without ViewTransition)", async () => {
    delete (document as any).startViewTransition;
    renderWithProviders();
    const button = screen.getByRole("button", { name: /toggle visual theme/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("triggers startViewTransition when available in document", async () => {
    const mockAnimate = vi.fn().mockReturnValue({ finished: Promise.resolve() });
    document.documentElement.animate = mockAnimate;

    const mockStartViewTransition = vi.fn().mockImplementation((cb: () => void) => {
      cb();
      return { ready: Promise.resolve() };
    });
    (document as any).startViewTransition = mockStartViewTransition;

    renderWithProviders();
    const button = screen.getByRole("button", { name: /toggle visual theme/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockStartViewTransition).toHaveBeenCalled();
  });
});
