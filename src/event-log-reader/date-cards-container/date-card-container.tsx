import React, {Component} from "react";
import { EventReader } from "../controller/event-reader";

interface IDateCardsContainerProps {

}

interface IDateCardsContainerState {
  cards: Array<string>
}

type TGetDates = Array<string> | Error;

export default class DateCardsContainer extends Component <IDateCardsContainerProps, IDateCardsContainerState> {
  private count: number = 0;
  constructor(props: IDateCardsContainerProps) {
    super(props);
    this.state = {
      cards:[]
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

  render(){
    const items = this.state.cards.map((item: string, index: number) => {
      return `${index} : ${item}`
    })
    return (
      <div>
        <p> DateCardsContainer </p>
        <button onClick = {()=> this.getDates()}>Get Dates</button>
        <ul>{items}</ul>
      </div>
    )
  }
}