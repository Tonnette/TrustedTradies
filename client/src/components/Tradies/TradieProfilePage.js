import React, { Component } from "react";
import API from "../../utils/API";
import "../assets/css/style.css"
import NavbarTradies from "./NavbarTradies";
import Button from 'react-bootstrap/Button';

// const lastEntryData = [];



class TradieProfilePage extends Component {
    state = {
        items: [],
        showData: true,
        showDeletedCard: false,
        id: ""


    };


    componentDidMount() {

        let id = localStorage.getItem('id');
        // console.log(id)
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

    redirect = e => {
        window.location.replace("/tradie-edit")
    };


    render() {
        return (
            <div>
                <NavbarTradies />
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
                                                        <div className="textboxProfile">
                                                          <div><b>Name: </b> {this.state.items.name}</div>
                                                            <div><b>Email: </b> {this.state.items.email}</div>
                                                            <div><b>Postcode: </b>{this.state.items.postcode}</div>
                                                          
                                                            <div><b>Phone: </b> {this.state.items.phone}</div>
                                                            <div><b>Rates: </b> {this.state.items.rates}</div>
                                                            <div><b>Description: </b> {this.state.items.description}</div>
                                                            <Button style={{ backgroundColor: "#e65c00", margin: "20px" }}
                                                                value={this.state.items._id} defaultChecked={false}
                                                                className="buttonText"
                                                                onClick={() => this.redirect(this.state.items._id)}>Edit Profile</Button>
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
                </div>
            </div>

        )

    }
}

export default TradieProfilePage;