import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import "./HeaderBar.css";

function HeaderBar() {
  const { signout, currentUser } = useAuth();

  const history = useHistory();

  async function handleLogOut() {
    await signout();
    history.push("/login");
  }

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: deepPurple }}
      elevation="disabled"
    >
      <Toolbar>
        <Typography variant="h5" className="title">
          Plan-et
        </Typography>
        {currentUser && (
          <Button color="inherit" size="large" onClick={handleLogOut}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
