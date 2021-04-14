import WSControl from '../ws/controllers/wscontroller'
import { ErrorMessage, ICmdToServer, IErrorMessage, validationJSON } from './types/types';

export class WSInformer {
    private static wss: WSControl;
    private static onIncomingMessage: Function | undefined = undefined;

    public static init(host: string, handler: Function){
        this.wss = new WSControl(host, this.checkIncomingMessage.bind(this));
        this.onIncomingMessage = handler;
    }

    public static checkIncomingMessage(msg: any) {
        let respond: any = validationJSON(msg);
        if (this.onIncomingMessage) this.onIncomingMessage(respond);
    }

    public static async sendCmdToServer(request: ICmdToServer):Promise<any | IErrorMessage> {
      try {
        await this.wss.send(request)
      } catch (e) {
        return ErrorMessage (`Fetch Error: ${e.message}`);
      }
    }

}