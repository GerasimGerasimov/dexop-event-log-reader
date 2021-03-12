import React, {Component} from 'react';

interface IEventCardProps {
  date: string
}

interface IEventCardState {

}

export default class EventCard extends Component<IEventCardProps, IEventCardState> {

  constructor(props: IEventCardProps) {
    super(props)
  }

  render() {
    return (
      <div>
        <li>{this.props.date}</li>
      </div>
    )
  }
}