import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

function AddMovieForm() {
  const validateGenre = (values) => {
    let errors = {};
    if (values.length > 10) {
      errors.genre = "Za długi";
    }
    console.log(values);
    console.log(errors);
    return errors;
  };

  return (
    <Formik
      initialValues={{
        title: "title",
        director: "director",
        genre: "genre",
        year: 2021,
        description: "description",
        image_url: "",
      }}
      onSubmit={(values) => {
        console.log("submit");
        axios
          .post("http://localhost:3000/movie", values)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      }}
    >
      <Form>
        <Field name="title" type="text" />
        <Field name="director" type="text" />
        <Field name="genre" type="text" validate={() => validateGenre} />
        <Field name="year" type="number" />
        <Field name="description" type="text" />
        <Field name="image_url" type="text" />
        <button type="submit">Ok</button>
      </Form>
    </Formik>
  );
}

export default AddMovieForm;
