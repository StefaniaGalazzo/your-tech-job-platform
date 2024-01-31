import { Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../actions/favorite-actions";
import MyNav from "./MyNav";
import DraggableList from "./DraggableList";

// posso importare le azioni come props grazie all'uso del connect con redux
const PageFavorite = ({ favorites, addToFavorites, removeFromFavorites }) => {
  return (
    <Col className="mx-auto">
      <MyNav />
      <Container className="mt-5 p-5">
        <h2 className="display-1 border-bottom pb-3">Favorite companies</h2>
        <div className="containerDrag">
          <DraggableList items={favorites} />
        </div>
      </Container>
    </Col>
  );
};

// collego lo stato e le azioni di redux al comp
const mapStateToProps = (state) => ({
  companies: state.companies,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (company) => dispatch(addToFavorites(company)),
  removeFromFavorites: (company) => dispatch(removeFromFavorites(company)),
});

// sintassi redux connect per l'esportazione del componente + la mappatura dello stato aggiornato e delle props
export default connect(mapStateToProps, mapDispatchToProps)(PageFavorite);
