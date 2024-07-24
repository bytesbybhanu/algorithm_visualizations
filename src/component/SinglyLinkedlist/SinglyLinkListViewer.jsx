import React from "react";
import Circle from "./Circle";
import Image from "./Image";
import "../../styles/SinglyLinkedListViewer.css"; // Import the CSS file

function SinglyLinkListViewer({ heightInPercent, arr }) {
  return (
    <div className="LinkListContainer">
      {arr.map((e, i) => (
        <React.Fragment key={`item-${i}`}>
          <Circle key={`circle-singly-${i}`} element={e} length={arr.length} />
          <Image key={`img-singly-${i}`} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default SinglyLinkListViewer;
