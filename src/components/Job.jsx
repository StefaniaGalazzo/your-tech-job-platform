/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Job = ({ data, icon }) => (
  <Row
    className="mx-0 mt-3 p-sm-2 p-md-3 align-items-center job-card"
    style={{ border: "1px solid #00000033", borderRadius: 4 }}
  >
    <Col xs={4}>
      <Link to={`/${data.company_name}`} className="nav-link">
        {data.company_name}
      </Link>
    </Col>
    <Col xs={5}>
      <a href={data.url} target="_blank" rel="noreferrer" className="nav-link">
        {data.title}
      </a>
    </Col>
    <Col xs={1} className="text-end ms-xs-0 ms-md-auto">
      {icon}
    </Col>
  </Row>
);

export default Job;
