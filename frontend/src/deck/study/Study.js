import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";
import StudyPage from "./StudyPage";
import StudyNotEnoughCards from "./StudyNotEnoughCards";

/**
 * 
 * @returns saves deck & cardNum states, renders StudyPage components
 */
function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const [cardNum, setCardNum] = useState(1);
  const history = useHistory();

  useEffect(() => {                  // fetches deck info from api, 
    readDeck(deckId).then(setDeck);  // saves to deck state
  }, [deckId]);                      // re-renders when deckId changes

  const cardCount = deck.cards.length;    // retrieves total number of cards in deck
  const card = deck.cards[cardNum - 1];   // retrieves current card from deck state
  const cardHeading = `Card ${cardNum} of ${cardCount}`; // current card heading

  const nextHandler = () => {      // next button handler:
    if (cardNum === cardCount) {               // at last card in deck displays prompt 
      const confirmRestart = !window.confirm(  // to restart deck or return home
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      return confirmRestart ? setCardNum(1) : history.push("/"); 
    }                                                            
    setCardNum((prevState) => Math.min(cardCount, prevState + 1)); // if not last card
  };                                                               // updates cardNum + 1

  if (cardCount <= 2) {    // conditional render: if less than 3 cards in deck, 
    return (               // renders StudyPage with StudyNotEnoughCards component
      <StudyPage name={deck.name} deckId={deckId}>
        <StudyNotEnoughCards deckId={deckId} cardCount={cardCount} />
      </StudyPage>
    );
  }

  return (
    <StudyPage name={deck.name} deckId={deckId}>
      <StudyCard card={card} heading={cardHeading}>
        <button type="button" className="btn btn-primary" onClick={nextHandler}>
          Next
        </button>
      </StudyCard>
    </StudyPage>
  );
}

export default Study;