import React, { Component } from "react";
import API from "../../utils/API";
// import DeleteBtn from "../components/DeleteBtn";
import "../assets/css/style.css"
import NavbarTradies from "./NavbarTradies";
import NavDeletedTradies from "./NavbarDeletedTradies";
import Button from 'react-bootstrap/Button';





class TradieProfilePage extends Component {
    state = {
        items: [],
        showData: true,
        showDeletedCard: false,
        navbar: true,
        deletedNavbar: false,
        id: ""
    };

    onChange = e => {
        const existing = this.state.items
        existing[e.target.id] = e.target.value
        this.setState({
            items: existing
        });
    };

    componentDidMount() {
        let id = localStorage.getItem('id');
        API.getTradie(id)
            .then(response => {
                // console.log(response)

                this.setState({
                    items: response.data,
                    id: response.data.id
                });
                // console.log(this.state.items)
            })

            .catch(err => console.log(err));
    }

    deleteTradie = (id) => {
        API.deleteTradie(id)
        this.setState({
            showData: false,
            showDeletedCard: true,
            navbar: false,
            deletedNavbar: true

        })
        // .catch(err => console.log(err));
    }




    onSubmit = (e) => {
        e.preventDefault();
        const updatedTradie = {
            name: this.state.items.name,
            email: this.state.items.email,
            type: this.state.items.type,
            postcode: this.state.items.postcode,
            phone: this.state.items.phone,
            rates: this.state.items.rates,
            description: this.state.items.description
        }
        API.updateTradie(this.state.items._id, updatedTradie)

            .catch(err => console.log(err));
        window.location.replace("/tradie-profile")
    }



    render() {


        return (
            <div className="div">
                {
                    this.state.navbar ?
                        <NavbarTradies />
                        : null
                }
                {
                    this.state.deletedNavbar ?
                        <NavDeletedTradies />
                        : null
                }
                <div>
                    {
                        this.state.showData ?
                            <div className="row">
                                <div className="col s12 m12 l12">
                                    <div style={{ textAlign: "center", paddingTop: "70px" }}>
                                        <div className="row">
                                            <div className="col s12 m10 offest-m2 l4">
                                                <img src={this.state.items.imagePath} className="ProfileImage" alt="tradesperson" style={{ textAlign: "center" }} />
                                            </div>
                                            <div className="col s12 m10 offest-m2 l8">
                                                <div className="row">
                                                    <div className="col s6 offset-s3 m8 offset-m2 l10">
                                                        <div className="blueBoxProfile">
                                                            <div className="headerProfile"> {this.state.items.type}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col s8 offset-s3 m8 offset-m3 l12">
                                                        <form noValidate onSubmit={this.onSubmit}>
                                                            <div className="textboxProfile">
                                                                <div className="input-field col s8">
                                                                    <div><b>Name: </b>
                                                                        <input
                                                                            onChange={this.onChange}
                                                                            value={this.state.items.name}
                                                                            // error={errors.name}
                                                                            id="name"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor="name"></label>
                                                                    </div>
                                                                </div>
                                                                <div className="input-field col s8">
                                                                    <div><b>My trade: </b>
                                                                        <input
                                                                            onChange={this.onChange}
                                                                            value={this.state.items.type}
                                                                            // error={errors.name}
                                                                            id="name"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor="name"></label>
                                                                    </div>
                                                                </div>
                                                                <div className="input-field col s8">
                                                                    <div><b>Postcode: </b>
                                                                        <input
                                                                            onChange={this.onChange}
                                                                            value={this.state.items.postcode}
                                                                            // error={errors.password}
                                                                            id="postcode"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor="postcode"></label>

                                                                    </div>
                                                                </div>
                                                                <div className="input-field col s8">
                                                                    <div><b>Phone: </b>
                                                                        <input
                                                                            onChange={this.onChange}
                                                                            value={this.state.items.phone}
                                                                            // error={errors.name}
                                                                            id="phone"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor="phone"></label>
                                                                    </div>
                                                                </div>
                                                                <div className="input-field col s8">
                                                                    <div><b>Rates per hour: </b>
                                                                        <input
                                                                            onChange={this.onChange}
                                                                            value={this.state.items.rates}
                                                                            // error={errors.password}
                                                                            id="postcode"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor="password"></label>
                                                                    </div>

                                                                </div>
                                                                <div className="input-field col s8">
                                                                    <div><b>Description: </b>
                                                                        <input
                                                                            onChange={this.onChange}
                                                                            value={this.state.items.description}
                                                                            // error={errors.password2}
                                                                            id="description"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor="password2"></label>
                                                                    </div>

                                                                </div>


                                                            </div>
                                                        </form>
                                                        <div className="col s8 m8 l8" style={{ paddingBottom: "11.250px" }}>

                                                            <Button variant="info" type="submit" style={{ backgroundColor: "#6500d1" }}
                                                                onClick={this.onSubmit}
                                                            >Update    </Button>
                                                        </div>
                                                        <br></br>
                                                        <div className="col s8 m8 l8" style={{ paddingBottom: "11.250px" }}>
                                                            <Button variant="danger" type="submit" style={{ backgroundColor: "red" }}
                                                                onClick={() => this.deleteTradie(this.state.items._id)}>Delete this profile
                                 </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            : null
                    }



                </div>


                <div>
                    <div>
                        {
                            this.state.showDeletedCard ?
                                <div className="row">
                                    <div className="col s8 offset-s2">
                                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                            <h4>
                                                Your profile has now been deleted!
                                </h4>
                                            <p className="grey-text text-darken-1">
                                                Please:
                              </p>

                                            <Button variant="info" type="submit"
                                                href="/"
                                            >logout
                          </Button>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div >
        )

    }
}

export default TradieProfilePage;