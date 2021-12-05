import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from '../home';
import NotFound from "./NotFound";
import CardNew from "../card/CardNew";
import Study from "../deck/study/Study";
import DeckNew from "../deck/DeckNew";
import DeckView from "../deck/DeckView";
import CardEdit from "../card/CardEdit";
import DeckEdit from "../deck/DeckEdit";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <DeckNew />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardNew />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route exact={true} path="/decks">
            <Redirect to="/" />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;