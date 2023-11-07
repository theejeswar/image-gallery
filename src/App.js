import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import Gallery from "./Gallery";

export default function App() {
  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data.photos.photo);
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  };
  return (
    <div className="App">
      <h1>Gallery Snapshot</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <br />
        <br />
        <input type="submit" name="Search" />
      </form>
      <br />
      {data.length >= 1 ? <Gallery data={data} /> : <h4>No data loaded</h4>}
    </div>
  );
}
