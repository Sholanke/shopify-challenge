import React, { useCallback, useEffect } from "react";
import { userIsNearBottom } from "../../../utils/app";
import { useHomeContext } from "../HomeContext/HomeContextProvider";
import HomeMovie, { HomeMovieLoader } from "./HomeMovie";
import debounce from "lodash.debounce";

export default function HomeSearchResults() {
  const {
    store: { searchResults, searchValue, isLoading },
    dispatchStore,
  } = useHomeContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedNearBottom = useCallback(
    debounce((near) => {
      if (near) {
        return dispatchStore({ type: "LOAD_MORE" });
      }
      return;
    }, 700),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      debouncedNearBottom(userIsNearBottom());
    });
  }, [debouncedNearBottom]);

  return (
    <div>
      <p className="col_title">Search Results</p>
      {searchResults?.Search?.map((movie) => (
        <HomeMovie movie={movie} key={movie.imdbID} />
      ))}
      <br />
      {isLoading && searchResults?.Search?.length > 0 && (
        <div className="movies_loader">
          <HomeMovieLoader />
          <HomeMovieLoader />
          <HomeMovieLoader />
        </div>
      )}
      {isLoading && searchResults?.Search?.length < 0 && searchValue && (
        <Error>Loading results, just a sec</Error>
      )}
      {isLoading && !searchResults && searchValue && (
        <Error>Loading results, just a sec</Error>
      )}
      {isLoading && searchResults?.Error && searchValue && (
        <Error>Errr, {searchResults?.Error}</Error>
      )}
      {!searchValue && <Error>Your search Results will appear here.</Error>}
      <br />
    </div>
  );
}

function Error({ children }) {
  return (
    <div className="_nothing">
      <img src="/assets/icons/nothing.svg" alt="" srcset="" />
      <p className="__text">{children}</p>
    </div>
  );
}
