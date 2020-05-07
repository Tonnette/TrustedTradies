import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Button from 'react-bootstrap/Button';
import NavbarNonMembers from "../NonMembers/NavbarNonMembers";
import 'materialize-css';
import M from "materialize-css";
import "../assets/css/style.css";
import Head from "../Head";


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      showRegister: true,
      showLoginButton: false,
      showWelcome: false,
      items: [],
      errors: {}
    };
  }

  componentDidMount() {
    API.getUsers()
      .then(response => {
        // console.log(response.data)
        this.setState({
          items: response.data
        });
        // console.log(this.state.items)
      })
  };
  redirect = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log(this.state.items)
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // matching email, they are already a member
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].email === newUser.email) {
        M.toast({
          html: "<div class='message'>You are already a member, please login</div>",
          classes: 'orangeToast',
          displayLength: 3500,
        })

        // this.setState({
        //   showRegister: false,
        //   showLoginButton: true,
        // })
        return;
      }
    }
    if (!newUser.email || !newUser.password) {
      M.toast({
        html: "<div class='message'>email and password cant be blank</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    var emailcode = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!newUser.email.match(emailcode)) {
      M.toast({
        html: "<div class='message'>not a valid email</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    if (newUser.password !== newUser.password2) {
      M.toast({
        html: "<div class='message'>passwords don't match</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    var passw = /^(?=.*[0-9])(?=.*[A-Z]).{6,20}$/;
    if (!newUser.password.match(passw)) {
      M.toast({
        html: "<div class='message'>Password must be 6-20 characters, one UpperCase letter & one number</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    else {
      API.saveUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        password2: newUser.password2,
      })
      this.setState({
        showRegister: false,
        showWelcome: true
      })
    }
  }
  redirect = e => {
    window.location.replace("/login")
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <NavbarNonMembers />
        <Head />
        {
          this.state.showRegister ?
            <div className="row">
              <div className="col s8 offset-s2">
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Register</b> below
              </h4>
                  <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name}
                      id="name"
                      type="text"
                    />
                    <label htmlFor="name">Name</label>
                  </div>
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
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2}
                      id="password2"
                      type="password"
                    />
                    <label htmlFor="password2">Confirm Password</label>
                  </div>
                  <div className="col s12" style={{ paddingBottom: "11.250px" }}>

                    <Button variant="info" type="submit"
                      onClick={this.onSubmit}
                    >Register
              </Button>
                  </div>
                </form>
              </div>
            </div>
            : null
        }

        <div>
          {
            this.state.showWelcome ?
              <div className="row">
                <div className="col s8 offset-s2">
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                      You are now Registered  <b>{this.state.name}</b>
                    </h4>
                    <p className="grey-text text-darken-1">
                      Please now:
                  </p>
                    
                    <Button variant="info" type="submit"
                      onClick={this.redirect}
                    >Login
              </Button>
                  </div>
                </div>
              </div>

              : null
          }
        </div>
      </div>
    );
  }
}
export default Register;