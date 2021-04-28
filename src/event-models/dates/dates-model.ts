import { EventReader } from "../../event-log-reader/controller/event-reader";
import { waitForUnErrorExecution } from "../../utils";
import { WSInformer } from "../ws/client";

/**TODO найти способ убрать хард-код */
const url = 'ws://localhost:5007' 

export interface IDateEventsCounters {
  events_counts_cash: Map<string, number>;
  isLoaded: boolean;
}

export interface IonChangeCallback {
  (props: any): any;
}

export class TDates {

  private dates: Map<string, IDateEventsCounters> = new Map();
  private LoadTryCount: number = 0;
  private onLoaded: IonChangeCallback = (payload:any)=>{};
  private subscribers: Set<IonChangeCallback> = new Set();
  private isLoaded: boolean = false;

  constructor() {
   
  }

  public init() {
    WSInformer.init(url, this.onDBIsChangedAtNow.bind(this))
    this.waitForServiceRespond();
  }

  get isDataLoaded(): boolean {
    return this.isLoaded;
  }

  public pushData(data: string): boolean {
    if (this.dates.has(data)) { return false};
    this.dates.set(data, {
        events_counts_cash: new Map([['alarm', 0], ['warning', 0], ['info', 0]]),
        isLoaded: false
      });
    return true
  }

  public set dataLoadedCallBack(func: IonChangeCallback) {
    this.onLoaded = func;
  }

  public set Subscribe(func: IonChangeCallback) {
    console.log('Subscribed');
    this.subscribers.add(func)
  }

  public unSubscribe(func: IonChangeCallback) {
    console.log('unSubscribed:',this.subscribers.delete(func));
  }

  private notifySubscribers() {
    this.subscribers.forEach( func => {
      func('notifySubscribers')
    })
  }

  //"cmd":"dbchanged"
  private onDBIsChangedAtNow(msg: {cmd: string, payload: string}){
    const cmd: string = msg.cmd || '';
    if (cmd === "dbchanged") {
      this.notifySubscribers()
    }
  }

  get Dates(): Map<string, IDateEventsCounters> {
    return this.dates;
  }

  private loadedDatesToMap(dates: Array<string>): Map<string, IDateEventsCounters> {
    const res: Map<string, IDateEventsCounters> = new Map();

    dates
    .sort((a:any, b:any) => { a = new Date(a); b = new Date(b); return b - a})
    .forEach(date => {
      let value: IDateEventsCounters = {
        events_counts_cash: new Map([['alarm', 0], ['warning', 0], ['info', 0]]),
        isLoaded: false
      }
      res.set(date, value)
    })
    return res;
  }

  public async waitForServiceRespond() {
    this.isLoaded = false;
    const dates: Array<string> = await waitForUnErrorExecution(this.loadDates.bind(this)) as Array<string>;
    this.dates = this.loadedDatesToMap(dates);
    this.isLoaded = true;
    this.onLoaded({dates: this.dates})
  }


  private async loadDates(): Promise<Array<string>> {
    console.log(`Try to load Dates List: ${this.LoadTryCount++}`)
    try {
      return await EventReader.getDates() as Array<string>;
    } catch (e) {
      throw new Error(`Error: event-reader not respond: ${e.message}`);
    }
  }
}

export const ModelDates = new TDates();