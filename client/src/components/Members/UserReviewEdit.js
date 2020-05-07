import React, { Component } from "react";
import ProfileCardMemberReview from "./ProfileCardMemberReview";
import API from "../../utils/API";
import "../assets/css/style.css"
import NavbarUserMember from "./NavbarUserMember";
import Button from 'react-bootstrap/Button';
import Head from "../Head";
import M from "materialize-css";
import 'materialize-css';

// const lastEntryData = [];


class UserReviewEdit extends Component {
    state = {
        items: [],
        showData: true,
        reviews: [],
        newReview: "",
        showDeletedCard: false,
        id: "",
        hideReview: true,
        returnButton: false,
        starRating: "",
        userName: ""
    };
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
            newReview: e.target.value,
        });
    };

    componentDidMount() {
        let id = localStorage.getItem('id');
        API.getTradie(id)
            .then(response => {
                console.log(response)
                this.setState({
                    items: response.data,
                    reviews: response.data.reviews,
                    id: response.data.id,
                });
            })

            .catch(err => console.log(err));

    }
    onSubmit = (e) => {
        e.preventDefault();
        var localName = localStorage.getItem('name');
        var newReview = this.state.newReview
        const updatedTradie = {
            reviews: newReview,
            rating: this.state.starRating,
            tradieId: this.state.items._id,
            UserName: localName
        }
        console.log(updatedTradie)
        API.saveReview(updatedTradie)
            .catch(err => console.log(err));
        M.toast({
            html: "<div class='message'>Thank you. Your review has been entered</div>",
            classes: 'orangeToast',
            displayLength: 3500,
        })

        this.setState({
            hideReview: false,
            returnButton: true

        });
    }

    clickOnStar = (e) => {
        console.log(e.target.value)
        console.log(parseInt(e.target.value))
        this.setState({
            starRating: e.target.value

        });

    }

    render() {
        return (
            <div className="div">
                <NavbarUserMember />
                <Head />
                <ProfileCardMemberReview
                    items={this.state.items}
                    reviews={this.state.reviews}
                />
                {
                    this.state.hideReview ?
                        <div>

                            <div className="row">
                                <div className="col s8 offset-s2 m8 offset-m2 l7 offset-l4">
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <div className="input-field">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.items.review}
                                                id="postcode"
                                                type="text"
                                            />
                                            <label htmlFor="password">leave review</label>
                                        </div>

                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s8 offset-s2 m8 offset-m2 l6 offset-l4">
                                    <div class="rate">
                                        <input type="radio" id="star5" name="rate" value="5"
                                            onChange={this.clickOnStar}
                                        />
                                        <label htmlFor="star5" title="text" id='5'>5 stars</label>
                                        <input
                                            type="radio"
                                            id="star4"
                                            name="rate"
                                            value="4"
                                            onChange={this.clickOnStar}
                                        />
                                        <label htmlFor="star4" title="text" id='4'>4 stars</label>

                                        <input type="radio" id="star3" name="rate" value="3"
                                            onChange={this.clickOnStar} />
                                        <label htmlFor="star3" title="text" id='3'>3 stars</label>

                                        <input type="radio" id="star2" name="rate" value="2"
                                            onChange={this.clickOnStar} />
                                        <label htmlFor="star2" title="text" id='2'>2 stars</label>

                                        <input type="radio" id="star1" name="rate" value="1"
                                            onChange={this.clickOnStar} />
                                        <label htmlFor="star1" title="text" id='1'>1 star</label>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col s12" style={{ textAlign: "center" }}>
                                    <Button variant="info" type="submit"
                                        onClick={this.onSubmit}
                                    >Leave Review
                                </Button>
                                    <br></br> <br></br>
                                </div>

                            </div>

                        </div>
                        : null
                }

                <div className="row">
                    {
                        this.state.returnButton ?
                            <div className="col s12" style={{ textAlign: "center" }}>
                                <Button variant="info" type="submit" style={{ backgroundColor: "#fc9003" }}
                                    href="/userhome"
                                >Return Home
                                </Button>
                                <br></br> <br></br>
                            </div>
                            : null
                    }
                </div>
            </div>

        )

    }
}

export default UserReviewEdit;