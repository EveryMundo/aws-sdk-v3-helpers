import { SQSClient, SendMessageCommand, SendMessageBatchCommand } from '@aws-sdk/client-sqs'

const createSQSHelper = (SQSClientClass = SQSClient) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new SQSClientClass({ region: process.env.AWS_REGION })
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

export const sqs = createSQSHelper()
export default { createSQSHelper, sqs }
