import {
  KinesisClient,
  PutRecordCommand,
  PutRecordsCommand
} from '@aws-sdk/client-kinesis'

import { AWSHelper } from '../lib/classes/AWSHelper.class.mjs'

export const createHelper = (region, ClientClass) => new KinesisHelper(region, ClientClass)

export class KinesisHelper extends AWSHelper {
  constructor (region = process.env.AWS_REGION, ClientClass = KinesisClient) {
    super(region, ClientClass)
  }

  putRecord (params) {
    return this.client.send(new PutRecordCommand(params))
  }

  putRecords (params) {
    return this.client.send(new PutRecordsCommand(params))
  }
}

export const client = createHelper()
export const createKinesisHelper = createHelper

export default {
  client,
  kinesis: client,
  createHelper,
  createKinesisHelper: createHelper
}
