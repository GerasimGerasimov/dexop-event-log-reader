export interface TEventItem {
  id: number;       //1
  date: string;     //'Feb 18 2021 11:06:37 GMT+0700'
  details: string;  //'{"initialValue":"input: 1 >= setValue: 1","comment":"гашение поля","todo":""}'
  tag:string;       //'U1/RAM/Blank'
  trig:string;      //'FRONT'
  type:string;      //'info'
  utime:number;     //1613621197902
}

export type TEventItems = Array<TEventItem> | Error;