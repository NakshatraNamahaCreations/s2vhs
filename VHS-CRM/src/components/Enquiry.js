import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import Header from "./layout/Header";
import Enquirynew from "./Tab/Enquirynew";
import Enquiryadd from "./Tab/Enquiryadd";
import Enquirysearch from "./Tab/Enquirysearch";

function Enquiry() {
  const data = localStorage.getItem("enquiry");
  function s() {
    localStorage.setItem("enquiry", "add");
    return;
  }
  function s1() {
    localStorage.setItem("enquiry", "new");
    return;
  }
  function s2() {
    localStorage.setItem("enquiry", "search");
    return;
  }

  return (
    <div className="row">
      <Header />

      <div className="row mt-2 m-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="header-text1">Enquiry {data}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-auto">
        <div className="col-md-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="first" onClick={s}>
                      Enquiry Add
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" onClick={s1}>
                      New
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third" onClick={s2}>
                      Enquiry Search
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Enquiryadd />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Enquirynew />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Enquirysearch />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
