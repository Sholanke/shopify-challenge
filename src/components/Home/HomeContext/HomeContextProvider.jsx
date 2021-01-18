/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import search from "../../../api/search";
import homeContextReducer from "./HomeContextReducers";
import debounce from "lodash.debounce";

const DEBOUNCE_WAIT_TIME = 700;
const HomeContext = createContext();
const initialState = {
  searchValue: "spider man",
  nominatedMovies: [],
  searchPage: 1,
  isLoading: true,
};

export default function HomeContextProvider({ children }) {
  const [store, dispatchStore] = useReducer(homeContextReducer, initialState);
  const debouncedSearchMovies = useCallback(
    debounce((value, page) => {
      return search(value, page).then((res) => {
        dispatchStore({
          type: "SEARCH_RESULTS",
          data: res,
          appendToExisiting: page > 1,
        });
      });
    }, DEBOUNCE_WAIT_TIME),
    []
  );

  useEffect(() => {
    store.searchValue
      ? debouncedSearchMovies(store.searchValue, store.searchPage)
      : dispatchStore({ type: "SEARCH_RESULTS", data: null });
  }, [store.searchValue, debouncedSearchMovies, store.searchPage]);

  return (
    <HomeContext.Provider value={{ store, dispatchStore }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  return useContext(HomeContext);
}
