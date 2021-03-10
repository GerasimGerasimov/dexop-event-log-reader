const event_log_reader = 'http://localhost:5008/';
const event_log_reader_dates = `${event_log_reader}v1/dates/`;
const event_log_reader_events = `${event_log_reader}v1/events/`;

export class TEventReader {
  
  constructor(){

  }

  public async getDates(): Promise<Array<string>  | Error > {
    //const res: Array<string> = []
    //return res;
      try {
        const header: any = {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type':'application/json; charset=utf-8',
            }
        }
        return await fetch(event_log_reader_dates, header)
            .then (this.handledHTTPResponse)
            .then (this.validationJSON);
      } catch(e) {
        //console.log(e);
        throw new Error (`Fetch Error: ${e.message}`);
      }
  }

  public async getDateEvents(date: string): Promise<Array<string | Error >> {
    const res: Array<string> = []
    return res;
  }

  private handledHTTPResponse (response: any) {
    if (response.status === 404) throw new Error ('Url not found');
    return response.text();
  }

  private validationJSON (data: any): any {
    try {
      const result = JSON.parse(data);
      return result;
    } catch (e) {
        throw new Error ('Invalid JSON');
    }
  }

}

export const EventReader:TEventReader = new TEventReader();