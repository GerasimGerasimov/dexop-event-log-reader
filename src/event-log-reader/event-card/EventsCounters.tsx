import React, {Component} from 'react'

interface IEventsCountersProps {
  events: Map<string, number>;
}

interface IEventsCountersState {

}

export class EventsCounter extends Component<IEventsCountersProps, IEventsCountersState> {
  constructor (props: IEventsCountersProps) {
    super(props)
  }

  private getInfo(): string {
    const res: any = Array.from(this.props.events).reduce((a,b)=>{
      console.log('a:b',b[0], b[1])
      return a+(` ${b[0]}: ${b[1]} `)
    },'')
    console.log(res)
    return res;
  }

  render () {
    return (
      <span className="badge badge-primary badge-pill">
        {this.getInfo()}
    </span>
    )
  }
}