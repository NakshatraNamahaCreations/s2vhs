import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


function LeftTabsExample() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex flex-row">
            <Nav.Item>
              <Nav.Link eventKey="first">Quotation format</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Region</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Material</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth"  >Ajob</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              {/* <Sonnet /> */}
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              {/* <Sonnet /> */}
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              {/* <Sonnet /> */}
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              {/* <Sonnet /> */}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default LeftTabsExample;