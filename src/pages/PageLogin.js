import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";
import "./login-style.css";

function PageLogin() {
  const history = useHistory();
  const { login } = useAuth();

  const [formState, setFormState] = useState({
    logInCredential: "",
    password: "",
    error: "",
    loading: false,
  });

  const handleOnChange = (event) =>
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  function handleError(error) {
    if (error.code === "auth/user-not-found") {
      return "This email address is not registered under an account";
    } else if (error.code === "auth/invalid-email") {
      return "This email address is not valid";
    } else if (error.code === "auth/wrong-password") {
      return "Incorrect password";
    } else {
      return error.message;
    }
  }

  async function handleLogIn(event) {
    event.preventDefault();

    try {
      setFormState((prevState) => ({ ...prevState, error: "", loading: true }));
      await login(formState.logInCredential, formState.password);
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
      <Box>
        <h2 className="login-header">Sign In</h2>
        <form
          onSubmit={handleLogIn}
          action="/action_page.php"
          className="login-form"
        >
          {formState.error && <Alert variant="danger">{formState.error}</Alert>}
          <div>
            <label class="sr-only">Enter email or username:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter email or username"
              id="logInCredential"
              name="logInCredential"
              value={formState.logInCredential}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label class="sr-only" for="password">
              Enter password:
            </label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter password"
              name="password"
              value={formState.password}
              onChange={handleOnChange}
            />
            <Link to="/forgot-password" className="login-resetpwd">
              Forgot Password?
            </Link>
          </div>
          <div className="submit-area">
            <button
              type="submit"
              className="login-btn"
              value="Confirm"
              disabled={formState.loading}
            >
              Sign in
            </button>
          </div>
          <div>
            <span>Don't have an account?&nbsp;</span>
            <Link to="/signup" value="Create Account">
              Create one
            </Link>
          </div>
        </form>
      </Box>
    </>
  );
}

export default PageLogin;
