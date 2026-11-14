import { create } from 'zustand';

const getInitialUser = () => {
  if (typeof window === 'undefined') return null;

  const storedUser = localStorage.getItem('user');

  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getInitialUser(),
  token: null,
  login: (nuevoUser) => {
    localStorage.setItem('user', JSON.stringify(nuevoUser));
    set({ user: nuevoUser });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useAuthStore;