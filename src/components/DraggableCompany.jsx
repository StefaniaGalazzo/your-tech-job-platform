// https://codesandbox.io/p/sandbox/draggable-list-zfy9p?file=%2Fsrc%2FApp.tsx%3A26%2C1-62%2C1
import { clamp } from "lodash";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import {
  addToFavorites,
  removeFromFavorites,
} from "../actions/favorite-actions";
import { connect } from "react-redux";

function DraggableCompany({
  company,
  handleToggleFavorites,
  isCompanyInFavorites,
}) {
  return (
    <animated.div className=" job-card mx-0 mt-3 p-3 align-items-center rounded border">
      <Row style={{ userSelect: "none" }}>
        <Col>
          <h5 className="m-0">{company.company_name}</h5>
        </Col>
        <Col className="text-end ms-auto">
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
        </Col>
      </Row>
    </animated.div>
  );
}
// collego lo stato e le azioni di redux al comp
const mapStateToProps = (state) => ({
  companies: state.companies,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (company) => dispatch(addToFavorites(company)),
  removeFromFavorites: (company) => dispatch(removeFromFavorites(company)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DraggableCompany);
