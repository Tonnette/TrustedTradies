import React from "react";
import 'materialize-css';


function SearchForm(props) {
  const Submit = (e) => {
    e.preventDefault()
    props.postcodeSearch(e)
  }
  return (


    <div className="row" style={{margin: '0px'}}>
      <div className="col s12">
        <form onSubmit={Submit}>
          <div className="row" >
            <div className="input-field col s6 offset-s3" >
              <input id="input_text"
                type="text"
                value={props.search}
                data-length="4"
                // id="search"
                onChange={props.postcodeSearch.bind(props)} 
                />

              <label htmlFor="input_text">What's your postcode?</label>
              <button onClick={props.postcodeSearch.bind(props)} value="submit">Button</button>
            </div>
          </div>

        </form>




      </div>
    </div>



  );
}

export default SearchForm;
