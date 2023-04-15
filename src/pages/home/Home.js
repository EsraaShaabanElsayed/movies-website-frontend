import React, { useState, useEffect } from "react";
import MoviesCard from "../../components/MoviesCard";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [movies, setMovies] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setMovies({ ...movies, loading: true });
    axios
      .get("http://localhost:4000/movies", {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        console.log(resp);
        setMovies({ ...movies, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setMovies({
          ...movies,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [movies.reload]);

  const searchMovies = (e) => {
    e.preventDefault();
    setMovies({ ...movies, reload: movies.reload + 1 });
  };

  return (
    <div className="home-container p-5">
      {/* Loader  */}
      {movies.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST MOVIES  */}
      {movies.loading === false && movies.err == null && (
        <>
          {/* Filter  */}
          <Form onSubmit={searchMovies}>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                type="text"
                placeholder="Search Movies"
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark rounded-0">Search</button>
            </Form.Group>
          </Form>

          {/* LIST MOVIES  */}
          <div className="row ">
            {movies.results.map((movie) => (
              <div className="col-3 card-movie-container" key={movie.id}>
                <MoviesCard
                  name={movie.name}
                  description={movie.description}
                  image={movie.image_url}
                  id={movie.id}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ERRORS HANDLING  */}
      {movies.loading === false && movies.err != null && (
        <Alert variant="danger" className="p-2">
          {movies.err}
        </Alert>
      )}

      {movies.loading === false &&
        movies.err == null &&
        movies.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No Movies, please try again later !
          </Alert>
        )}
    </div>
  );
};

export default Home;
