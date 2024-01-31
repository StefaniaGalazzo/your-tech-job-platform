import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Job = ({ data, icon }) => (
  <Row
    className="mx-0 mt-3 p-3 align-items-center job-card"
    style={{ border: "1px solid #00000033", borderRadius: 4 }}
  >
    <Col xs={3}>
      <Link to={`/${data.company_name}`} className="nav-link">
        {data.company_name}
      </Link>
    </Col>
    <Col xs={6}>
      <a href={data.url} target="_blank" rel="noreferrer" className="nav-link">
        {data.title} {">>"}
      </a>
    </Col>
    <Col xs={2} className="text-end ms-auto">
      {icon}
    </Col>
  </Row>
);

export default Job;
