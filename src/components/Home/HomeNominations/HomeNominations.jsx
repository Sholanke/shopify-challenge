import React, { createRef, useEffect } from "react";
import { useHomeContext } from "../HomeContext/HomeContextProvider";
import HomeMovie from "../HomeSearchResults/HomeMovie";
// import dragula from "react-dragula";

export default function HomeNominations() {
  const {
    store: { nominatedMovies },
  } = useHomeContext();

  const nominationsRef = createRef();

  // useEffect(() => {
    // dragula([nominationsRef.current]);
  // }, [nominationsRef]);

  return (
    <div className="_nom_col">
      <p className="col_title">You Nominated</p>
      <div ref={nominationsRef}>
        {nominatedMovies.map((movie) => (
          <HomeMovie movie={movie} nomination />
        ))}
      </div>
    </div>
  );
}
