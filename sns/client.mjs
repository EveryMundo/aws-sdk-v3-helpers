import { SNSClient, PublishCommand, PublishBatchCommand } from '@aws-sdk/client-sns'

const createSNSHelper = (SNSClientClass = SNSClient) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new SNSClientClass({ region: process.env.AWS_REGION })
    }

    return this._client
  },

  publishBatch (params) {
    return this.client.send(new PublishBatchCommand(params))
  },

  publish (params) {
    return this.client.send(new PublishCommand(params))
  }
})

export const sns = createSNSHelper()
export default {
  createSNSHelper,
  sns,
  client: sns,
  createHelper: createSNSHelper
}
