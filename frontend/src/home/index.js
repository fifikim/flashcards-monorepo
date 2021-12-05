import React from 'react';
import { Link } from 'react-router-dom';
import DeckPreview from './DeckPreview';

/**
 * 
 * @returns renders create deck button & DeckPreview component on Home page 
 */
const Home = () => {
    return (
        <>  
            <Link to="/decks/new" className="btn btn-secondary">
                <span className="oi oi-plus" /> Create Deck         
            </Link>
            <div className="Home container">
                <DeckPreview />
            </div>
        </>
    )
}

export default Home;