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
  isLoaded: boolean;
}

export default class DateCardsContainer extends Component <IDateCardsContainerProps, IDateCardsContainerState> {
  constructor(props: IDateCardsContainerProps) {
    super(props);
    this.state = {
      cards:[],
      filterEnable: false,
      isLoaded: false,
    }
  }

  private async getDatesAndEvents() {
    await ModelDates.waitForDates()
    this.setState({
      cards: [... ModelDates.Dates.keys()] as Array<string>,
      isLoaded: true
    })
  }

  componentDidMount() {
    this.getDatesAndEvents();
  }

  private handlerToolMenu(name: string, status: boolean){
  }

  render(){
    const items = this.state.cards.map((item: string, index: number) => {
      return (
      <EventCard date={item} key={index} />)
    })

    return (
      <div className='flex-column'>
        <EventsHeaderMenu
            ToolMenuHandler = {this.handlerToolMenu.bind(this)}
            isTougle = {this.state.filterEnable}
          />
          <div className='flex-all-client'>
            <b>Event log</b>
            <div className="overflow-auto h-100 b1dg">
              {this.state.isLoaded
                ? <ul className="list-group">{items}</ul>
                : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              }
            </div>
          </div>
      </div>
    )
  }
}

//<button onClick = {()=> this.getDates()}>Get Dates</button>
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