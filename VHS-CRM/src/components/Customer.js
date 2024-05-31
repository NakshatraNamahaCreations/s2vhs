import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Customeradd from "./Tab/Customeradd";
import Customerimport from "./Tab/Customerimport";
import Customersearch from "./Tab/Customersearch";
import Header from "./layout/Header";
import Customersend from "./Tab/Customersend";
import Customerschedule from "./Tab/Customerschedule";

function Customer() {
  return (
    <div className="row">
      <Header />

      {/* <div className="row mt-2 m-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="header-text1">B2B > Add</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row m-auto">
        <div className="col-md-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Customer Add</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Customer Search</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Import / Export Bulk</Nav.Link>
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
                    <Customeradd />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Customersearch />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Customerimport />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <Customersend />
                  </Tab.Pane>
                  <Tab.Pane eventKey="five">
                    <Customerschedule />
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

export default Customer;
