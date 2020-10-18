import React, { ChangeEvent, FormEvent } from "react";
import "./App.css";
import axios from "axios";
import AddPhone from "./AddPhone";
import StampView from "./StampView";

type Props = {
  value: string;
  authors: any[];
  authorsJson: {
    nameOfSubject: string;
    ICO: string;
    street: string;
    streetNum1: string;
    city: string;
    PSC: string;
  };
  phone: string;
  isLoaded: boolean;
  dataOk: boolean;
  ICONumber: string;
  noFound: boolean;
};

class Form extends React.Component<{}, Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authors: [],
      authorsJson: {
        nameOfSubject: "",
        ICO: "",
        street: "",
        streetNum1: "",
        city: "",
        PSC: "",
      },
      phone: "",
      isLoaded: false,
      dataOk: false,
      ICONumber: "",
      value: "",
      noFound: false,
    };
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.value.length === 8) {
      this.setState({ ICONumber: this.state.value });
      setTimeout(() => {
        axios
          .get(
            `http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_res.cgi?ico=${encodeURI(
              this.state.ICONumber
            )}`,
            {}
          )
          .then((response) => {
            this.setState({ authors: response.data });
            const convert = require("xml-js");
            let xml = this.state.authors;
            let options = {
              compact: true,
              elementNameFn: (val: String) => {
                return val.replace("are:", "");
              },
            };
            var result = convert.xml2json(xml, options);
            let obj = JSON.parse(result);
            console.log(result);
            let dataOne = obj.Ares_odpovedi.Odpoved["D:PZA"]._text;


            this.setState({
              isLoaded: dataOne === "1",
              noFound: dataOne === "0",

             authorsJson: {
                nameOfSubject: dataOne === "1"  && obj.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:ZAU"]["D:OF"]._text ,
                ICO: dataOne === "1"  && obj.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:ZAU"]["D:ICO"]._text,
                street: dataOne === "1"  && obj.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:NU"]._text,
                streetNum1:dataOne === "1"  &&  obj.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:CD"]._text,
                city: dataOne === "1"  && obj.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:N"]._text,
                PSC: dataOne === "1"  && obj.Ares_odpovedi.Odpoved["D:Vypis_RES"]["D:SI"]["D:PSC"]._text,
              },
              
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 1000);
    }
  };

  changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    });
  };

  changePhoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      phone: e.target.value,
    });
  };
  render() {
    const { authorsJson } = this.state;
    const { isLoaded } = this.state;
    const { noFound } = this.state;
    const { dataOk } = this.state;
    console.log("isLoaded " + isLoaded);
    console.log("noFound " + noFound);
    console.log("data ok " + dataOk);

    return (
      <div className="App-header">
        <p style={this.state.isLoaded ? { display: "none" } : { display: "" }}>
          {" "}
          Zadejde Vaše Ičo pro vyhotovení návrhu razítka
        </p>

        <p
          className="notFound"
          style={this.state.noFound ? { display: "" } : { display: "none" }}
        >
          Subjekt podle zadaného čísla nebyl nalezen
        </p>
        <StampView
          authorsJson={authorsJson}
          isLoaded={isLoaded}
          phone={this.state.phone}
        />

        <form className="input-form" onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Vaše IČO:
              </span>
            </div>
            <input
              id="basic-addon1"
              onChange={this.changeHandler}
              type="text"
              name="value"
              aria-describedby="basic-addon1"
              aria-label="Username"
            />{" "}
            <div className="input-group-prepend" id="button-addon3">
              <button
                onClick={() => this.handleSubmit}
                className="btn btn-outline-secondary"
                name="ICONumber"
                type="submit"
              >
                Vyhotovit návrh
              </button>
            </div>
            <button
              style={
                this.state.isLoaded ? { display: "" } : { display: "none" }
              }
              type="button"
              className="btn btn-success"
            >
              Objednat
            </button>
          </div>
        </form>
        <AddPhone
          changeHandler={this.changePhoneHandler}
          phone={this.state.phone}
        />
      </div>
    );
  }
}
export default Form;
