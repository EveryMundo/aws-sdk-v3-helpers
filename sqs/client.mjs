import { SQSClient, SendMessageCommand, SendMessageBatchCommand } from '@aws-sdk/client-sqs'

import { AWSHelper } from '../lib/classes/AWSHelper.class.mjs'

export const createHelper = (region, ClientClass) => new SQSHelper(region, ClientClass)

export class SQSHelper extends AWSHelper {
  constructor (region = process.env.AWS_REGION, ClientClass = SQSClient) {
    super(region, ClientClass)
  }

  sendMessageBatch (params) {
    return this.client.send(new SendMessageBatchCommand(params))
  }

  sendMessage (params) {
    return this.client.send(new SendMessageCommand(params))
  }
}

export const sqs = createHelper()
export const client = sqs
export const createSQSHelper = createHelper

export default {
  createSQSHelper,
  sqs,
  client,
  createHelper
}
