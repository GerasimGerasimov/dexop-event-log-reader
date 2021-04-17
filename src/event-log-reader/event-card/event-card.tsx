import React, {Component} from 'react';
import { EventReader } from '../controller/event-reader';
import { TEventItems } from '../../event-models/events';
import { sortMapKeyByOrder } from './event-card-helpers';
import { EEventTypes } from './event-card-types';
import { EventsCounter } from './event-counters';
import {NavLink} from 'react-router-dom';
import { voidCallback } from '../../event-models/ws/types/types';
import { IonChangeCallback, ModelDates } from '../../event-models/dates/dates-model';
import { toDateLocal } from '../../event-table/helpers/timeutils';

interface IEventCardProps {
  date: string;
}

interface IEventCardState {
  events: Map<string, number>;
  isLoaded: boolean;
}

export default class EventCard extends Component<IEventCardProps, IEventCardState> {

  private count: number = 0;
  private callback: IonChangeCallback;

  constructor(props: IEventCardProps) {
    super(props)
    this.state = {
      events: new Map([['alarm', 0], ['warning', 0], ['info', 0]]),
      isLoaded: false
    }
    this.callback = this.onChangeDBatNow.bind(this);
  }

  private isNowDate(): boolean { //2021-02-28  YYYY-MM-DD
    let res: boolean = false;
    const NowDate: string = toDateLocal(new Date());
    res = (this.props.date === NowDate)
    return res;
  }

  private getEventTypesCount(events: TEventItems): Map<string, number>{
    let tmp: Map<string, number> = new Map();
    events.forEach( item => {
      if (tmp.has(item.type)) {
        let cnt: number = tmp.get(item.type) || 0;
        tmp.set(item.type, ++cnt)
      } else {
        tmp.set(item.type, 1)
      }
    });
    const c = Object.values(EEventTypes)// [EEventTypes.ALARM, EEventTypes.WARNING, EEventTypes.INFO]);
    return sortMapKeyByOrder(tmp, c)
  }

  private async getEvents() {
    try {
      const events:TEventItems = await EventReader.getDateEvents(this.props.date);
      this.setState({
        events: this.getEventTypesCount(events),
        isLoaded: true
      })
    } catch (e) {
      this.setState({events:new Map()})
      console.log(e)
    }
    console.log(this.count++)
  }

  private onChangeDBatNow(props: any) {
    console.log('Должен изменить данные в карточке')
    this.getEvents();
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(){
    console.log(this.props.date);
    if (this.isNowDate()) {
      ModelDates.Subscribe = this.callback;
    }
  }

  componentWillUnmount() {
    ModelDates.unSubscribe(this.callback);
  }

  render() {
    const url = `/events/${this.props.date}`;
    return (
      <NavLink
        to={{
          pathname: url,
          state: {
            events: this.state.events
          }
        }}
      >
        <li className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center m-1 shadow-sm">
          {this.props.date}
          {this.state.isLoaded
            ? <EventsCounter events = {this.state.events} />
            : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          }
        </li>
      </NavLink>
    )
  }
}
//Пример спиннера при загрузке
//https://itchief.ru/examples/lab.php?topic=bootstrap&file=b4-border-spinner-in-button
