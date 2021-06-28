import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";
import "./login-style.css";

function PageForgotPassword() {
  const { resetPassword } = useAuth();

  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState({
    email: "",
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
    } else {
      return error.message;
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();

    try {
      setFormState((prevState) => ({ ...prevState, error: "", loading: true }));
      setMessage("");
      await resetPassword(formState.email);
      setMessage("Check inbox for password reset instructions");
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
        <h2 className="login-header">Password Reset</h2>
        <form
          onSubmit={handleResetPassword}
          action="/action_page.php"
          className="login-form"
        >
          {formState.error && <Alert variant="danger">{formState.error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <div>
            <label class="sr-only">Enter email:</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="submit-area">
            <button
              type="submit"
              className="login-btn"
              value="Confirm"
              disabled={formState.loading}
            >
              Reset Password
            </button>
          </div>
          <div>
            <Link to="/login" value="Create Account">
              Login
            </Link>{" "}
            | {""}
            <Link to="/signup" value="Create Account">
              Create one
            </Link>
          </div>
        </form>
      </Box>
    </>
  );
}

export default PageForgotPassword;
