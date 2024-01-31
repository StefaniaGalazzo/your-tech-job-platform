import React, { useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { clamp } from "lodash";
import swap from "lodash-move";
import { IoAddCircle } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../actions/favorite-actions";

const fn =
  (order, active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index) =>
    active && index === originalIndex
      ? {
          y: curIndex * 80 + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key) => key === "y" || key === "zIndex",
        }
      : {
          y: order.indexOf(index) * 80,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

function DraggableList({ favorites, addToFavorites, removeFromFavorites }) {
  console.log(favorites, "favorites");
  //handler favorites
  const isCompanyInFavorites = (company) => {
    return favorites.some((favCompany) => favCompany._id === company._id);
  };

  const handleToggleFavorites = (company) => {
    if (isCompanyInFavorites(company)) {
      removeFromFavorites(company);
      // Dopo la cancellazione, aggiorna l'ordine e gli stili delle molle
      const newOrder = favorites.map((_, index) => index);
      api.start(fn(newOrder));
      order.current = newOrder;
    } else {
      addToFavorites(company);
    }

    // if (isCompanyInFavorites(company)) {
    //   removeFromFavorites(company);
    // } else {
    //   addToFavorites(company);
    // }
  };
  //
  const order = useRef(favorites.map((_, index) => index));
  const [springs, api] = useSprings(favorites.length, fn(order.current));
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      favorites.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    api.start(fn(newOrder, active, originalIndex, curIndex, y));
    if (!active) order.current = newOrder;
  });
  return (
    <ListGroup className="content" style={{ height: favorites.length * 80 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
          }}
        >
          <Row style={{ userSelect: "none" }}>
            <Col>
              <h5 className="m-0">{favorites[i].company_name}</h5>
            </Col>
            <Col className="text-end ms-auto">
              <Button
                variant="primary"
                onClick={() => handleToggleFavorites(favorites[i])}
              >
                {isCompanyInFavorites(favorites[i]) ? (
                  <MdBookmarkAdded size={"20px"} color="white" />
                ) : (
                  <IoAddCircle size={"20px"} color="white" />
                )}
              </Button>
            </Col>
          </Row>
        </animated.div>
      ))}
    </ListGroup>
  );
}
const mapStateToProps = (state) => ({
  favorites: state.favorites,
});
const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (company) => dispatch(addToFavorites(company)),
  removeFromFavorites: (company) => dispatch(removeFromFavorites(company)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DraggableList);
/*
In const fn, y rappresenta la distanza verticale del movimento di trascinamento. 
La variabile curRow viene calcolata in base a questa distanza verticale e alla posizione corrente dell'elemento. 
La funzione clamp viene utilizzata per assicurarsi che il nuovo indice rientri nei limiti validi della lista di elementi (0 a favorites.length - 1). 
Questo nuovo indice rappresenta la nuova posizione dell'elemento dopo il trascinamento.

La funzione swap viene utilizzata per scambiare gli indici nell'array order.current, 
riflettendo il nuovo ordine dopo il trascinamento. 
Successivamente, la funzione fn viene utilizzata per calcolare gli stili animati in base al nuovo ordine, 
e i dati vengono applicati tramite api.start. 
La distanza tra gli elementi è gestita implicitamente dalla manipolazione dell'ordine degli elementi nella lista durante il trascinamento.

per cambiare altezza di containerDrag e contenuto, cambia il valore numerico di y nella funz fn e nello style del containerDrag

*/
