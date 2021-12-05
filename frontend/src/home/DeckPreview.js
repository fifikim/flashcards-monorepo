import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

/**
 * 
 * @returns renders preview of each deck on Home page 
 */
const DeckPreview = () => {
  const [decks, setDecks] = useState([]);
  useEffect(loadDecks, []);               // calls loadDecks when home page loads

  function loadDecks() {                  // fetches decks from api then saves
    listDecks().then(setDecks);           // decks to state
  }

  function deleteHandler(deckId) {
    const confirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirmed) {                      // deck delete onClick handler: displays
      deleteDeck(deckId).then(loadDecks); // confirmation prompt. on confirm, sends
    };                                    // api delete call & redirects to home
  }

  const list = decks.map((deck) => (    // maps each deck in decks to jsx render
    <div
      key={deck.id}
      className="col-12 col-md-6 my-2 align-self-stretch"
    >
      <article className="border rounded p-4 h-100">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{deck.name}</h5>
          <small>{deck.cards.length} cards</small>
        </div>
        <p className="mb-1">{deck.description}</p>
        <Link
          to={`/decks/${deck.id}`}
          className="btn btn-secondary mr-2"
          title="Edit deck"
        >
          <span className="oi oi-eye" /> View
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          className="btn btn-primary"
          title="Study deck"
        >
          <span className="oi oi-book" /> Study
        </Link>
        <button
          className="btn btn-danger float-right"
          title="Delete deck"
          onClick={() => deleteHandler(deck.id)}
        >
          <span className="oi oi-trash" />
        </button>
      </article>
    </div>
  ));

  return (
    <>
      <div className="row mt-2 deck-list">{list}</div>
    </>
  );
}

export default DeckPreview;