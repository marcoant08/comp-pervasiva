import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from "react-google-maps";

const Map = ({ lat, lng }) => {
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat, lng }}
        >
            <Marker
                position={{ lat, lng }}
                onClick={() => {
                    console.log("onClick()")
                }}
                icon={{
                    url: `https://lh3.googleusercontent.com/proxy/_duI4aPGKPIrpd_zztEpaXNXjoFfZqgaveLs69lGsZAoI1d5z4gUVAMxh6DIRnqQ-5MbivAyeaHuSa9jAk-YXA74VTqXlDX71rJdqhOvUR6nk8wFpOOclel-vyKZBx13FI7B0g`,
                    scaledSize: new window.google.maps.Size(50, 50)
                }}
            />
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap