import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck, deleteCard } from '../utils/api';
import CardPreview from '../card/CardPreview';
import DeckInfo from './DeckInfo';

/**
 * 
 * @returns renders page view for Deck View route
 */
const DeckView = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] }); 
  
  useEffect(fetchDeck, [deckId]); // re-renders deck when deckId changes
  
  function fetchDeck() {            // fetches deck info from api then saves
    readDeck(deckId).then(setDeck); // deck to state
  }

  async function deleteCardHandler(cardId) {  // card delete onClick handler: displays
    const ac = new AbortController();         // confirmation prompt. on confirm, sends
    const result = window.confirm(            // api delete call & redirects to home
      `Delete this card?\n\nYou will not be able to recover it.`
    );
    if (result) {
      await deleteCard(cardId, ac.signal).then(fetchDeck);
    };
  }

  return (
    <main className="container deck-view">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mr-1" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <DeckInfo 
        name={deck.name} 
        description={deck.description} 
        deckId={deckId} 
        deck={deck}
      />
      <CardPreview deck={deck} onCardDelete={deleteCardHandler} />
    </main>
  );
};

export default DeckView;
