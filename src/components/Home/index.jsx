import React from "react";
import HomeSearchResults from "./HomeSearchResults/HomeSearchResults";
import HomeSearchBar from "./HomeSearchBar/HomeSearchBar";
import HomeContextProvider from "./HomeContext/HomeContextProvider";
import "./index.scss";
import HomeNominations from "./HomeNominations/HomeNominations";

export default function index() {
  return (
    <>
      <HomeContextProvider>
        <div className="home_page">
          <HomeSearchBar />
          <div className="home_page__movie_grid">
            <HomeSearchResults />
            <HomeNominations />
          </div>
        </div>
      </HomeContextProvider>
    </>
  );
}
