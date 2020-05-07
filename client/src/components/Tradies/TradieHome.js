import React, { Component } from "react";
import NavbarTradies from "./NavbarTradies";
import TradieCard from "./TradieCard";
import SearchTradiesMemberCard from "../Members/SearchTradiesMemberCard";
import ProfileCardTradie from "./ProfileCardTradie";
import SearchTradieForm from "../SearchTradieForm";
import API from "../../utils/API";
import Head from "../Head";
import Button from 'react-bootstrap/Button';
import 'materialize-css';
import M from "materialize-css";
import "../assets/css/style.css";

var temp = [];
class Landing extends Component {
    state = {
        visible: false,
        showCard: true,
        showProfileCard: false,
        showSearch: true,
        showSecondSearch: true,
        showPostCodeCard: true,
        showTradiesCard: false,
        showAllCards: true,
        show: true,
        filteredContacts: [],
        items: [],
        images: [],
        chosenTradie: [],
        search: "",
        currentUser: "",
        database: "",
    };

    
    firstAPICall() {
        var localName = localStorage.getItem('name');
        API.getTradies()

            // .then((response) => response.json())

            .then(response => {
                // console.log(response)
                this.setState({
                    items: response.data,
                    filteredContacts: response.data,
                    currentUser: localName
                });
            })

            .catch(err => console.log(err));

    }
    secondAPICall() {
        let id = localStorage.getItem('id');
        // console.log(id)
        API.getUser(id)
            .then(response => {
                // console.log(response)
                this.setState({
                    database: response.data,
                });
                // console.log(this.state.database.name)
            })

            .catch(err => console.log(err));

    }

    componentDidMount() {
        this.firstAPICall()
        this.secondAPICall()

    };

    onChange = e => {
        this.setState({ postcode: e.target.value });
    };

    clickOnCard = (item, e) => {
        console.log(item)
        this.setState({
            chosenTradie: item,
            showCard: false,
            showAllCards: false,
            showSecondSearch: false,
            showProfileCard: true,
        });
    }

    clickReview = (e) => {
        // console.log(this.state.chosenTradie._id)
        localStorage.setItem('id', this.state.chosenTradie._id)
        localStorage.setItem('name', this.state.currentUser)
        window.location.replace("/user-review-edit")
    }
    postcodeSearch = e => {
        e.preventDefault();
        console.log(this.state.postcode)
        // console.log(e.target.value)
        var postcodeCode = /^\d{4}$/
        if (!this.state.postcode.match(postcodeCode)) {
            M.toast({
                html: "<div class='message'>not a valid postcode</div>",
                classes: 'orangeToast',
                displayLength: 3500,
            })
            return;
        }
        else if (this.state.postcode.length >= 3) {
            for (var x = 0; x < this.state.items.length; x++) {
                if (this.state.items[x].postcode === this.state.postcode) {
                    temp.push(this.state.items[x]);
                }
            }
            if (temp.length === 0) {
                M.toast({
                    html: "<div class='message'>Sorry, no tradies in your area</div>",
                    classes: 'orangeToast',
                    displayLength: 3500,
                })

            }
            this.setState({
                search: this.state.postcode,
                showTable: true,
                filteredContacts: temp,
            });
        };
    }
    updateSearch = event => {
        event.preventDefault();

        this.setState({
            search: event.target.value.substr(0, 35),
            showSearch: false,
            showPostCodeCard: false,
            showTradiesCard: true
        });
    };
    render() {
        let filteredTradies = this.state.filteredContacts.filter(trade => {
            return (
                trade.type
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) !== -1
            );
        });

        return (
            <div className="div">
                <NavbarTradies />
                <Head />

                <div className="qualityText">Find Quality Tradies in your area</div>
                {this.state.showSecondSearch ?
                    <div className="searchDiv">
                        <div className="row">
                            <div className="col s12">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="row" style={{ margin: '0px' }}>
                                        <div className="input-field col s6 offset-s3">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.postcode}
                                                // error={errors.name}
                                                id="postcode"
                                                type="text"
                                            />
                                            <label htmlFor="postcode">Postcode</label>
                                        </div>
                                        <div className="row" >
                                            <div className="col s6 offset-s3">
                                                <Button variant="info" type="submit" style={{ backgroundColor: "#1ba6a1" }}
                                                    onClick={this.postcodeSearch}
                                                >Search
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div>
                            <SearchTradieForm
                                updateSearch={this.updateSearch}
                                value={this.state.search}
                            />
                        </div>
                        <div className="row" >
                            <div className="col s6 offset-s3">
                                <Button variant="info" type="submit" style={{ backgroundColor: "#fc9003" }}
                                    href="/tradiehome">Refresh Filter
                        </Button>
                            </div>
                        </div>
                    </div>
                    : null}



                {this.state.showProfileCard ?
                    <ProfileCardTradie
                        chosenTradie={this.state.chosenTradie}
                        clickReview={this.clickReview}
                    />
                    : null}



                <div className="cardDiv" style={{ backgroundColor: "white" }}>
                    <div className="row center-align myRow">
                        {this.state.showAllCards ?
                            <div className="col s12 l12 center-align myCol">
                                {this.state.showPostCodeCard ?
                                    <div>
                                        <TradieCard
                                            filteredContacts={this.state.filteredContacts}
                                            clickOnCard={this.clickOnCard}
                                        />
                                    </div>
                                    : null}

                                {this.state.showTradiesCard ?


                                    <SearchTradiesMemberCard
                                        filteredTradies={filteredTradies}
                                        // filteredContacts={this.state.filteredContacts}
                                        clickOnCard={this.clickOnCard}
                                    />


                                    : null}


                            </div>
                            : null}
                    </div>

                </div >
            </div>
        );
    }
}
export default Landing;