import React from 'react';
import './App.css';
import DateCardsContainer from './event-log-reader/date-cards-container/date-card-container';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import EventTablePage from './event-table/Pages/Events/event-table-page';

/*TODO следить за картой с датой Now,
  если появляются новые события - добавлять их, желательно с анимацией
  чтобы было видно появление новых данных */
  /**TODO добавить слушателя на вебсокет что данные в БД обновились */
/*TODO в EventTablePage обнаружен баг сортировки времени*/
/*TODO в DateCardsContainer сделать сортировку и фильтрацию по Датам*/
/*TODO в DateCardsContainer сделать отображение больших списков через окно (да-да! рендер больших списков!) */
/*TODO в EventTablePage и DateCardsContainer
  При возврате со страницы EventTablePage, надо попадать на туже страницу DateCardsContainer
  с которой пришёл, без загрузки карт заново (тут через state-management и кэширование)*/

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
