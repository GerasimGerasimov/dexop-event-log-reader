import React, {Component} from "react";
import { EventReader } from "../controller/event-reader";
import EventsHeaderMenu from "../header-menu/EventsHeaderMenu";
import '../Events.css'
import EventCard from "../event-card/EventCard";

interface IDateCardsContainerProps {

}

interface IDateCardsContainerState {
  cards: Array<string>;
  filterEnable: boolean;
}

type TGetDates = Array<string> | Error;

export default class DateCardsContainer extends Component <IDateCardsContainerProps, IDateCardsContainerState> {
  private count: number = 0;
  constructor(props: IDateCardsContainerProps) {
    super(props);
    this.state = {
      cards:[],
      filterEnable: false
    }
  }

  private async getDates() {
    try {
      const cards:TGetDates = await EventReader.getDates();
      this.setState({cards: cards as Array<string>})
      console.log(cards);
    } catch (e) {
      console.log(e)
    }
    console.log(this.count++)
  }

  /*TODO после загрузки дат карточек, запустить процесс чтения данных
  для этих карточек, и вывести скокот каких событий случалось в карточке,
  (тип события):(кол-во событий этого типа)*/

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
      return (<EventCard date={item}/>)
    })

    return (
      <div className='flex-column'>
        <EventsHeaderMenu
            ToolMenuHandler = {this.handlerToolMenu.bind(this)}
            isTougle = {this.state.filterEnable}
          />
          <div className='flex-all-client b1pxdgr'>
            <p> DateCardsContainer </p>
            <button onClick = {()=> this.getDates()}>Get Dates</button>
            <div>
              <ul className="list-group">{items}</ul>
            </div>
          </div>
      </div>
    )
  }
}