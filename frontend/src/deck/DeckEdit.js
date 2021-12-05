import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from '../utils/api';
import DeckForm from './DeckForm';

/**
 * 
 * @returns page view for Edit Deck route
 */
function DeckEdit() {
  const history = useHistory();
  const { deckId } = useParams(); // sets deckId based on URL param
  const [deck, setDeck] = useState({ name: "", description: ""}); 
  
  useEffect(() => {
    readDeck(deckId).then(setDeck);  // fetches deck from api & saves to state
  }, [deckId]);  // re-renders each time deckId is changed

  function editDeck(updateDeck) {              // onSuccesss handler: updates  
    updateDeck(updateDeck).then((savedDeck) => // deck via api put call &  
      history.push(`/decks/${savedDeck.id}`)   // redirects to Deck View page
    );
  }

  function cancel() {   // cancel button redirects to Deck View page
    history.push(`/decks/${deckId}`); 
  }

  const child = deck.id ? (   // conditional render: renders DeckForm if state 
    <DeckForm                 // contains value of deck.id, otherwise will 
      onCancel={cancel}       // display "Loading" message
      initialFormState={deck}
      onSuccess={editDeck}    // edit-specific props passed to Deck Form 
    />
  ) : (
    <p>Loading...</p>
  )

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mr-1" />Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>
      {child}

    </>
  );
};

export default DeckEdit;