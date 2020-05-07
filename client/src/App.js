import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import TradieHome from "./components/Tradies/TradieHome";
import UserHome from "./components/Members/UserHome";
import TradieProfilePage from "./components/Tradies/TradieProfilePage";
import TradieProfileEdit from "./components/Tradies/TradieProfileEdit";
import UserReview from "./components/Members/UserReview";
import UserReviewEdit from "./components/Members/UserReviewEdit";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import LoginTradie from "./components/auth/LoginTradie";
import TradieRegister from "./components/auth/TradieRegister";
import Uploads from "./components/auth/Uploads";
import Profile from "./components/auth/Profile";
import Footer from "./components/Footer";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Head /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/tradiehome" component={TradieHome} />
          <Route exact path="/userhome" component={UserHome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/tradie-register" component={TradieRegister} />
          <Route exact path="/login-tradie" component={LoginTradie} />
          <Route exact path="/uploads" component={Uploads} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/tradie-profile" component={TradieProfilePage} />
          <Route exact path="/tradie-edit" component={TradieProfileEdit} />
          <Route exact path="/user-review" component={UserReview} />
          <Route exact path="/user-review-edit" component={UserReviewEdit} />
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;