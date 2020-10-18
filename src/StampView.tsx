import React from 'react'

type Props = {
    authorsJson: {
        nameOfSubject:string,
        ICO:string,
        street:string,
        streetNum1:string,
        city:string,
        PSC:string,
      };
    isLoaded:boolean
    phone:string
}

const StampView = (props: Props) => {


const nameOfSubject = props.authorsJson.nameOfSubject
const ICO = props.authorsJson.ICO
const street = props.authorsJson.street
const streetNum1 = props.authorsJson.streetNum1
const city = props.authorsJson.city
const PSC = props.authorsJson.PSC

    return (
        <div>
             <article
          className="stamp"
          style={props.isLoaded ? { display: "" } : { display: "none" }}
        >
          <span className="bold">{nameOfSubject}</span>
          <p>
           {street} {streetNum1}, {city} {PSC} 
          </p>
          <p>IČO: {ICO} </p>
          <p style={props.phone ? { display: "" } : { display: "none" }}>
            Tel.: {props.phone}{" "}
          </p>
        </article>
        </div>
    )
}

export default StampView
