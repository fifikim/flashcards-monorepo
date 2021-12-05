import React from "react";
import { Link } from "react-router-dom";

/**
 * 
 * @param {number} deckId
 * @param {string} name - name of deck 
 * @param children - StudyCard, next button
 * @returns renders nav breadcrumb and Study components
 */
function StudyPage({ deckId, name, children }) {
  return (
    <main className="container study-page">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>{name}: Study</h1>
      {children}
    </main>
  );
}

export default StudyPage;