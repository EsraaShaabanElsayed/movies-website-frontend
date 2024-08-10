import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMovie = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [movie, setMovie] = useState({
    name: "",
    description: "",
    image_url: null,
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const image = useRef(null);

  const updateMovie = (e) => {
    e.preventDefault();

    setMovie({ ...movie, loading: true });

    const formData = new FormData();
    formData.append("name", movie.name);
    formData.append("description", movie.description);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
      .put("http://localhost:4000/movies/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setMovie({
          ...movie,
          loading: false,
          success: "movie updated successfully !",
          reload: movie.reload + 1,
        });
      })
      .catch((err) => {
        setMovie({
          ...movie,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    setMovie({ ...movie, loading: true });
    axios
      .get("http://localhost:4000/movies/" + id)
      .then((resp) => {
        setMovie({
          ...movie,
          loading: false,
          success: "Movie loaded successfully!",
          err: null,
          name: resp.data.name,
          description: resp.data.description,
          image_url: resp.data.image_url,
        });
      })
      .catch((err) => {
        setMovie({
          ...movie,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later!",
        });
      });
  }, [id, movie, movie.reload]);
  

  return (
    <div className="login-container">
      <h1>Update Movie Form</h1>

      {movie.err && (
        <Alert variant="danger" className="p-2">
          {movie.err}
        </Alert>
      )}

      {movie.success && (
        <Alert variant="success" className="p-2">
          {movie.success}
        </Alert>
      )}

      <Form onSubmit={updateMovie} className="text-center py-2">
        <img
          alt={movie.name}
          style={{
            width: "50%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          src={movie.image_url}
        />

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Movie Name"
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={movie.description}
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Movie
        </Button>
      </Form>
    </div>
  );
};

export default UpdateMovie;
