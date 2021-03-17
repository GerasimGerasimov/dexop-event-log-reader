import React, {Component} from 'react';
import { EventReader } from '../controller/event-reader';

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

  private async getEvents() {
    try {
      const events:any = await EventReader.getDateEvents(this.props.date);
      this.setState({events})
      console.log(events);
    } catch (e) {
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