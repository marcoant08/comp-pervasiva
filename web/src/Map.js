import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = ({ lat, lng }) => {
  return (
    <GoogleMap defaultZoom={15} defaultCenter={{ lat, lng }}>
      <Marker
        position={{ lat, lng }}
        onClick={() => {
          console.log("onClick()");
        }}
        icon={{
          url: `https://th.bing.com/th/id/R.5181d06d568b19121d0b59c6e7f67a6c?rik=VUyzgTBGUQR%2f0w&pid=ImgRaw&r=0`,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
