import { EventReader } from "../../event-log-reader/controller/event-reader";
import { delay } from "../../utils";
import { TDatesList } from "../events";

export interface IDateEventsCounters {
  events_counts_cash: Map<string, number>;
  isLoaded: boolean;
}

export class TDates {

  private isLoaded: boolean = false;
  private dates: Map<string, IDateEventsCounters> = new Map();
  private LoadTryCount: number = 0;

  constructor() {
    this.loadDataIterable();
  }

  get Dates(): Map<string, IDateEventsCounters> {
    return this.dates;
  }

  private loadedDatesToMap(dates: Array<string>): Map<string, IDateEventsCounters> {
    const res: Map<string, IDateEventsCounters> = new Map()
    dates.forEach(date => {
      let value: IDateEventsCounters = {
        events_counts_cash: new Map([['alarm', 0], ['warning', 0], ['info', 0]]),
        isLoaded: false
      }
      res.set(date, value)
    })
    return res;
  }


  public async * asyncGenerator (func: (value?:any) => Promise<void | any>) {
    let count = 0;
    while (true) {
      count ++;
      try {
        const dates = await func();
        yield {count, dates, error:''};
        break;
      } catch (e) {
        yield {count, dates: undefined, error: e.message};
      }
    }
  }

  //TODO сделать async функцию которая с переповторами дождётся данных
  
  private async loadDataIterable () {
    this.isLoaded = false;
    for await (let {count, dates, error} of this.asyncGenerator(this.loadDates.bind(this))) {
      console.log(count, dates, error);//сюда попадаю когда данные прочитаны
      if (dates) {
        this.dates = this.loadedDatesToMap(dates);
      }
      await delay(1000);
    }
    
    this.isLoaded = true;
  }

  public async loadDates(): Promise<Array<string>> {
    console.log(`Try to load Dates List: ${this.LoadTryCount++}`)
    try {
      return await EventReader.getDates() as Array<string>;
    } catch (e) {
      throw new Error(`Error: event-reader not respond: ${e.message}`);
    }
  }
}

export const ModelDates = new TDates();