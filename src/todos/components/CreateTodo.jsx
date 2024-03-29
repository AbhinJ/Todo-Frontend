import { useNavigate, useParams } from "react-router-dom";
import { createTodo, getTodoById, updateTodo } from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

export default function CreateTodo() {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => retrieveTodo, []); //eslint-disable-line react-hooks/exhaustive-deps
  function retrieveTodo() {
    if (parseInt(id, 10) !== -1) {
      getTodoById(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }
  function onSubmit(values) {
    const todo = {
      id,
      username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (parseInt(id, 10) !== -1) {
      updateTodo(username, id, todo)
        .then(() => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    } else {
      createTodo(username, todo)
        .then(() => navigate("/todos"))
        .catch((error) => console.log(error));
    }
  }
  function validate(values) {
    let errors = {};
    if (values.description.length < 5)
      errors.description = "Enter atlest 5 characters";
    if (
      values.targetDate == null ||
      values.targetDate === "" ||
      !moment(values.targetDate.isValid)
    )
      errors.targetDate = "Enter a target Date";
    return errors;
  }
  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
