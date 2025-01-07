import { create } from "zustand";
import tableSlice from "./slices/table";
import { useSearchParams } from "react-router";

export const initialState = {
    data: {
        activities: [],
    },
    filter: {
        search: "",
        startDate: null,
        endDate: null,
    },
};

const usePageStore = create((set, get) => ({
    ...initialState,
    ...tableSlice(set, get),

    reset: () => {
        set(initialState);
    },

    setFilter: (newFilter) => {
        set({ filter: newFilter });
    },
}));

export default usePageStore;
