import React, { useEffect, useState } from "react";
import "../App.css";
import zero from "../media/ghosties/0.png";
import one from "../media/ghosties/1.png";
import two from "../media/ghosties/2.png";
import three from "../media/ghosties/3.png";
import four from "../media/ghosties/4.png";
import five from "../media/ghosties/5.png";
import six from "../media/ghosties/6.png";
import seven from "../media/ghosties/7.png";
import eight from "../media/ghosties/8.png";
import nine from "../media/ghosties/9.png";
import ten from "../media/ghosties/10.png";
import eleven from "../media/ghosties/11.png";
import twelve from "../media/ghosties/12.png";
import thirteen from "../media/ghosties/13.png";

function getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
  }

const Tag = (props: any) => {

  const [randomIndex, setRandomIndex] = useState(0)
  const randomProfileArr = [zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen]

  useEffect(() => {setRandomIndex(getRandomInt(14))}, []);

  return (
    <div className="w-full">
        <svg viewBox="0 0 247 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="247" height="43" fill="transparent" fill-opacity="0.2"/>
        <clipPath id="myCircle">
            <circle cx="21.5" cy="23" r="17.5" fill="#D9D9D9"/>
        </clipPath>
        <text fill="#231F20" stroke="#231F20" stroke-width="0.2" xmlSpace="preserve" font-family="Ghost Boy Rip" font-size="20" letter-spacing="0em"><tspan x="50" y="28.95">{props.username}</tspan></text>
        <g role="button" onClick={(e) => {window.open("https://twitter.com/" + props.username, "_blank")}}>
            <rect x="167.5" y="10.5" width="74" height="22" rx="2.5" fill="white" stroke="#231F20" stroke-width="3"/>
            <text fill="#231F20" stroke="#231F20" stroke-width="0.2" xmlSpace="preserve"  font-family="Ghost Boy Rip" font-size="20" letter-spacing="0em"><tspan x="187" y="28.95">Follow</tspan></text>
        </g>
        <image width="45" height="45" xlinkHref={randomProfileArr[randomIndex]} clipPath="url(#myCircle)" />
      
        </svg>
    </div>
  );
};
export default Tag;
