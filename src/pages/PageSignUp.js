import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";
import "./login-style.css";

function PageSignUp() {
  const history = useHistory();
  const { signup, isUsernameValid } = useAuth();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    error: "",
    loading: false,
  });

  const handleOnChange = (event) =>
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  function handleError(error) {
    if (error.code === "auth/email-already-in-use") {
      return "This email address is already registered under an account";
    } else if (error.code === "auth/invalid-email") {
      return "This email address is not valid";
    } else if (error.code === "auth/weak-password") {
      return "Password is too weak";
    } else {
      return error.message;
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      return setFormState((prevState) => ({
        ...prevState,
        error: "Passwords do not match",
      }));
    }

    const validUsername = await isUsernameValid(formState.username);
    if (!validUsername) {
      return setFormState((prevState) => ({
        ...prevState,
        error: "Username already in use",
      }));
    }

    try {
      setFormState((prevState) => ({ ...prevState, error: "", loading: true }));
      await signup(formState.email, formState.password, formState.username);
      history.push("/");
    } catch (caughtError) {
      setFormState((prevState) => ({
        ...prevState,
        error: handleError(caughtError),
      }));
    } finally {
      setFormState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Box className="login-box">
        <h2 className="login-header">Sign Up</h2>
        <form onSubmit={handleSignUp} className="login-form">
          {formState.error && <Alert variant="danger">{formState.error}</Alert>}
          <div>
            <label class="sr-only">Enter your email:</label>
            <input
              class="form-control"
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="sr-only" for="username">
              Create username:
            </label>
            <input
              class="form-control"
              type="username"
              name="username"
              value={formState.username}
              onChange={handleOnChange}
              placeholder="Create username"
            />
          </div>
          <div>
            <label class="sr-only" for="password">
              Create password:
            </label>
            <input
              class="form-control"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleOnChange}
              placeholder="Create password"
              minlength="8"
            />
          </div>
          <div>
            <label class="sr-only" for="confirmPassword">
              Confirm password:
            </label>
            <input
              class="form-control"
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
            />
          </div>
          <div className="submit-area">
            <button
              type="submit"
              className="login-btn"
              disabled={formState.loading}
            >
              Create Account
            </button>
          </div>
          <div>
            <span>Already have an account?&nbsp;</span>
            <Link to="/login" value="Back to Login">
              Log in
            </Link>
          </div>
        </form>
      </Box>
    </>
  );
}

export default PageSignUp;
