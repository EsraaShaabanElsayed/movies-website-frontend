import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddMovie = () => {
  const auth = getAuthUser();
  const [movie, setMovie] = useState({
    name: "",
    description: "",
    err: "",
    loading: false,
    success: null,
  });

  const image = useRef(null);

  const createMovie = (e) => {
    e.preventDefault();

    setMovie({ ...movie, loading: true });

    const formData = new FormData();
    formData.append("name", movie.name);
    formData.append("description", movie.description);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
      .post("http://localhost:4000/movies", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setMovie({
          name: "",
          description: "",
          err: null,
          loading: false,
          success: "Movie Created Successfully !",
        });
        image.current.value = null;
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

  return (
    <div className="login-container">
      <h1>Add New Movie Form</h1>

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

      <Form onSubmit={createMovie}>
        <Form.Group className="mb-3">
          <Form.Control
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
            type="text"
            required
            placeholder="Movie Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={movie.description}
            required
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} required />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New Movie
        </Button>
      </Form>
    </div>
  );
};

export default AddMovie;
