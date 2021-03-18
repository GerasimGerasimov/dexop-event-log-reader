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

  private getIconStyle(event_type: string): {color: string, icon: string} {
    const icons: {[index: string]: any} = {
      'alarm': {color:'red', icon:'⬥'},
      'warning': {color:'#ffba00', icon:'∎'},
      'info': {color:'#8000C0', icon:'▲'},
      'defaulf': ()=>{
        console.log(`${event_type} not found`);
        return {color:'gray', icon:'?'};
      }
    }
    return (icons[event_type] || icons['default'])
  }

  private getIconElement(event_type: string): JSX.Element {
    const {color, icon} = {... this.getIconStyle(event_type)}
    return (
      <span className="" style={{ color }}>{icon}</span>
    )
  }
  
  render () {
    const items = Array.from(this.props.events).map((item) => {
      return (
        <div className='d-inline badge badge-pill badge-primary'>
          {this.getIconElement(item[0])}
          <span className="badge badge-primary badge-pill">{item[1]}</span>
        </div>
      )
    })

    return (
      <div>{items}</div>
    )
  }
}

/*
    if (mode === IEventSortMode.Alarm)   { return '⬥'}; "red" 
    if (mode === IEventSortMode.Warning) { return '∎'}; "#ffba00"
    if (mode === IEventSortMode.Info)    { return '▲'}; "#8000C0"
*/