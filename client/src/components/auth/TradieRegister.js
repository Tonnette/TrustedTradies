import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarNonMembers from "../NonMembers/NavbarNonMembers";
import API from "../../utils/API";
import 'materialize-css';
import M from "materialize-css";
import "../assets/css/style.css"
import Button from 'react-bootstrap/Button';
import Head from "../Head";

class TradieRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      selectedFiles: null,
      imageName: "",
      imageLocation: "",
      name: "",
      email: "",
      password: "",
      password2: "",
      type: "",
      postcode: "",
      description: "",
      phone: "",
      rates: "",
      showRegister: true,
      showLoginButton: false,
      showProfileCard: false,
      showform: false,
      items: [],
      errors: {}
    }
  }
  singleFileChangedHandler = (event) => {
    // console.log(event.target.files)
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  singleFileUploadHandler = (event) => {
    event.preventDefault();
    this.setState({
      showform: true,
    })

    const data = new FormData();
    // console.log(data)
    // If file selected
    if (this.state.selectedFile) {
      data.append('profileImage', this.state.selectedFile);
      // console.log(data)
      API.saveImage(data)
        .then((response) => {

          if (200 === response.status) {
            this.setState({
              imageName: response.data.image,
              imageLocation: response.data.location,

            })
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                // this.ocShowAlert('Max size: 2MB', 'red');
                M.toast({
                  html: "<div class='message'>Max Size 2MB/div>",
                  classes: 'orangeToast',
                  displayLength: 3500,
                })
              } else {
                // console.log(response.data);
                // If not the given file type
                // this.ocShowAlert(response.data.error, 'red');
                M.toast({
                  html: "<div class='message'>Wrong file type/div>",
                  classes: 'orangeToast',
                  displayLength: 3500,
                })
              }
            } else {
              // Success
              // let fileName = response.data;
              // console.log('filedata', fileName);
              // this.ocShowAlert('Welcome' + this.state.name + 'please now sign in', '#3089cf');

            }
          }
        })
        .catch((error) => {
          // If another error
          // this.ocShowAlert(error, 'red');
          M.toast({
            html: "<div class='message'>Error. Please upload a different image</div>",
            classes: 'orangeToast',
            displayLength: 3500,
          })
        });
    } else {
      // if file not selected throw error
      // this.ocShowAlert('Please upload file', 'red');
      M.toast({
        html: "<div class='message'>Please upload file</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
    }
  };

  submitToDatabase = (event) => {
    event.preventDefault();
    const newTradie = {
      imageName: this.state.imageName,
      imageLocation: this.state.imageLocation,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      type: this.state.type,
      postcode: this.state.postcode,
      description: this.state.description,
      phone: this.state.phone,
      rates: this.state.rates
    };

    API.getTradies()
      .then(response => {
        // console.log(response.data)
        this.setState({
          items: response.data
        });
        // console.log(this.state.items)

        // console.log(this.state.items)
        for (var i = 0; i < this.state.items.length; i++) {
          if (this.state.items[i].email === newTradie.email) {
            // console.log(this.state.items[i].email + "or " + newTradie.email)
            this.setState({
              showRegister: false,
              showLoginButton: true,
            })

            return;
          }
        }

      })


    if (!newTradie.email || !newTradie.password) {
      M.toast({
        html: "<div class='message'>email and password cant be blank</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    var emailcode = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!newTradie.email.match(emailcode)) {
      M.toast({
        html: "<div class='message'>not a valid email</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    if (newTradie.password !== newTradie.password2) {
      M.toast({
        html: "<div class='message'>passwords don't match</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }

    if (!newTradie.type) {
      M.toast({
        html: "<div class='message'>Please tell us what your trade is</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    var ph = /^\d{8,10}$/
    if (!newTradie.phone.match(ph)) {
      M.toast({
        html: "<div class='message'>Phone number must be 8 to 10 digits</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    if (!newTradie.postcode) {
      M.toast({
        html: "<div class='message'>What is your postcode?</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    var postcodeCode = /^\d{4}$/
    if (!newTradie.postcode.match(postcodeCode)) {
      M.toast({
        html: "<div class='message'>Not a valid postcode</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;
    }
    var passw = /^(?=.*[0-9])(?=.*[A-Z]).{6,20}$/;
    if (!newTradie.password.match(passw)) {
      M.toast({
        html: "<div class='message'>Password must be 6-20 characters, one UpperCase letter & one number</div>",
        classes: 'orangeToast',
        displayLength: 3500,
      })
      return;

    }
    else {
      // If file selected
      API.saveTradie(newTradie)
      this.setState({
        showRegister: false,
        showProfileCard: true
      });

      // window.location.replace("/login-tradie")

    }
  }


  redirect = e => {
    window.location.replace("/login-tradie")
  };



  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    // console.log(this.state)
    return (
      <div>

        <div>
          <NavbarNonMembers />
          <Head />
          {/* For Alert box*/}
          <div id="oc-alert-container"></div>

          {this.state.showRegister ?
            <div className="row">
              <div className="col s8 offset-s2">
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Register your Business</b> below
              </h4>
                  <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login-tradie">Log in</Link>
                  </p>
                </div>
                <form noValidate encType="multipart/form-data" onSubmit={this.onSubmit}>

                  <p className="grey-text text-darken-1">Please upload an image for your profile</p>

                  <input type="file" style={{ paddingBottom: "11.250px" }} onChange={this.singleFileChangedHandler} />
                  <div className="mt-1" style={{ paddingBottom: "11.250px" }} >
                    <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Select File</button>
                  </div>

                  {this.state.showform ?
                    <div className="startForm">
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.name}
                          // error={errors.name}
                          id="name"
                          type="text"
                        />
                        <label htmlFor="name">Name</label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.email}
                          // error={errors.email}
                          id="email"
                          type="email"
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.password}
                          // error={errors.password}
                          id="password"
                          type="password"
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.password2}
                          // error={errors.password2}
                          id="password2"
                          type="password"
                        />
                        <label htmlFor="password2">Confirm Password</label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.type}
                          // error={errors.postcode}
                          id="type"
                          type="text"
                        />
                        <label htmlFor="type">What's your trade?</label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.postcode}
                          // error={errors.postcode}
                          id="postcode"
                          type="text"
                        />
                        <label htmlFor="postcode">Postcode</label>
                      </div>

                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.phone}
                          // error={errors.phone}
                          id="phone"
                          type="text"
                        />
                        <label htmlFor="phone">Phone</label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.rates}
                          // error={errors.rates}
                          id="rates"
                          type="text"
                        />
                        <label htmlFor="rates">Rates per</label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.description}
                          // error={errors.description}
                          id="description"
                          type="text"
                        />
                        <label htmlFor="description">Describe your business</label>
                      </div>

                      <div className="mt-1" style={{ paddingBottom: "11.250px" }} >
                        <button className="btn btn-info" onClick={this.submitToDatabase}>Upload!</button>
                      </div>

                    </div>
                    : null
                  }

                </form>
              </div>
            </div>
            : null
          }
        </div>
        <div>
          {
            this.state.showProfileCard ?

              <div className="row">
                <div className="col s8 offset-s2">
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                      You are now Registered,  <b>{this.state.name}</b>
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
        <div>
          {
            this.state.showLoginButton ?
              <div className="row">
                <div className="col s8 offset-s2">
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                      You are already a member, <b>{this.state.name}</b>
                    </h4>

                    <p className="grey-text text-darken-1">
                      Please
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
export default TradieRegister;
