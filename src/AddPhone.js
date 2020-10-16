import React from "react";
import "./App.css";


const AddPhone = (props) => {

    

    return (
        <div>
         
          <input
            className="input-group-text"
            onChange={props.changeHandler}
            type="text"
            name="phone"
            placeholder="přidat telefonní číslo"
            value={props.phone}
            />  
        </div>
    )
}

export default AddPhone