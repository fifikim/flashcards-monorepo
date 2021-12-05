import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from '../utils/api';
import CardForm from './CardForm';

/**
 * 
 * @returns page view for Edit Card route
 */
function CardEdit(){
  const history = useHistory();
  const { deckId, cardId } = useParams(); // sets cardId & deckId based on URL params

  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    readDeck(deckId).then(setDeck);  // fetches deck and card info from api 
    readCard(cardId).then(setCard);  // & saves to respective state
  }, [deckId, cardId]);              // re-renders when deckId or cardId changes

  async function editCard(card) {         // onSuccess handler: updates card
    await updateCard(card);               // via api put call & redirects to 
    history.push(`/decks/${deck.id}`);    // Deck View page
  }

  function cancel() {            // cancel button redirects to Deck View page
    history.push(`/decks/${deck.id}`);
  }

  const child = card.id ? (     // conditional render: renders CardForm if 
    <CardForm                   // state contains value of card.id, otherwise  
      onSuccess={editCard}      // will display "Loading" message
      deckName={deck.name}      // edit-specific props passed to CardForm 
      initialState={card}
      onCancel={cancel}
      doneButtonLabel="Cancel"
    />
  ) : (
    <p>Loading...</p>
  );
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      {child}
    </>
  );
}

export default CardEdit;