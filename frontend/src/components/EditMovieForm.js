import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

function EditMovieForm({ movie, setEditMovie }) {
  return (
    <Formik
      initialValues={{
        id: movie.id,
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        year: movie.year,
        description: movie.description,
        image_url: movie.image_url,
      }}
      onSubmit={(values) => {
        axios
          .put(`http://localhost:3000/movie/${values.id}`, values)
          .then((response) => console.log(response), setEditMovie(false))
          .catch((error) => console.log(error));
      }}
    >
      <Form>
        <Field name="title" type="text" />
        <Field name="director" type="text" />
        <Field name="genre" type="text" />
        <Field name="year" type="number" />
        <Field name="description" type="text" />
        <Field name="image_url" type="text" />
        <button type="submit">Edytuj</button>
      </Form>
    </Formik>
  );
}

export default EditMovieForm;
