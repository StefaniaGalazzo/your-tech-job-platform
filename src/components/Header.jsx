/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import MyNav from "./MyNav";
import { ImageSliderFadeIn } from "./ImageSliderFadeIn";

export const Header = () => {
  const phrases = [
    "Ingegnere Software",
    "Frontend Developer",
    "Data Analist",
    "Backend Developer",
  ];
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const typingInterval = setInterval(
      () => {
        setCharIndex((prevCharIndex) =>
          isDeleting ? prevCharIndex - 1 : prevCharIndex + 1
        );

        if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          clearInterval(typingInterval);
          setTimeout(() => {
            // console.log("Scrittura completa!");
            //
          }, 1000);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
          setIsDeleting(true);
          clearInterval(typingInterval);
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearInterval(typingInterval);
  }, [index, charIndex, isDeleting, phrases]);

  return (
    <>
      <MyNav />
      <Col className="container-title">
        <h3 className="animatedTitle display-3">
          {phrases[index].substring(0, charIndex)}
        </h3>
        <Row className="g-3" style={{ width: "75%", margin: "30px auto" }}>
          <p className="tag">Full Remote</p>
          <p className="tag">Perfect RAL</p>
          <p className="tag">Annual Benefit</p>
          <p className="tag">Training Course</p>
        </Row>
      </Col>
      <Col>
        <ImageSliderFadeIn />
      </Col>
    </>
  );
};
