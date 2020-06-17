import React from "react";
import Loader from 'react-loader-spinner';

export default function Spinner() {

        return(
            <Loader
                type="ThreeDots"
                color="#43425D"
                height={80}
                width={80}
                timeout={3000} //3 secs

            />
        );
}