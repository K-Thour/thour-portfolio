/**
 * Global test setup file for Vitest.
 * Polyfills browser APIs that jsdom does not implement in Node 22.
 */

// Storage mock inheriting from Storage.prototype so vi.spyOn(Storage.prototype, ...) works
if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
  const localStore = new Map<string, string>();

  Storage.prototype.getItem = function (key: string) {
    return localStore.has(key) ? localStore.get(key)! : null;
  };
  Storage.prototype.setItem = function (key: string, value: string) {
    localStore.set(key, String(value));
  };
  Storage.prototype.removeItem = function (key: string) {
    localStore.delete(key);
  };
  Storage.prototype.clear = function () {
    localStore.clear();
  };
  Storage.prototype.key = function (index: number) {
    return Array.from(localStore.keys())[index] ?? null;
  };
  Object.defineProperty(Storage.prototype, 'length', {
    get() {
      return localStore.size;
    },
    configurable: true,
  });

  const localStorageInstance = Object.create(Storage.prototype);
  const sessionStorageInstance = Object.create(Storage.prototype);

  Object.defineProperty(window, 'localStorage', {
    value: localStorageInstance,
    configurable: true,
    writable: true,
  });

  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageInstance,
    configurable: true,
    writable: true,
  });

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageInstance,
    configurable: true,
    writable: true,
  });

  Object.defineProperty(globalThis, 'sessionStorage', {
    value: sessionStorageInstance,
    configurable: true,
    writable: true,
  });
}

// IntersectionObserver — required by motion/react's useInView and whileInView
class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => [] as IntersectionObserverEntry[]);
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
  });
}

// ResizeObserver — required by some Framer Motion layout animations
class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserverMock,
  });
}

// matchMedia — required by useReducedMotion and media queries
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
