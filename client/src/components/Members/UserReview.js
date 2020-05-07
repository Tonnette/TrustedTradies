import React, { Component } from "react";
import API from "../../utils/API";

// import DeleteBtn from "../components/DeleteBtn";
import "../assets/css/style.css"
import NavbarTradies from "./NavbarUserMember";
import Button from 'react-bootstrap/Button';

// const lastEntryData = [];



class UserReview extends Component {
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
        window.location.replace("/user-review-edit")
    };


    render() {


        return (
            <div className="div">
                <NavbarTradies />
                <div>
                    {
                        this.state.showData ?
                            <div size="sm-12 lg-12 md-12">
                                <div className="div-lg-12 div-md-12 div-sm-12">
                                    <img className="float-left auto myThumbImage" src={this.state.items.imagePath} alt="tradesperson"
                                    />
                                </div>
                                <div>
                                    Trade: {this.state.items.type}
                                </div>
                                <div>
                                    Name: {this.state.items.name}
                                </div>
                                <div>
                                    Email: {this.state.items.email}
                                </div>
                                <div>
                                    Postcode: {this.state.items.postcode}
                                </div>
                                <div>
                                    Rates: {this.state.items.rates}
                                </div>
                                <div>
                                    Phone: {this.state.items.phone}
                                </div>
                                <div>
                                    Description: {this.state.items.description}
                                </div>
                              <div>
                                    {/* Reviews: {this.state.items.reviews} */}
                                </div>
                                <div>
                                    <Button variant="info" type="submit"
                                        onClick={() => this.redirect(this.state.items._id)}>Leave a review
                                    </Button>
                                    {/* 
                                    <button onClick={() => this.updateTradie(this.state.items._id)}>Update Profile</button> */}
                                </div>





                            </div>
                            : null
                    }
                </div>
                <div>
                    <div>
                        {
                            this.state.showDeletedCard ?
                                <div>


                                    <h4>Your profile has now been deleted</h4>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>


        )

    }
}

export default UserReview;