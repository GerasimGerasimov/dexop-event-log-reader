import React from 'react';
import './App.css';
import DateCardsContainer from './event-log-reader/date-cards-container/date-card-container';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import EventTablePage from './event-table/Pages/Events/event-table-page';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/"       component={DateCardsContainer}/>
          <Route exact path="/events/:date" component={EventTablePage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
