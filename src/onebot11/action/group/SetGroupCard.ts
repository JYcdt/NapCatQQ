import BaseAction from '../BaseAction';
import { getGroupMember } from '@/core/data';
import { ActionName } from '../types';
import { NTQQGroupApi } from '@/core/apis/group';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';

const SchemaData = {
  type: 'object',
  properties: {
    group_id: { type: 'number' },
    user_id: { type: 'number' },
    card: { type: 'string' }
  },
  required: ['group_id', 'user_id', 'card']
} as const satisfies JSONSchema;

type Payload = FromSchema<typeof SchemaData>;

export default class SetGroupCard extends BaseAction<Payload, null> {
  actionName = ActionName.SetGroupCard;
  PayloadSchema = SchemaData;
  protected async _handle(payload: Payload): Promise<null> {
    const member = await getGroupMember(payload.group_id, payload.user_id);
    if (!member) {
      throw `群成员${payload.user_id}不存在`;
    }
    await NTQQGroupApi.setMemberCard(payload.group_id.toString(), member.uid, payload.card || '');
    return null;
  }
}
