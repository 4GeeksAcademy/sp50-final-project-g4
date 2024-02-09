import React from "react";
import { Card } from "../../js/component/Card.jsx";


const cards = [
  {
    id: 1,
    title: "Notificaciones",
    //image: image1,
    url: "https://cdn.pixabay.com/photo/2016/11/28/10/48/child-1864718_1280.jpg",
  },
  {
    id: 2,
    title: "Notas",
    //image: image2,
    url: "https://cdn.pixabay.com/photo/2016/11/28/10/48/child-1864718_1280.jpg",
  },
  {
    id: 3,
    title: "Notificaciones Globales",
    //image: image3,
    url: "https://cdn.pixabay.com/photo/2016/11/28/10/48/child-1864718_1280.jpg#",
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