import { TEventItem } from "../../event-helpers/types/events";

export interface ISearchRangeQuery {
  dateFrom?: number;
  dateTo?: number;
  event?: IEventSortMode;
}

export enum IEventSortMode {
  All     = '',
  Alarm   = 'a',
  Warning = 'w',
  Info    = 'i'
}

export enum IEventQueryDirection {
  Prev,
  Next
}

export enum ISortDirection {
  Up,
  Down
}

export interface IEventsSortMode {
  DateTimeSortDirection: ISortDirection;
  EventsSortMode: IEventSortMode;
}

export interface IEventsQuery {
  ClientID?: string; //уникальный ID клиента
  SortMode: IEventsSortMode;//как сортировать данные для этого клиента
  FromIndex: number;
  QueriedQuantity: number;
  Direction?: IEventQueryDirection;
  Range?: ISearchRangeQuery;
}

export interface IEventsRespond {
  ClientID?: string; //уникальный ID клиента
  DateTime?: string; //время отправки данных сервером
  TotalItemsQuantity: number;
  ItemsBefore: number;
  ItemsAfter: number;
  ItemsInRespond: number;
  SortMode?: IEventsSortMode;//как были отсортировваны данные
  Items: Array<TEventItem>;
}