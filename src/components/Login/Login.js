import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/loginService";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};
// 2.

// 3.
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthActions();
  const auth = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      // localStorage.setItem("data", JSON.stringify(data));
      setError(null);
      history.push(redirect);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <button
          style={{ width: "100%" }}
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/signup?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Not signup yet ?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
