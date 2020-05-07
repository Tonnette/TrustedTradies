import React from "react";
import 'materialize-css';





// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchTradieForm(props) {
  // const Submit = (e) => {
  //   e.preventDefault()
  //   props.updateSearch(e)
  // }
  return (
    <div className="row">
      <div className="col s12">

        <form>
          <div className="row" style={{margin: '0px'}}>
            <div className="input-field col s6 offset-s3">
              <input
                type="text"
                value={props.search}
                name="search"
                id="autocomplete-input"
                className="form-control autocomplete"
                // placeholder="type your tradie here?"
                // id="search"

                onChange={props.updateSearch.bind(props)}


              />
              <label htmlFor="autocomplete-input">What kind of tradie?</label>
              <br />
            </div>

          </div>
        </form>
      </div>
    </div>
  
  );
}

export default SearchTradieForm;
