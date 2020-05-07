import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Button from 'react-bootstrap/Button';
import NavbarNonMembers from "../NonMembers/NavbarNonMembers";
import Head from "../Head";
import 'materialize-css';
import M from "materialize-css";

function handleLoginErr() {
  M.toast({
    html: "<div class='message'>incorrect username or password</div>",
    classes: 'orangeToast',
    displayLength: 3500,
})
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };


    API.loginTradie({
      email: userData.email,
      password: userData.password

    })
      // .then(function () {
      //   
      // })
       .then((response) => {

         if(response.data.success === true){
          localStorage.setItem('id', response.data.payload.id)
          localStorage.setItem('name', response.data.payload.name)

          window.location.replace("/tradie-profile")

         }else{
          M.toast({
            html: "<div class='message'>error</div>",
            classes: 'orangeToast',
            displayLength: 3500,
        })
         }
      
      })
      
      .catch(handleLoginErr);
  };


  render() {
    const { errors } = this.state;
    return (
      <div>
         <NavbarNonMembers />
         <Head />
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Business Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingBottom: "11.250px" }}>
                <Button variant="info" type="submit"
                  onClick={this.onSubmit}
                >Login
              </Button>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;