import { create } from 'zustand';

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

type UIStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  isAddProductModalOpen: boolean;
  setAddProductModalOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  isAddProductModalOpen: false,
  setAddProductModalOpen: (isOpen) => set({ isAddProductModalOpen: isOpen }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));