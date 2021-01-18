import React from "react";
import { useHomeContext } from "../HomeContext/HomeContextProvider";

export default function HomeMovie({ movie, nomination = false }) {
  const { dispatchStore, store } = useHomeContext();

  const nominate = () => {
    store.nominatedMovies?.length < 5
      ? dispatchStore({ type: "NOMINATE", data: movie })
      : alert("You can't make more than 5 nominations.");
  };
  const unNominate = () => {
    dispatchStore({ type: "UN_NOMINATE", data: movie });
  };
  const nominationDisabled = () => {
    return store.nominatedMovies?.find(
      (_nMovie) => _nMovie.imdbID === movie.imdbID
    );
  };
  return (
    <>
      <div className="home_page__movie">
        <div
          className="_poster_holder"
          style={{ backgroundImage: `url(${movie.Poster})` }}
        ></div>
        <div className="__text_holder">
          <p className="_title">{movie.Title}</p>
          <div className="_flex __btn_holder">
            <span className="_y">{movie.Year}</span>

            {nomination ? (
              <button
                className="_btn red"
                onClick={() => {
                  unNominate();
                }}
              >
                Remove
              </button>
            ) : (
              <button
                className="_btn"
                disabled={nominationDisabled()}
                onClick={() => {
                  nominate();
                }}
              >
                Nominate
                <img src="/assets/icons/star.svg" alt="" srcSet="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function HomeMovieLoader() {
  return (
    <div className="home_page__movie loader">
      <div className="_poster_holder"></div>
      <div className="__text_holder">
        <p className="_title">title of lif</p>
        <div className="_flex __btn_holder">
          <span className="_y">1911</span>

          <button className="_btn">
            Nominate
            <img src="/assets/icons/star.svg" alt="" srcSet="" />
          </button>
        </div>
      </div>
    </div>
  );
}
