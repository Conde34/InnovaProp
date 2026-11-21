import { create } from 'zustand';

const getInitialToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

const getInitialUser = () => {
  if (typeof window === 'undefined' || !localStorage.getItem('token')) return null;

  const storedUser = localStorage.getItem('user');

  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  //propiedades
  user: getInitialUser(),
  token: getInitialToken(),

  //metodos
  login: (nuevoUser, token) => {
    localStorage.setItem('user', JSON.stringify(nuevoUser));
    localStorage.setItem('token', token);
    set({ user: nuevoUser, token });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }

}));

export default useAuthStore;