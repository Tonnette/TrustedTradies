import React, { Component } from "react";
import NavbarNonMembers from "../components/NonMembers/NavbarNonMembers";
import SearchPostcodeCard from "../components/SearchPostcodeCard";
import SearchTradiesCard from "../components/SearchTradiesCard";
// import ProfileCard from "../components/ProfileCard";
// import SearchForm from "../components/SearchForm";
import SearchTradieForm from "../components/SearchTradieForm";
import Head from "../components/Head";
// import TradieCarousel from "../components/Carousel/TradieCarousel";
import 'materialize-css';
import Button from 'react-bootstrap/Button';
import M from "materialize-css";
import API from "../utils/API";

var temp = [];
class Landing extends Component {
    state = {
        visible: false,
        postcode: "",
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
    };



    componentDidMount() {
        API.getTradies()
            .then(response => {
                this.setState({
                    items: response.data,
                    filteredContacts: response.data
                });
            })
            .catch(err => console.log(err));
    }


    clickOnCard = (item, e) => {
        this.setState({
            chosenTradie: item,
            showCard: false,
            showAllCards: false,
            showProfileCard: true,
            showSearch: false,
            showSecondSearch: false
        });

    }


    onChange = e => {
        this.setState({ postcode: e.target.value });
    };

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
            if (temp.length === 0){
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
            showTradiesCard: true,
        });
    };
    redirect = e => {
        window.location.replace("/")
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
            <div className="row">
                <NavbarNonMembers />
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
                                                <Button variant="info" type="submit" style={{backgroundColor: "#1ba6a1"}}
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
                                <Button variant="info" type="submit" style={{ backgroundColor: "#ed6a1f" }}
                                    onClick={() => this.redirect()}>Refresh Filter
                        </Button>
                            </div>
                        </div>
                    </div>
                    : null}
                <div className="cardDiv" style={{ backgroundColor: "white" }}>
                    <div className="row center-align myRow">
                        {this.state.showAllCards ?
                            <div className="col s12 l12 center-align myCol">
                                {this.state.showPostCodeCard ?
                                    <div>
                                        <SearchPostcodeCard
                                            filteredContacts={this.state.filteredContacts}
                                            clickOnCard={this.clickOnCard}
                                        />
                                    </div>
                                    : null}
                                {this.state.showTradiesCard ?
                                    <SearchTradiesCard
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