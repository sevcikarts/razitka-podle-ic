import React from "react";
import "./App.css";
import axios from "axios";
import FormForm from "./AddPhone.js";


class Form extends React.Component {
    constructor() {
      super();
      this.state = {
        authors: [],
        authorsJson: [],
        phone:"",
      isLoaded: false,
        dataOk: false,
        ICONumber: "",
        value: "",
        noFound: false,
      };
    }
  
  handleSubmit = (e) =>{
    e.preventDefault();
    if (this.state.value.length===8 ){
    this.setState({ICONumber: this.state.value}) 
    setTimeout(() => {
    axios
        .get(`http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_res.cgi?ico=${encodeURI(this.state.ICONumber)}`, {
          "Content-Type": "application/xml; charset=utf-8",
        })
        .then( (response) =>{
          
          this.setState({ authors: response.data });
          const convert = require("xml-js");
          let xml = this.state.authors;
          let options = {
            compact: true,
            elementNameFn:  (val) =>{
              return val.replace("are:", "");
            },
          };
          var result = convert.xml2json(xml, options);   
          let obj = JSON.parse(result);
           console.log(result)
          let dataOne = obj.Ares_odpovedi.Odpoved["D:PZA"]._text
  
          this.setState({  
           authorsJson: obj,
            isLoaded: dataOne==="1",
            noFound: dataOne==="0",
            });
        })
        .catch(function (error) {
          console.log(error);
        }); }, 1000);}

        
  }
  
  changeHandler = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  
  
  
    render() {
      const { authorsJson } = this.state;
      const { isLoaded } = this.state;
      const { noFound } = this.state;
      const { dataOk } = this.state;
      console.log("isLoaded "+isLoaded);
      console.log("noFound "+noFound);
      console.log("data ok "+ dataOk );
  
      const nameOfSubject =
        this.state.isLoaded &&
        authorsJson.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:ZAU"]["D:OF"]._text;
      const ICO =
        this.state.isLoaded &&
        authorsJson.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:ZAU"]["D:ICO"]._text;
      const street =
        this.state.isLoaded &&
        authorsJson.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:NU"]._text;
      const streetNum1 =
        this.state.isLoaded &&
        authorsJson.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:CD"]._text;
      const city =
        this.state.isLoaded &&
        authorsJson.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:N"]._text;
      const PSC =
        this.state.isLoaded &&
        authorsJson.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:PSC"]._text;
  
      return (




        
        <div className="App-header">
         <p style={this.state.isLoaded ?{display:"none"}:{display:""}}> Zadejde Vaše Ičo pro vyhotovení návrhu razítka</p>
  
  
         <p className="notFound" style={this.state.noFound ? {display:""}:{display:"none"}}>Subjekt podle zadaného čísla nebyl nalezen</p>
  
          <article className="stamp" style={this.state.isLoaded ?{display:""}:{display:"none"}}>
          
            <span className="bold">
          {nameOfSubject}</span>
            <p>
              {street} {streetNum1}, {city} {PSC}{" "}
            </p>
            <p>IČO: {ICO} </p>
            <p style={this.state.phone ?{display:""}:{display:"none"}}>Tel.: {this.state.phone} </p>
          </article>
          <form className="input-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
          <div className="input-group-prepend">
      <span className="input-group-text" id="inputGroup-sizing-default">Vaše IČO:</span>
    </div>
   <input
            id="basic-addon1"
            onChange={this.changeHandler}
            type="text"
            name="value"
            aria-describedby="basic-addon1"
            aria-label="Username"
            />  <div className="input-group-prepend" id="button-addon3">
      <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit}>Vyhotovit návrh</button>
      
    </div>
    <button style={this.state.isLoaded ?{display:""}:{display:"none"}}  type="button" className="btn btn-success">Objednat</button>

</div>
      
       <FormForm changeHandler={this.changeHandler} phone={this.state.phone}/>
     
          </form>
          
        </div>
      );
    }
  }
  export default Form;
  