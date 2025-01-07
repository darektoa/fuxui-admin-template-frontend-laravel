import { create } from "zustand";

const initialState = {
    dataResponse: {},
    loading: false,
    loadingState: "idle",
    data: {
        faces: [],
    },
    filter: {
        email: "",
    },
};

const usePageStore = create((set, get) => ({
    ...initialState,

    reset: () => {
        set(initialState);
    },

    setFaces: (newFaces) => {
        set({ data: { faces: newFaces } });
    },

    setFilter: (newFilter) => {
        set({ filter: newFilter });
    },

    setLoading: (isLoading) => {
        set({
            loading: isLoading,
            loadingState: isLoading ? "loading" : "idle",
        });
    },
}));

export default usePageStore;
