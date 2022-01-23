import React from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import Highlight from "./Highlight";

export default function CarouselCard() {
  return (
    <>
      <Carousel show={3.5} slide={3} swiping={true}>
        <Highlight color="#2d66c3">We love Web 🌐</Highlight>
        <Highlight color="#f44336">We love Developers 👩🏻‍</Highlight>
        <a target="_blank" href="https://github.com/trendyol/">
          <Highlight color="#d53f8c">This is our github</Highlight>
        </a>
        <a target="_blank" href="https://trendyol.com/">
          <Highlight color="#f27a1a">This is our website</Highlight>
        </a>
      </Carousel>
    </>
  );
}
