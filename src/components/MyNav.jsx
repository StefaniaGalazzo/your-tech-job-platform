import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function MyNav() {
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    console.log(location.pathname, "pathname");
  }, []);
  return (
    <Navbar expand="lg" className="sticky-top myNav px-5">
      <Container fluid>
        <Link
          to={`/your-tech-job-platform`}
          className="fw-bolder fs-5 p-2 border-pink py-0 me-5"
        >
          Your Tech Job
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to={`/your-tech-job-platform`}
              className={`${
                pathname === "/your-tech-job-platform" && "active"
              }`}
            >
              <p className="mb-0 me-4"> Home</p>
            </Link>
            <Link
              to={`/your-tech-job-platform/favorites-companies`}
              className={`${
                pathname === "/your-tech-job-platform/favorites-companies"
                  ? "active"
                  : ""
              }`}
            >
              <p className="mb-0 c-pink"> Favorite Companies</p>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
