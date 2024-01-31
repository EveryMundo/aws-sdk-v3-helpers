import { SNSClient, PublishCommand, PublishBatchCommand } from '@aws-sdk/client-sns'

import { AWSHelper } from '../lib/classes/AWSHelper.class.mjs'

export class SNSHelper extends AWSHelper {
  constructor (region = process.env.AWS_REGION, ClientClass = SNSClient) {
    super(region, ClientClass)
  }

  publishBatch (params) {
    return this._client.send(new PublishBatchCommand(params))
  }

  publish (params) {
    return this._client.send(new PublishCommand(params))
  }
}

const createHelper = (region, ClientClass) => new SNSHelper(region, ClientClass)

export const sns = createHelper()
export const client = sns
export const createSNSHelper = createHelper

export default {
  createSNSHelper,
  sns,
  client,
  createHelper
}
