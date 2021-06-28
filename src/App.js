import PageMain from "./pages/PageMain";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import PageForgotPassword from "./pages/PageForgotPassword";
import Planner from "./pages/Planner";
import Progress from "./pages/Progress";
import Forum from "./pages/Forum";
import PrivateRoute from "./config/PrivateRoute";
import HeaderBar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  function AuthenicatedRoutes() {
    return (
      <>
        <Sidebar />
        <Switch>
          <PrivateRoute exact path="/" component={PageMain} />
          <PrivateRoute path="/planner" component={Planner} />
          <PrivateRoute path="/progress" component={Progress} />
          <PrivateRoute path="/forum" component={Forum} />
        </Switch>
      </>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <HeaderBar />
        <Switch>
          <Route path="/signup" component={PageSignUp} />
          <Route path="/login" component={PageLogin} />
          <Route path="/forgot-password" component={PageForgotPassword} />
          <Route component={AuthenicatedRoutes} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
