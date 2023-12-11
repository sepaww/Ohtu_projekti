import { Navbar, Container } from "react-bootstrap"
import Download from "./download"

const Mainbar = () => {
    return (
      <Navbar className="bg-body-tertiary" expand="sm" > 
        <Container className="mx-1"> 
        <Navbar.Brand>
            <img
              alt=""
              src="/app_logo.png"
              width="40"
              height="40"
              className="d-inline-block align-center"
            />{'  '}
            Bibmanager By Ryhmä 2 
          </Navbar.Brand>
          <Navbar.Toggle /> 
            <Navbar.Collapse className="justify-content-end">
              <Download/>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

export default Mainbar
