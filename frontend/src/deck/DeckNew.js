import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';
import DeckForm from './DeckForm';

/**
 * 
 * @returns renders page view for Create Deck route
 */
const DeckNew = () => {
  const history = useHistory();

  function newDeck(deck) {                      // onSuccess handler: updates  
    createDeck(deck).then((savedDeck) =>        // deck via api post call  &   
      history.push(`/decks/${savedDeck.id}`));  // redirects to Deck View page
  }

  function cancel() {
    history.push('/');  // cancel button redirects to home screen
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mr-1" />Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>

      <h1>Create Deck</h1>

      <DeckForm                    
        onCancel={cancel}         // create-specific props passed to DeckForm
        onSuccess={newDeck}
      />
    </>
  );
};

export default DeckNew;