import React from "react";
import { ChangeEvent } from "react";
import "./App.css";

type Props = {
    changeHandler: (e:ChangeEvent<HTMLInputElement>)  => void;
    phone: string;
}


const AddPhone = (props: Props) => {

    return (
        <div>
         
          <input
            className="input-group-text"
            type="text"
            value={props.phone}
            onChange={props.changeHandler}
            name="phone"
            placeholder="přidat telefonní číslo"
            
            />  
        </div>
    )
}

export default AddPhone