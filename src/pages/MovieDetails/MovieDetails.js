import React, { useState, useEffect } from "react";
import "../../css/MovieDetails.css";
import ReviewMovie from "../../components/ReviewMovie";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import Form from "react-bootstrap/Form";

const MovieDetails = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [movie, setMovie] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });

  const [review, setReview] = useState({
    review: "",
    loading: false,
    err: null,
  });

  useEffect(() => {
    setMovie({ ...movie, loading: true });
    axios
      .get("http://localhost:4000/movies/" + id)
      .then((resp) => {
        setMovie({ ...movie, result: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setMovie({
          ...movie,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [movie.reload]);

  const sendReview = (e) => {
    e.preventDefault();
    setReview({ ...review, loading: true });
    axios
      .post(
        "http://localhost:4000/movies/review",
        {
          movie_id: id,
          review: review.review,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((resp) => {
        setReview({ err: null, review: "", loading: false });
        setMovie({ ...movie, reload: movie.reload + 1 });
      })
      .catch((errors) => {
        setReview({ ...review, loading: false });
      });
  };

  return (
    <div className="movie-details-container p-5">
      {/* Loader  */}
      {movie.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST MOVIES  */}
      {movie.loading === false && movie.err == null && (
        <>
          {/* Details Movie  */}
          <div className="row">
            <div className="col-3">
              <img
                className="movie-image"
                src={movie.result.image_url}
                alt={movie.result.name}
              />
            </div>

            <div className="col-9">
              <h3> {movie.result.name} </h3>
              <p>{movie.result.description}</p>
            </div>
          </div>

          {/* Reviews For Movies  */}
          <hr />
          <h5 className="text-center bg-dark text-white p-2">Review movies</h5>

          {movie.result.reviews.map((review) => (
            <ReviewMovie review={review.review} />
          ))}
          {/* Handle No Review  */}
          {movie.result.reviews.length === 0 && (
            <Alert variant="info" className="p-2">
              there is no review currently for this movie
            </Alert>
          )}

          {auth && (
            <Form onSubmit={sendReview}>
              <Form.Group className="mb-3">
                <textarea
                  value={review.review}
                  onChange={(e) =>
                    setReview({ ...review, review: e.target.value })
                  }
                  className="form-control"
                  placeholder="please write a review"
                  rows={5}></textarea>
              </Form.Group>

              <Form.Group className="mb-3">
                <button className="btn btn-dark">Send Review</button>
              </Form.Group>
            </Form>
          )}
        </>
      )}

      {/* ERRORS HANDLING  */}
      {movie.loading === false && movie.err != null && (
        <Alert variant="danger" className="p-2">
          {movie.err}
        </Alert>
      )}

      {!auth && (
        <Alert variant="warning" className="p-2">
          please login first to be able to send a review
        </Alert>
      )}
    </div>
  );
};

export default MovieDetails;
