import Obj from "@/utilities/Obj";

export const initialState = {
    data: [],
    dataResponse: {},
    loading: false,
    loadingState: "idle",
    pages: 0,
    show: {
        filterModal: null,
        deleteConfirmModal: null,
    },
    filter: {
        asJSON: true,
        page: 1,
        perPage: 10,
        search: "",
        startDate: null,
        endDate: null,
    },
};

const tableSlice = (set, get) => ({
    table: {
        ...initialState,

        set: (newValue) => {
            set((state) => Obj.merge(state, { table: newValue }));
        },

        reset: () => {
            set(initialState);
        },

        setDataResponse: (response) => {
            set((state) =>
                Obj.merge(state, {
                    table: {
                        dataResponse: response,
                        data: response?.data,
                        pages: response?.total
                            ? Math.ceil(
                                  response.total / state?.table?.filter?.perPage
                              )
                            : 0,
                    },
                })
            );
        },

        setLoading: (isLoading) =>
            set((state) =>
                Obj.merge(state, {
                    table: {
                        loading: isLoading,
                        loadingState: isLoading ? "loading" : "idle",
                    },
                })
            ),

        setShow: (newValue) =>
            set((state) =>
                Obj.merge(state, {
                    table: {
                        show: newValue,
                    },
                })
            ),

        setFilter: (newFilter) =>
            set((state) =>
                Obj.merge(state, {
                    table: {
                        filter: newFilter,
                    },
                })
            ),

        setPages: () => {
            const total = get().dataResponse?.total;
            const perPage = get().fiter.perPage;

            set({
                table: {
                    pages: total ? Math.ceil(total / perPage) : 0,
                },
            });
        },
    },
});

export default tableSlice;
