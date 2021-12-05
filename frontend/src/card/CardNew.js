import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from '../utils/api';
import CardForm from './CardForm';

/**
 * 
 * @returns renders page view for Add Card route
 */
function CardNew() {
  const { deckId } = useParams();     // sets deckId from URL param
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {                 // fetches deck info from api & saves to 
    readDeck(deckId).then(setDeck); // deck state
  }, [deckId]);                     // re-renders when deckId is changed
  
  async function newCard(card) {    // onSuccess handler: creates card via api
    await createCard(deckId, card); // post call & redirects to Deck View page
    history.push(`/decks/${deckId}`); 
  }

  function cancel() {             // cancel button redirects to Deck View page
    history.push(`/decks/${deckId}`);
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home mr-1"></span>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>

      <h2>{deck.name}: Add Card</h2>

      <CardForm 
        deckName={deck.name}    // create-specific props passed to CardForm
        initialState={deck}
        onSuccess={newCard}
        onCancel={cancel}
      />
    </>
  );
};

export default CardNew;