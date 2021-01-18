export default function homeContextReducer(state, action) {
  switch (action.type) {
    case "SEARCH":
      return { ...state, searchPage: 1, searchValue: action.data };
    case "LOAD_MORE": {
      const searchResultsLength = state.searchResults?.Search?.length;
      const totalResultsCount = state.searchResults?.totalResults;
      if (searchResultsLength < totalResultsCount)
        return {
          ...state,
          searchPage: state.searchPage + 1,
          isLoading: true,
        };
      return {
        ...state,
        isLoading: false,
      };
    }
    case "SEARCH_RESULTS": {
      if (action.appendToExisiting) {
        const { searchResults } = state;
        return {
          ...state,
          searchResults: {
            ...searchResults,
            Search: [...searchResults.Search, ...(action.data.Search || [])],
          },
        };
      }
      return {
        ...state,
        searchResults: action.data,
      };
    }
    case "NOMINATE":
      return {
        ...state,
        nominatedMovies: [...state.nominatedMovies, action.data],
      };
    case "UN_NOMINATE":
      return {
        ...state,
        nominatedMovies: [
          ...state.nominatedMovies?.filter(
            (movie) => movie.imdbID !== action.data.imdbID
          ),
        ],
      };
    default: {
      return state;
    }
  }
}
