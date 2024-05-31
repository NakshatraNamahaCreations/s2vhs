// import Col from "react-bootstrap/Col";
// import Nav from "react-bootstrap/Nav";
// import Row from "react-bootstrap/Row";
// import Tab from "react-bootstrap/Tab";

import React from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Servicetype from "./Tab/Servicetype";
import Services from "./Tab/Services";
import Jobcategory from "./Tab/Jobcategory";
import City from "./Tab/City";
import Expensetype from "./Tab/Expensetype";
import Itemgroup from "./Tab/Itemgroup";
import Item from "./Tab/Item";
import Customertype from "./Tab/Customertype";
import Reference from "./Tab/Reference";
import Area from "./Tab/Area";
import Termsgroup from "./Tab/Termsgroup";
import Terms from "./Tab/Terms";
import Whatsapptemplate from "./Tab/Whatsapptemplate";
import Milesstone from "./Tab/Milesstone";
import B2Btype from "./Tab/B2Btype";
import Pregion from "./Tab/Pregion";
import Pmaterial from "./Tab/Pmaterial";
import Pjob from "./Tab/Pjob";
import Aregion from "./Tab/Aregion";
import Amaterial from "./Tab/Amaterial";
import Ajob from "./Tab/Ajob";
import Responce from "./Tab/Responce";
import Vendor from "./Vendor";
import User from "./User";
import Technician from "./Tab/Technician";
import Quotationformat from "./Tab/Quotationformat";
// import { Category } from "@mui/icons-material";
import Category from "./Tab/Category";
import Nav from "./Nav1";

function Master() {
  return (
    <div className="web">
      <Header />

      {/* <div className="row mt-2 m-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="header-text1">Master > Service Type</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row m-auto">
        <div className="col-md-12">
          <Nav />
          {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="first">User</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Vendor</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Technician</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="four">Category</Nav.Link>
                  </Nav.Item>
                
                  <Nav.Item>
                    <Nav.Link eventKey="five">Services</Nav.Link>
                  </Nav.Item>
                 
                  <Nav.Item>
                    <Nav.Link eventKey="seven">City</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="eight">Expense Type</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="nine">Customer Type</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="ten">Responce</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="eleven">Reference</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourteen">WhatsApp Template</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="fifteen">B2B Type</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="nineteen">Quotation Format</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <User />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Vendor />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Technician />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <Category />
                  </Tab.Pane>
                  <Tab.Pane eventKey="five">
                    <Services />
                  </Tab.Pane>
                
                  <Tab.Pane eventKey="seven">
                    <City />
                  </Tab.Pane>
                  <Tab.Pane eventKey="eight">
                    <Expensetype />
                  </Tab.Pane>

                  <Tab.Pane eventKey="nine">
                    <Customertype />
                  </Tab.Pane>
                  <Tab.Pane eventKey="ten">
                    <Responce />
                  </Tab.Pane>
                  <Tab.Pane eventKey="eleven">
                    <Reference />
                  </Tab.Pane>

                  <Tab.Pane eventKey="fourteen">
                    <Whatsapptemplate />
                  </Tab.Pane>

                  <Tab.Pane eventKey="fifteen">
                    <B2Btype />
                  </Tab.Pane>

               
                  <Tab.Pane eventKey="nineteen">
                    <Quotationformat />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> */}
        </div>
      </div>
    </div>
  );
}
export default Master;
