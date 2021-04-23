import { IQueryDirection, ISearchDateRangeQuery, ISortDirection } from "../sort-conditions";
import { TDates } from "./dates-model";

export interface IDatesQuery {
  FromIndex: number;
  QueriedQuantity: number;
  SortMode: ISortDirection;
  Direction?: IQueryDirection;
  Range: ISearchDateRangeQuery;
}


export interface IDatesRespond {
  TotalItemsQuantity: number;
  ItemsBefore: number;
  ItemsAfter: number;
  ItemsInRespond: number;
  SortMode?: ISortDirection;
  Items: Array<string>;
}

export class TDatesQuery {
  private source: TDates;
  
  constructor(soure: TDates) {
    this.source = soure;
  }

  private defaultEventRespond(): IDatesRespond {
    return {
      TotalItemsQuantity: this.source.Dates.size,
      ItemsBefore: 0,
      ItemsAfter: 0,
      ItemsInRespond: 0,
      SortMode: ISortDirection.Up,
      Items: []
    }
  }

  private getSortedItems(Items: Array<string>, query: IDatesQuery): Array<string> {
    let items:Array<string> = Items;
    const SortMode: ISortDirection = query.SortMode;
    items.sort(this.sortByDate(SortMode));//
    items = this.filterByDataRange(items, query);
    return items;
  }

  public getItems(query: IDatesQuery) {
    const result: IDatesRespond = this.defaultEventRespond();
    const unSortedItems:Array<string> = [...this.source.Dates.keys()];
    const sortedItems: Array<string> = this.getSortedItems(unSortedItems, query);
    const ItemsArray: Array<string> = sortedItems.slice(query.FromIndex, query.FromIndex+query.QueriedQuantity);
    result.Items = ItemsArray;
    result.ItemsBefore = query.FromIndex;
    result.ItemsAfter = result.TotalItemsQuantity - (query.FromIndex + ItemsArray.length) ;
    result.ItemsInRespond = ItemsArray.length;
    return result;
  }

  //Если указаны ограничения по времени в полях Range, то удалить все записи не входящие в диапазон
  private filterByDataRange(source: Array<string>, query: IDatesQuery):Array<string> {
    let res: Array<string> = source;
    const {dateFrom, dateTo} = {...query.Range};
    if ((dateFrom !== undefined) && (dateTo !== undefined)) {
      res = source.filter((item)=>{
        const utime: number = new Date(item).getTime();
        return ((utime >= dateFrom) && (utime <= dateTo))
      })
    }
    return res; 
  }
  
  private sortByDate(direction: ISortDirection): any {
    return function sort(A:string, B:string): number {
        const a: number = new Date(A).getTime();
        const b: number = new Date(B).getTime();
        return  (direction === ISortDirection.Up)
                ? a-b
                : b-a
    }
  }

}