import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

function EditMovieForm() {
  return (
    <Formik
      initialValues={{
        id: 0,
        title: "title",
        director: "director",
        genre: "genre",
        year: 2021,
        description: "description",
        image_url: "",
      }}
      onSubmit={(values) => {
        axios
          .put(`http://localhost:3000/movie/${values.id}`, values)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      }}
    >
      <Form>
        <Field name="id" type="number" />
        <Field name="title" type="text" />
        <Field name="director" type="text" />
        <Field name="genre" type="text" />
        <Field name="year" type="number" />
        <Field name="description" type="text" />
        <Field name="image_url" type="text" />
        <button type="submit">Ok</button>
      </Form>
    </Formik>
  );
}

export default EditMovieForm;
