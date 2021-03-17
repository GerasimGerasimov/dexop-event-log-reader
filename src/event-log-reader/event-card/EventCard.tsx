import React, {Component} from 'react';
import { EventReader } from '../controller/event-reader';
import { TEventItem, TEventItems } from '../types/events';

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

  private getInfo(): string {
    const res: any = Array.from(this.state.events).reduce((a,b)=>{
      console.log('a:b',b[0], b[1])
      return a+(` ${b[0]}: ${b[1]} `)
    },'')
    console.log(res)
    return res;
  }

  render() {
    return (
        <li>{this.props.date}{this.getInfo()}</li>
    )
  }
}
/*
      <div key = {this.props.date} className='float-left'>
        <li>{this.props.date}{this.getInfo()}</li>
      </div>
*/