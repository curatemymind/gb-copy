import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

const NewBurgerMenu = () => {
  useEffect(() => {}, []);

  return (
    <div className="w-full">
        <svg  viewBox="0 0 201 361" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g
          id="TheArtist"
          role="button"
          onClick={(e) => {
            document.getElementById("MobileTheArtist-Anchor")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }}
        >
<rect x="1.5" y="1.5" width="158" height="39" rx="2.5" fill="white" stroke="#231F20" stroke-width="3"/>
<text fill="#231F20" stroke="#231F20" stroke-width="0.5" xmlSpace="preserve" font-family="Ghost Boy Rip" font-size="40" letter-spacing="0em"><tspan x="18" y="37.4">The Artist</tspan></text>
</g>


<g
          id="Utility"
          role="button"
          onClick={(e) => {
            document.getElementById("MobileUtility-Anchor")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }}
        >
<rect x="1.5" y="64.5" width="112" height="39" rx="2.5" fill="white" stroke="#231F20" stroke-width="3"/>
<text fill="#231F20" stroke="#231F20" stroke-width="0.5" xmlSpace="preserve" font-family="Ghost Boy Rip" font-size="40" letter-spacing="0em"><tspan x="18" y="99.4">Utility</tspan></text>
</g>


<g
          id="Art"
          role="button"
          onClick={(e) => {
            document.getElementById("MobileArt-Anchor")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }}
        >
<rect x="1.5" y="127.5" width="79" height="39" rx="2.5" fill="white" stroke="#231F20" stroke-width="3"/>
<text fill="#231F20" stroke="#231F20" stroke-width="0.5" xmlSpace="preserve" font-family="Ghost Boy Rip" font-size="40" letter-spacing="0em"><tspan x="18" y="162.4">Art</tspan></text>
</g>


<g
          id="Team"
          role="button"
          onClick={(e) => {
            document.getElementById("MobileTeam-Anchor")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }}
        >
<rect x="1.5" y="190.5" width="109" height="39" rx="2.5" fill="white" stroke="#231F20" stroke-width="3"/>
<text fill="#231F20" stroke="#231F20" stroke-width="0.5" xmlSpace="preserve" font-family="Ghost Boy Rip" font-size="40" letter-spacing="0em"><tspan x="19" y="226.4">Team</tspan></text>
</g>

<g
          id="GhostList"
          role="button"
          onClick={(e) => {
            window.open(window.location.href + "/ghostlist", "_blank");
          }}
        >
<rect x="1.5" y="255.5" width="151" height="39" rx="2.5" fill="white" stroke="#231F20" stroke-width="3"/>
<text fill="#231F20" stroke="#231F20" stroke-width="0.5" xmlSpace="preserve" font-family="Ghost Boy Rip" font-size="40" letter-spacing="0em"><tspan x="19" y="289.4">Ghost List</tspan></text>
</g>

<Link to="/createordie">
          <g id="Mint" role="button">
<rect x="1.5" y="320.5" width="198" height="39" rx="2.5" fill="#96D8EF" stroke="#231F20" stroke-width="3"/>
<text fill="#231F20" stroke="#231F20" stroke-width="0.5" xmlSpace="preserve" font-family="Ghost Boy Rip" font-size="40" letter-spacing="0em"><tspan x="19" y="354.4">Create Or Die</tspan></text>
</g>
</Link>

</svg>

   
    </div>
  );
};
export default NewBurgerMenu;
