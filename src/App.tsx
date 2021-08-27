import React from 'react';
import './App.css';
import DateCardsContainer from './event-log-reader/date-cards-container/date-card-container';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import EventTablePage from './event-table/Pages/Events/event-table-page';

/**TODO
ВОт такая ошибка выскочила в event-logger-service, потерял связь с Tagger
Я потрогал процессор на DExS.CPU там и Аджустере стало так что тоглаю бит Blank, и одновременно с ним CLM тоглается,
а PWR вообще не тоглается. 
event-logger-service > inner: Error: Fetch Error: network timeout at: http://localhost:5004/v1/devices/                       x
xx event-logger-service >     at Function.<anonymous> (/usr/DExS/services/event-logger-service/src/http/client/controllers/devi  x
event-logger-service >     at Generator.throw (<anonymous>)                                                                   x
event-logger-service >     at rejected (/usr/DExS/services/event-logger-service/dist/http/client/controllers/device.js:6:65)  x
event-logger-service >     at runMicrotasks (<anonymous>)                                                                     x
event-logger-service >     at processTicksAndRejections (internal/process/task_queues.js:95:5)
Состояние железа не должно влиять на сервис TAggerm так у него и загнузка на 100% возрасла, а к сожалению в лог я ничего не вывожу
Возможно там проблема при преобразованиях в математике если DExS стал пургу гнать :-(
 */

/*TODO в EventTablePage обнаружен баг сортировки времени*/
/*TODO в DateCardsContainer сделать сортировку и фильтрацию по Датам*/
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
