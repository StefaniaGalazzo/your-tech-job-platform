/* eslint-disable react/prop-types */
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../actions/favorite-actions";
import Job from "./Job";
import { IoAddCircle } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";

const MainSearch = ({ favorites, removeFromFavorites, addToFavorites }) => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //redux
  const isCompanyInFavorites = (company) => {
    return favorites.some((favCompany) => favCompany._id === company._id);
  };

  const handleToggleFavorites = (company) => {
    if (isCompanyInFavorites(company)) {
      removeFromFavorites(company);
    } else {
      addToFavorites(company);
    }
  };

  return (
    <Container className="mt-2 mb-5">
      <Row>
        <Col xs={10} className="mx-auto ">
          <h2 className="fs-5">Find Your Job!</h2>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((company) => (
            <div key={company._id}>
              <Job
                data={company}
                icon={
                  <Button
                    variant="primary"
                    onClick={() => handleToggleFavorites(company)}
                  >
                    {isCompanyInFavorites(company) ? (
                      <MdBookmarkAdded size={"20px"} color="white" />
                    ) : (
                      <IoAddCircle size={"20px"} color="white" />
                    )}
                  </Button>
                }
              ></Job>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  companies: state.companies,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (company) => dispatch(addToFavorites(company)),
  removeFromFavorites: (company) => dispatch(removeFromFavorites(company)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);
