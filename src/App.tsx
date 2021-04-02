import React from 'react';
import './App.css';
import DateCardsContainer from './event-log-reader/date-cards-container/date-card-container';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import EventTablePage from './event-table/Pages/Events/event-table-page';

/*TODO в EventTablePage в заголовке вывести Дату, события которой изучаются */
/*TODO в EventTablePage так как Дата известна (в заголовке), в таблице выводить только время */
/*TODO в EventTablePage так как Дата известна (в заголовке), для фильтрации использовать только время (Time Picker) */
/*TODO в DateCardsContainer сделать фильтрацию по Датам, использовать только дату (Date Picker) */
/*TODO в DateCardsContainer сделать сортировку по Датам*/
/*TODO в DateCardsContainer сделать отображение больших списков через окно (да-да! рендер больших списков!) */
/*TODO в EventTablePage и DateCardsContainer
  При возврате со страницы EventTablePage, надо попадать на туже страницу DateCardsContainer
  с которой пришёл, без загрузки карт заново (тут через state-management и кэширование)*/
/*TODO разгрести Warnings от React */
/*TODO разгрести Warnings от TypeScript */

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
