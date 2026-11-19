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
  //propiedades
  user: getInitialUser(),
  token: null,

  //metodos
  login: (nuevoUser) => {
    localStorage.setItem('user', JSON.stringify(nuevoUser));
    set({ user: nuevoUser });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null })}

  }));

export default useAuthStore;