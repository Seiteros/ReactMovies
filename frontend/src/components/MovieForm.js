import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function MovieForm({ movie, newMovie }) {
  const todayDate = new Date();
  let initialValues = {};

  if (newMovie) {
    initialValues = {
      title: "Tytuł",
      director: "Reżyser",
      genre: "Gatunek",
      year: todayDate.getFullYear(),
      description: "Opis",
      image_url: "https://",
    };
  } else {
    initialValues = {
      id: movie.id,
      title: movie.title,
      director: movie.director,
      genre: movie.genre,
      year: movie.year,
      description: movie.description,
      image_url: movie.image_url,
    };
  }

  return (
    <Formik
      initialValues={initialValues}
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
      onSubmit={(values, { setSubmitting, setStatus }) => {
        const postData = async () => {
          await axios
            .post("http://localhost:3000/movie", values)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                setStatus({
                  sent: true,
                  msg: "Wysłano film.",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              setStatus({
                sent: false,
                msg: `Error! ${error}. Spróbuj ponownie później.`,
              });
            });
          setSubmitting(false);
        };

        const putData = async () => {
          await axios
            .put(`http://localhost:3000/movie/${values.id}`, values)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                setStatus({
                  sent: true,
                  msg: "Wysłano film.",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              setStatus({
                sent: false,
                msg: `Error! ${error}. Spróbuj ponownie później.`,
              });
            });
          setSubmitting(false);
        };

        if (newMovie) {
          postData();
        } else {
          putData();
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <Field name="title" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="title" component="div" className="fw-bold text-danger p-2" />
          <Field name="year" type="number" className="form-control bg-dark text-light" />
          <ErrorMessage name="year" component="div" className="fw-bold text-danger p-2" />
          <Field name="director" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="director" component="div" className="fw-bold text-danger p-2" />
          <Field name="genre" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="genre" component="div" className="fw-bold text-danger p-2" />
          <Field name="description" type="text" as="textarea" className="form-control bg-dark text-light" style={{ height: "175px" }} />
          <ErrorMessage name="description" component="div" className="fw-bold text-danger p-2" />
          <Field name="image_url" type="text" className="form-control bg-dark text-light" />
          <ErrorMessage name="image_url" component="div" className="fw-bold text-danger p-2" />
          <button type="submit" className="btn btn-success float-end fw-bold m-1" disabled={isSubmitting}>
            Wyślij
          </button>
          {status && status.msg && <div className={`alert ${status.sent ? "alert-success" : "alert-danger"}`}>{status.msg}</div>}
        </Form>
      )}
    </Formik>
  );
}

export default MovieForm;
