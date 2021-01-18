import React, { createRef } from "react";
import { useHomeContext } from "../HomeContext/HomeContextProvider";
import HomeMovie from "../HomeSearchResults/HomeMovie";
import { ErrorState } from "../HomeSearchResults/HomeSearchResults";

export default function HomeNominations() {
  const {
    store: { nominatedMovies },
  } = useHomeContext();

  const nominationsRef = createRef();

  return (
    <div className="_nom_col">
      <p className="col_title">
        You Nominated
        {nominatedMovies ? (
          <span>{`${nominatedMovies.length} Movies Nominated`}</span>
        ) : (
          false
        )}
      </p>
      <div ref={nominationsRef}>
        {nominatedMovies.length === 5 && (
          <p className="warn_tag">You have made 5 Nominations.</p>
        )}
        {nominatedMovies.map((movie) => (
          <HomeMovie movie={movie} nomination />
        ))}
        {nominatedMovies?.length <= 0 && (
          <ErrorState src="/assets/icons/nothing-nomination.svg">
            Your Nominations will Appear here.
          </ErrorState>
        )}
      </div>
    </div>
  );
}
