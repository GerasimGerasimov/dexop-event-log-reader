import React, {Component} from "react";
import { EventReader } from "../controller/event-reader";
import EventsHeaderMenu from "../header-menu/EventsHeaderMenu";
import '../Events.css'
import EventCard from "../event-card/event-card";
import { TDatesList } from "../../event-models/events";
import { ModelDates } from "../../event-models/dates/dates-model";

interface IDateCardsContainerProps {

}

interface IDateCardsContainerState {
  cards: Array<string>;
  filterEnable: boolean;
}

export default class DateCardsContainer extends Component <IDateCardsContainerProps, IDateCardsContainerState> {
  private count: number = 0;
  private dates: Map<string, any> = new Map();
  constructor(props: IDateCardsContainerProps) {
    super(props);
    this.state = {
      cards:[],
      filterEnable: false
    }
    this.dates = ModelDates.Dates;
  }

  private async getDates() {
    try {
      const cards:TDatesList = await EventReader.getDates();
      this.setState({cards: cards as Array<string>})
      console.log(cards);
    } catch (e) {
      console.log(e)
    }
    console.log(this.count++)
  }

  private handlerToolMenu(name: string, status: boolean){
    /*const handlers: {[handlerName: string]: any} = {
      'Search' : this.tougleFilter.bind(this),
      'default'   : ()=>{console.log(`${name} not found`)}
    }
    return (handlers[name] || handlers['default'])(status)
    */
  }

  render(){
    const items = this.state.cards.map((item: string, index: number) => {
      return (
      <EventCard
        date={item} key={`${item}-${index}`}
      />)
    })

    return (
      <div className='flex-column'>
        <EventsHeaderMenu
            ToolMenuHandler = {this.handlerToolMenu.bind(this)}
            isTougle = {this.state.filterEnable}
          />
          <div className='flex-all-client'>
            <p> DateCardsContainer </p>
            <button onClick = {()=> this.getDates()}>Get Dates</button>
            <div className="overflow-auto h-100 b1dg">
              <ul className="list-group">{items}</ul>
            </div>
          </div>
      </div>
    )
  }
}

/**TODO
 * Виртуальный скролл больших таблиц на React
 * https://www.youtube.com/watch?v=D7EphjNEDI4
 * 
 * Динамическая пагинация на React JS. Подгрузка при скролле страницы React JS
 * https://www.youtube.com/watch?v=J2MWOhV8T6o
 * 
 * исп. готовые компоненты:
 * React.JS: создание огромных списков
 * https://www.youtube.com/watch?v=wIOygRAoAdA
 */