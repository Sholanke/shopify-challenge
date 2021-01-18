import React from "react";
import { useHomeContext } from "../HomeContext/HomeContextProvider";

export default function HomeSearchBar() {
  const { store, dispatchStore } = useHomeContext();

  const handleSearchChange = ({ currentTarget: { value } }) => {
    dispatchStore({ type: "SEARCH", data: value });
  };

  return (
    <div className="home_page__search_bar">
      <input
        placeholder="Search Movie Title"
        onChange={handleSearchChange}
        value={store.searchValue}
      />
      <img src="/assets/icons/search.svg" alt="" srcSet="" />
    </div>
  );
}
