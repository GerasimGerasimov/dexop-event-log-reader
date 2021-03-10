import React, {Component} from "react";
import { EventReader } from "../controller/event-reader";

interface IDateCardsContainerProps {

}

interface IDateCardsContainerState {

}

type TGetDates = Array<string> | Error;

export default class DateCardsContainer extends Component <IDateCardsContainerProps, IDateCardsContainerState> {
  private count: number = 0;
  constructor(props: IDateCardsContainerProps) {
    super(props)
  }

  private async getDates() {
    try {
      const dates:TGetDates = await EventReader.getDates();
      console.log(dates);
    } catch (e) {
      console.log(e)
    }
    console.log(this.count++)
  }

  render(){
    return (
      <div>
        <p> DateCardsContainer </p>
        <button onClick = {()=> this.getDates()}>Get Dates</button>
      </div>
    )
  }
}