'use client';

import { create } from 'zustand';
import type { CurrentWeatherResponse, ForecastResponse, Location } from '@/types/weather';

interface WeatherState {
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastResponse | null;
  favorites: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;
  setCurrentWeather: (weather: CurrentWeatherResponse | null) => void;
  setForecast: (forecast: ForecastResponse | null) => void;
  setSelectedLocation: (location: Location | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  currentWeather: null,
  forecast: null,
  favorites: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setForecast: (forecast) => set({ forecast }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addFavorite: (location) =>
    set((state) => ({
      favorites: [...state.favorites, location],
    })),
  removeFavorite: (name) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.name !== name),
    })),
  isFavorite: (name) => {
    const state = get();
    return state.favorites.some((fav) => fav.name === name);
  },
}));
