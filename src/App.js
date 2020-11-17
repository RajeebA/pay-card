/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function MyVerticallyCenteredModal(props) {
  return (
    <div class="success-container">
      <div class="row">
        <div class="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
          <div class="icon">
            <span class="glyphicon glyphicon-ok">
              <i class="fa fa-check"></i>
            </span>
          </div>
          <h1>Success!</h1>
          <p>
            You've submit a card information.
            <br />
            <button class="btn btn-primary mt-4" onClick={props.onHide}>
              Reset
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [state, setstate] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const handleInputFocus = (e) => {
    let stateValue = { ...state };
    stateValue["focus"] = e.target.name;
    if (e.target.name === "cc_exp_mn" || e.target.name === "cc_exp_yr") {
      stateValue["focus"] = "expiry";
    }
    setstate(stateValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let stateValue = { ...state };
    stateValue[name] = value;
    if (name === "cc_exp_mn" || name === "cc_exp_yr") {
      let expiry = stateValue["expiry"].split("/");
      console.log(expiry);
      if (expiry.length <= 1) {
        stateValue["expiry"] = name === "cc_exp_mn" ? `${value}/` : `/${value}`;
      } else {
        stateValue["expiry"] =
          expiry[0] === "" || name === "cc_exp_mn"
            ? `${value}/${expiry[1]}`
            : `${expiry[0]}/${value}`;
      }
    }
    console.log(state);
    setstate(stateValue);
  };
  const fillData = () => {
    setstate({
      cvc: "123",
      expiry: "12/20",
      focus: "name",
      name: "Rajeeb A",
      number: "4242424242424242",
      cc_exp_yr: "2020",
      cc_exp_mn: "12",
    });
  };
  const Onsubmit = () => {
    let valid = true;
    let form = document.getElementById("pay_form");

    for (const field of form) {
      if (!field.checkValidity()) {
        field.classList.add("invalid");
        valid = false;
      } else {
        field.classList.remove("invalid");
      }
    }
    if (valid) {
      setModalShow(true);
    }
  };
  const Reset = () => {
    setModalShow(false);
    setstate({
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      cc_exp_yr: "",
      cc_exp_mn: "",
    });
  };
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <a id="forkMe" href="https://github.com/">
            Fork me on GitHub
          </a>
          <Col
            xs="12"
            md="12"
            sm="12"
            lg="5"
            className="m-auto mt-auto pay-card "
          >
            <div id="PaymentForm">
              <div className="col-lg-12 form-wrapper">
                <form autocomplete="off" class="form" id="pay_form">
                  <div class="form-group">
                    <label for="cc_name">Card Holder's Name</label>
                    <input
                      class="form-control"
                      id="cc_name"
                      pattern="\w+ \w+.*"
                      required="required"
                      title="First and last name"
                      type="text"
                      name="name"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      value={state.name}
                    />
                  </div>
                  <div class="form-group">
                    <label>Card Number</label>
                    <input
                      autocomplete="off"
                      class="form-control"
                      maxlength="20"
                      pattern="\d{16}"
                      required=""
                      title="Credit card number"
                      type="tel"
                      name="number"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      value={state.number}
                    />
                  </div>
                  <div class="form-group row">
                    <label class="col-md-12">Expires</label>
                    <div class="col-md-4">
                      <select
                        class="form-control"
                        size="0"
                        name="cc_exp_mn"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={state.cc_exp_mn}
                      >
                        <option>MM</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <select
                        class="form-control"
                        name="cc_exp_yr"
                        size="0"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={state.cc_exp_yr}
                      >
                        <option>YY</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <input
                        autocomplete="off"
                        class="form-control"
                        maxlength="3"
                        pattern="\d{3}"
                        placeholder="CVC"
                        required=""
                        title="Three digits on the back of your card"
                        type="text"
                        name="cvc"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={state.cvc}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-md-12">
                      <button
                        class="btn btn-default btn-lg btn-block submit"
                        type="button"
                        onClick={Onsubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="pt-5">
                <Cards
                  cvc={state.cvc}
                  expiry={state.expiry}
                  focused={state.focus}
                  name={state.name}
                  number={state.number}
                />
              </div>
              <div className="col-md-12 text-right">
                <button
                  class="btn btn-default text-white "
                  style={{ fontWeight: "bold" }}
                  onClick={fillData}
                  data-toggle="modal"
                  data-target="#success_tic"
                >
                  Test Data
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>{modalShow && <MyVerticallyCenteredModal onHide={Reset} />}</Row>
      </Container>
    </div>
  );
}

export default App;
