import React from "react";
import "../assets/css/style.css"
import 'materialize-css';

function MemberCard(props) {
  return (
    <div >
      {props.filteredContacts.map(item => (
        <div key={item._id}>
          <div className="col s12 m12 l6 xl4">
            <div className="card horizontal">
              <div className="flip-card">
                <div class="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="col s4 m4 l4 imageCol">
                      <img src={item.imagePath} alt="tradesperson" className="tradieImage valign-wrapper" />
                    </div>
                    <div className="col s8 m8 l8">
                      <div className="blueBox">

                        <div className="col s6 offset-s6 header"> {item.type}</div>
                      </div>

                      <div className="textbox">
                        <div className="huge"><b>Name:</b> {item.name}</div>
                        <div className="huge"><b>Rates:</b> ${item.rates}ph</div>
                        {/* <div class="col s6 offset-s6 postcode "><span><b>Postcode: </b>{item.postcode}</span> */}
                        <div className="huge"><b>Postcode:</b> {item.postcode}</div>
                      </div>
                      <div className="small"> {item.name}</div>
                    </div>
                  </div>
                  <div class="flip-card-back">
                    <h4 className="findText">Find out more / Leave a review... </h4>
                    <div className="card-action">
                      <button className="waves-effect waves-light btn-small" style={{ backgroundColor: "#02c2d4" }} value={item.id} defaultChecked={false}
                        onClick={props.clickOnCard.bind(props, item)}>Click here...</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
      }

    </div >

  );
}

export default MemberCard;
