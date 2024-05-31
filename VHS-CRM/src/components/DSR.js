import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import React from "react";
import Header from "./layout/Header";
import Etoday from "./Tab/Etoday";
import Etommorow from "./Tab/Etommorow";
import Eyesterday from "./Tab/Eyesterday";
import Ethisweek from "./Tab/Ethisweek";
import Elastweek from "./Tab/Elastweek";
import Enextweek from "./Tab/Enextweek";
import Econfirmed from "./Tab/Econfirmed";
import Ethismonth from "./Tab/Ethismonth";
import Ecallletter from "./Tab/Ecallletter";
import Enotintrested from "./Tab/Enotintrested";
import Esend from "./Tab/Esend";
import Etemplate from "./Tab/Etemplate";
import DSRcategory from "./Tab/DSRcategory";
import DSRtoday from "./Tab/DSRtoday";
import DSRtommorow from "./Tab/DSRtommorow";
import DSRyesderday from "./Tab/DSRyesderday";
import DSRsearch from "./Tab/DSRsearch";

function DSR() {

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
                    <Nav.Link eventKey="second">Today</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Tomorrow</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="four">Yesterday</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="five">Search</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <DSRcategory />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <DSRtoday />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <DSRtommorow />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <DSRyesderday />
                  </Tab.Pane>
                  <Tab.Pane eventKey="five">
                    <DSRsearch />
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

export default DSR;
