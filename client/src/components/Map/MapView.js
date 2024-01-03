import React from "react";
import MapPageSearchBar from "components/SearchBar/MapPageSearchBar";
import Nav from "components/Nav/Nav";
import KakaoMap from "./KakaoMap";
import "./MapView.scss";

const MapView = () => {
  return (
    <>
      <Nav />
      <article className="mapPage__area">
        <section className="mapPage__header">
          <MapPageSearchBar />
        </section>
        <section className="mapView__area">
          <div className="mapView__map">
            <KakaoMap />
          </div>
        </section>
      </article>
    </>
  );
};

export default MapView;
