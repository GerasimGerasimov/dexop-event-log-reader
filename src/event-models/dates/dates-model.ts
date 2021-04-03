import { EventReader } from "../../event-log-reader/controller/event-reader";
import { waitForUnErrorExecution } from "../../utils";

export interface IDateEventsCounters {
  events_counts_cash: Map<string, number>;
  isLoaded: boolean;
}

export class TDates {

  private isLoaded: boolean = false;
  private dates: Map<string, IDateEventsCounters> = new Map();
  private LoadTryCount: number = 0;

  constructor() {
    this.waitForDates();
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

  private async waitForDates() {
    this.isLoaded = false;
    const dates: Array<string> = await waitForUnErrorExecution(this.loadDates.bind(this)) as Array<string>;
    this.dates = this.loadedDatesToMap(dates); 
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