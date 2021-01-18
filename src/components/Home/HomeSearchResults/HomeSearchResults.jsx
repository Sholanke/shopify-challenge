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
      <p className="col_title">
        Search Results{" "}
        {searchResults?.totalResults ? (
          <span>{`${searchResults.totalResults} Results Found`}</span>
        ) : (
          false
        )}
      </p>
      {searchResults?.Search?.map((movie) => (
        <HomeMovie movie={movie} key={movie.imdbID} />
      ))}
      {isLoading && searchResults?.Search?.length > 0 && (
        <div className="movies_loader">
          <HomeMovieLoader />
          <HomeMovieLoader />
          <HomeMovieLoader />
        </div>
      )}
      {isLoading && searchResults?.Search?.length < 0 && searchValue && (
        <ErrorState>Loading results, just a sec</ErrorState>
      )}
      {isLoading && !searchResults && searchValue && (
        <ErrorState>Loading results, just a sec</ErrorState>
      )}
      {isLoading && searchResults?.Error && searchValue && (
        <ErrorState>Errr, {searchResults?.Error}</ErrorState>
      )}
      {!searchValue && (
        <ErrorState>Your search Results will appear here.</ErrorState>
      )}
    </div>
  );
}

export function ErrorState({ children, src = "/assets/icons/nothing.svg" }) {
  return (
    <div className="_nothing">
      <img src={src} alt="" srcSet="" />
      <p className="__text">{children}</p>
    </div>
  );
}
