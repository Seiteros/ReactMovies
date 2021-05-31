import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
      validate={(values) => {
        const errors = {};

        function validateTitle(title) {
          if (!title) {
            errors.title = "Tytuł Wymagany";
          }
        }

        function validateDirector(director) {
          if (!director) {
            errors.director = "Reżyser Wymagany";
          }
        }

        function validateGenre(genre) {
          if (!genre) {
            errors.genre = "Gatunek Wymagany";
          } else if (genre.length > 50) {
            errors.genre = "Gatunek za długi (maks 50 znaków)";
          }
        }

        function validateYear(year) {
          const todayDate = new Date();

          if (!year) {
            errors.year = "Rok Wymagany";
          } else if (!Number.isInteger(year)) {
            errors.year = "Rok musi być liczbą całkowitą";
          } else if (year > todayDate.getFullYear() || year < 1000) {
            errors.year = "Nieprawidłowy rok";
          }
        }

        function validateDescription(description) {
          if (!description) {
            errors.description = "Opis Wymagany";
          }
        }

        function validateImage_url(image_url) {
          function testUrl(url) {
            try {
              new URL(url);
            } catch (e) {
              console.error(e);
              return false;
            }
            return true;
          }

          if (!testUrl(image_url)) {
            errors.image_url = "Nieprawidłowy url";
          }
        }

        validateTitle(values.title);
        validateDirector(values.director);
        validateGenre(values.genre);
        validateYear(values.year);
        validateDescription(values.description);
        validateImage_url(values.image_url);

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const postData = async () => {
          await axios
            .put(`http://localhost:3000/movie/${values.id}`, values)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
          setEditMovie(false);
          setSubmitting(false);
        };
        postData();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="title" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="title" component="div" className="fw-bold text-danger p-2" />

          <Field name="year" type="number" className="form-control bg-dark text-light" />
          <ErrorMessage name="year" component="div" className="fw-bold text-danger p-2" />

          <Field name="director" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="director" component="div" className="fw-bold text-danger p-2" />

          <Field name="genre" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="genre" component="div" className="fw-bold text-danger p-2" />

          <Field name="description" type="text" as="textarea" className="form-control bg-dark text-light" style={{ height: "150px" }} />
          <ErrorMessage name="description" component="div" className="fw-bold text-danger p-2" />

          <Field name="image_url" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="image_url" component="div" className="fw-bold text-danger p-2" />

          <button type="submit" className="btn btn-success float-end fw-bold m-1" disabled={isSubmitting}>
            Wyślij
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default EditMovieForm;
