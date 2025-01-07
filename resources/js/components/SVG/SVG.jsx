import "./style.css";
import React, { useEffect, useRef } from "react";
import Str from "@/utilities/Str";
import useSWR from "swr";

const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetch');
    return response.text();
};

const SVG = (props) => {
    const { url, className, color, ...attrs } = props;
    const { data } = useSWR(url, fetcher);
    const SVGRef = useRef(null);

    useEffect(() => {
        if(!data && !SVGRef.current) return;

        SVGRef.current.innerHTML = data;
        const SVGElmnt = SVGRef.current.querySelector('svg');
        if(SVGElmnt && color) SVGElmnt.setAttribute('fill', color);
    }, [data, color]);

    return (
        <div
            {...attrs}
            className={Str.joinClassName("svg-component", className)}
            ref={SVGRef}
        />
    );
};

export default SVG;
