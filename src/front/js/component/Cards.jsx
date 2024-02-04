import React from "react";
import { Card } from "../../js/component/Card.jsx";


const cards = [
  {
    id: 1,
    title: "x",
    // image: image1,
    url: "#",
  },
  {
    id: 2,
    title: "x",
    // image: image2,
    url: "#",
  },
  {
    id: 3,
    title: "x",
    // image: image3,
    url: "#",
  },
];

export const Cards = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {cards.map(({ title, image, url, id }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={image} title={title} url={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

