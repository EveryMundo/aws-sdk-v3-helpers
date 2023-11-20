import { SQSClient, SendMessageCommand, SendMessageBatchCommand } from '@aws-sdk/client-sqs'

export const createHelper = (region = process.env.AWS_REGION, SQSClientClass = SQSClient) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new SQSClientClass({ region })
    }

    return this._client
  },

  sendMessageBatch (params) {
    return this.client.send(new SendMessageBatchCommand(params))
  },

  sendMessage (params) {
    return this.client.send(new SendMessageCommand(params))
  }
})

export const sqs = createHelper()
export const client = sqs
export const createSQSHelper = createHelper

export default {
  createSQSHelper,
  sqs,
  client,
  createHelper
}
