import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <>
      <Main />
      <Row rowID="1" title="Up Coming" FetchUrl={requests.requestUpcoming} />
      <Row rowID="2" title="Popular" FetchUrl={requests.requestPopular} />
      <Row rowID="3" title="Trending" FetchUrl={requests.requestTrending} />
      <Row rowID="4" title="Top Rated" FetchUrl={requests.requestTopRated} />
      <Row rowID="5" title="Horror" FetchUrl={requests.requestHorror} />
    </>
  );
};

export default Home;
