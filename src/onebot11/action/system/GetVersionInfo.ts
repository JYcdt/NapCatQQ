import BaseAction from '../BaseAction';
import { OB11Version } from '../../types';
import { ActionName } from '../types';
import { version } from '@/onebot11/version';

export default class GetVersionInfo extends BaseAction<any, OB11Version> {
  actionName = ActionName.GetVersionInfo;

  protected async _handle(payload: any): Promise<OB11Version> {
    return {
      app_name: 'NapCat.Onebot',
      protocol_version: 'v11',
      app_version: version
    };
  }
}
