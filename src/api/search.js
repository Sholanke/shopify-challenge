// search Omdbapi

export default function search(s, p = "1") {
  return new Promise((resolve, reject) => {
    const url = `http://www.omdbapi.com/?apikey=ce28a31a&s=${s}&page=${p}`;
    fetch(url)
      .then((res) => res.json())
      .then(resolve);
  });
}
