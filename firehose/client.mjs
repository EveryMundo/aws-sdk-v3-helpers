import {
  FirehoseClient,
  PutRecordCommand,
  PutRecordBatchCommand
} from '@aws-sdk/client-firehose'

import { AWSHelper } from '../lib/classes/AWSHelper.class.mjs'

export class FirehoseHelper extends AWSHelper {
  constructor (region = process.env.AWS_REGION, ClientClass = FirehoseClient) {
    super(region, ClientClass)
  }

  putRecord (params) {
    return this.client.send(new PutRecordCommand(params))
  }

  putRecordBatch (params) {
    return this.client.send(new PutRecordBatchCommand(params))
  }
}

export const MainClass = FirehoseHelper

export const createHelper = (region, ClientClass) => new MainClass(region, ClientClass)

export const client = new MainClass()

export default {
  MainClass,
  client,
  createHelper
}
