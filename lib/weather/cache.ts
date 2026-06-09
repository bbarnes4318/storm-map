import { WeatherCacheEntry } from "./types";

// In Next.js, hot reloads can reset global state.
// We bind the cache to a global object to persist it.
const globalCache = global as unknown as {
  stormWeatherCache?: Record<string, WeatherCacheEntry<any>>;
};

if (!globalCache.stormWeatherCache) {
  globalCache.stormWeatherCache = {};
}

const getCacheStore = () => {
  if (!globalCache.stormWeatherCache) {
    globalCache.stormWeatherCache = {};
  }
  return globalCache.stormWeatherCache;
};

export const weatherCache = {
  get<T>(key: string, ttlSeconds: number): T | null {
    const store = getCacheStore();
    const entry = store[key];
    if (!entry) return null;

    const now = Date.now();
    const ageSeconds = (now - entry.timestamp) / 1000;

    if (ageSeconds > ttlSeconds) {
      delete store[key];
      return null;
    }

    return entry.data as T;
  },

  set<T>(key: string, data: T): void {
    const store = getCacheStore();
    store[key] = {
      data,
      timestamp: Date.now(),
    };
  },

  clear(key: string): void {
    const store = getCacheStore();
    delete store[key];
  },
};
export default weatherCache;
