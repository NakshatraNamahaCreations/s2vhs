import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import React from "react";

import Header from "./layout/Header";
import Quotedetails from "./Tab/Quotedetails"
import Quotecategory from "./Tab/Quotecategory";


function Quote() {
  return (
    <div className="row">
      <Header />

      <div className="row mt-2 m-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="header-text1">Master Service Type</div>
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
                    <Nav.Link eventKey="first">
                      Category Selection Option
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Search</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Quotecategory />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Quotedetails />
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
export default Quote;
