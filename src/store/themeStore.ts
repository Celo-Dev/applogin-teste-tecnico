import { create } from 'zustand';

type ThemeState = {
    theme: 'light' | 'dark';
    changeTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light',
    changeTheme: () =>
        set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
        })),
}));
