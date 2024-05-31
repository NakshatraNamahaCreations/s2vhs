import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import React from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import B2badd from "./Tab/B2badd";
import Importexport from "./Tab/Importexport";
import B2bsearch from "./Tab/B2bsearch";
import B2btemplate from "./Tab/B2btemplate";
import B2bschedule from "./Tab/B2bschedule";

function B2B() {


  
  return (
    <div className="row">
      <Header />

     

      <div className="row m-auto">
        <div className="col-md-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="first">B2B Add</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Import / Export Bulk</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">B2B Search</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="four">Send Template</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="five">
                      Todays Scheduled Templates
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <B2badd />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Importexport />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <B2bsearch />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <B2btemplate />
                  </Tab.Pane>
                  <Tab.Pane eventKey="five">
                    <B2bschedule />
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

export default B2B;
