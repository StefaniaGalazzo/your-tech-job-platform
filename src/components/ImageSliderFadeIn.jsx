import { useState, useLayoutEffect } from "react";
import { useSpringRef, animated, useTransition } from "react-spring";
import dev from "../../src/assets/imgs/dev.svg";
import net from "../../src/assets/imgs/net.svg";
import diamond from "../../src/assets/imgs/diamond-code.svg";

const images = [dev, net, diamond];

export const ImageSliderFadeIn = () => {
  const [index, setIndex] = useState(0);
  const transRef = useSpringRef(); // ref all'elemento per avviare l'animazione

  const transitions = useTransition(index, {
    ref: transRef,
    keys: index,
    from: { right: "-120%" },
    enter: { right: "0" },
    leave: { right: "-120%" },
    onRest: (_springs, _ctrl, item) => {
      if (index === item) {
        setIndex(index === images.length - 1 ? 0 : index + 1);
      }
    },
    config: { duration: 800 },
    exitBeforeEnter: true,
    delay: 800,
    // onRest: () => setIndex((state) => (state + 1) % images.length),
  });

  useLayoutEffect(() => {
    transRef.start();
  }, [index]);

  return (
    <div className="slider-container">
      {transitions((style, i) => (
        <animated.img
          className="slider-icon"
          style={style}
          src={images[i]}
          alt={`image-${i}`}
          width={"400px"}
        />
      ))}
    </div>
  );
};
