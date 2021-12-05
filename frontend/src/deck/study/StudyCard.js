import React, { useEffect, useState } from "react";

/**
 * 
 * @param {object} card - current card in deck state in Study parent component 
 * @param {string} title - current card # of cardTotal  
 * @param children - next button
 * @returns saves card view state, renders card with appropriate buttons
 */
function StudyCard({ card = {}, heading, children }) {
  const [view, setView] = useState("front");
  const [flipped, setFlipped] = useState(false);

  const nextView = {  // used with flip handler to change view state
    front: "back",
    back: "front",
  };

  useEffect(() => {    // re-renders when card updates
    setView("front");  // sets view to card front
    setFlipped(false); // sets flipped to false
  }, [card]);

  function flipHandler() {                         // flip onClick handler:
    setView((prevState) => nextView[prevState]);   // updates view state
    setFlipped(true);                              // updates flipped state
  }
  
  // return contains conditional render: if (flipped) renders next button child
  return (
    <div className={`card ${view} study-card`}>
      <div className="card-body">
        <h5 className="card-heading">{heading}</h5>
        <p className="card-text">{card[view]}</p>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={flipHandler}
        >
          Flip
        </button>
        {flipped && children}  
      </div>
    </div>
  );
}

export default StudyCard;
