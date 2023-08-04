import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./signup.css";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";
import { signupUser } from "../../services/signupService";
import { useEffect, useState } from "react";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};
// 2.

// 3.
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(6, "Name length is not valid"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),
  password: Yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
  passwordConfirm: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthActions();
  const auth = useAuth();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;

    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };

    try {
      const { data } = await signupUser(userData);
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
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />{" "}
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <button
          style={{ width: "100%" }}
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Signup
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Already login ?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(SignupForm);
