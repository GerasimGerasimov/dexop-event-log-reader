import React, {Component} from 'react';
import { EventReader } from '../controller/event-reader';
import { TEventItem, TEventItems } from '../types/events';

interface IEventCardProps {
  date: string
}

interface IEventCardState {
  events: any;
}

export default class EventCard extends Component<IEventCardProps, IEventCardState> {

  private count: number = 0;

  constructor(props: IEventCardProps) {
    super(props)
    this.state = {
      events: {}
    }
  }

  private getEventTypesCount(events: Array<TEventItem>){

  }

  private async getEvents() {
    try {
      const events:TEventItems = await EventReader.getDateEvents(this.props.date);
      this.setState({events})
      //TODO получил массив объектов, теперь надо проверить их type (info/alarm/warning ...)
      // и сделать счётчики на каждый тип, а потом их значения и вывести
      console.log(events);
    } catch (e) {
      this.setState({events:{}})
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
      <div key = {this.props.date}>
        <li>{this.props.date}</li>
      </div>
    )
  }
}