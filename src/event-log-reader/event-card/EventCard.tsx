import React, {Component} from 'react';
import { EventReader } from '../controller/event-reader';
import { TEventItem, TEventItems } from '../types/events';
import { EventsCounter } from './EventsCounters';

interface IEventCardProps {
  date: string
}

interface IEventCardState {
  events: Map<string, number>
}

export default class EventCard extends Component<IEventCardProps, IEventCardState> {

  private count: number = 0;

  constructor(props: IEventCardProps) {
    super(props)
    this.state = {
      events: new Map()
    }
  }

  private getEventTypesCount(events: TEventItems): Map<string, number>{
    const res: Map<string, number> = new Map();
    events.forEach( item => {
      if (res.has(item.type)) {
        let cnt: number = res.get(item.type) || 0;
        res.set(item.type, ++cnt)
      } else {
        res.set(item.type, 1)
      }
    })
    return res;
  }

  private async getEvents() {
    try {
      const events:TEventItems = await EventReader.getDateEvents(this.props.date);
      //TODO получил массив объектов, теперь надо проверить их type (info/alarm/warning ...)
      // и сделать счётчики на каждый тип, а потом их значения и вывести
      console.log(events);
      this.setState({events: this.getEventTypesCount(events)})
    } catch (e) {
      this.setState({events:new Map()})
      console.log(e)
    }
    console.log(this.count++)
  }

  componentDidMount(){
    console.log(this.props.date);
    this.getEvents();
  }

  render() {
    return (
      <li className = "list-group-item d-flex justify-content-between align-items-center m-1 shadow-sm">
        {this.props.date}
        <EventsCounter events = {this.state.events} />
      </li>
    )
  }
}
/*
      <div key = {this.props.date} className='float-left'>
        <li>{this.props.date}{this.getInfo()}</li>
      </div>
*/