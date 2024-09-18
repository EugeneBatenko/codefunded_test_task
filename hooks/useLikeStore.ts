import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useLikeStore = create(
    persist(
        (set) => ({
            likes: {},
            likeItem: (itemId: string, user: string) =>
                set((state: any) => ({
                    likes: { ...state.likes, [itemId]: user }
                })),
            unlikeItem: (itemId: string) =>
                set((state: any) => {
                    const newLikes = { ...state.likes };
                    delete newLikes[itemId];
                    return { likes: newLikes };
                }),
        }),
        {
            name: 'likes-storage',
            getStorage: () => localStorage,
        }
    )
);
