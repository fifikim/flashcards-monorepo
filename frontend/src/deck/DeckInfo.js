import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck } from '../utils/api';

/**
 * @param {object} deck saved as state in parent Deck View route
 * @returns renders deck info & button bar on Deck View page
 */
const DeckInfo = ({deck}) => {
  const history = useHistory();

  async function handleDelete(event) {  // delete onClick handler: displays
    event.preventDefault();             // confirmation prompt. if confirmed, 
    const ac = new AbortController();   // sends api delete call & redirects to home
                                        
    const result = window.confirm(`Delete this deck?\n\nYou will not be able to recover it.`);
    if (result) {
      await deleteDeck(deck.id, ac.signal);
      history.push("/");
    };
  }

  return (
    <div className="mb-4">
      <h5>{deck.name}</h5>
      <p>{deck.description}</p>
      <div id="buttonRow" className="d-flex justify-content-between">
        <div>
          <Link to={`/decks/${deck.id}/edit`}>
            <button type="button" className="btn btn-secondary mr-2">
              <span className="oi oi-pencil mr-1"></span>
              Edit
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary mr-2">
              <span className="oi oi-book mr-1"></span>
              Study
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-primary mr-2">
              <span className="oi oi-plus mr-1"></span>
              Add Cards
            </button>
          </Link>
        </div>
        <div>
          <Link to="">
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              <span className="oi oi-trash"></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeckInfo;