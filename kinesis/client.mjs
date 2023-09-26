import {
  KinesisClient,
  PutRecordCommand,
  PutRecordsCommand
} from '@aws-sdk/client-kinesis'

export const createHelper = (KinesisClientClass = KinesisClient) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new KinesisClientClass({ region: process.env.AWS_REGION })
    }

    return this._client
  },

  putRecord (params) {
    return this.client.send(new PutRecordCommand(params))
  },

  putRecords (params) {
    return this.client.send(new PutRecordsCommand(params))
  }
})

export const client = createHelper()
export const createKinesisHelper = createHelper

export default {
  client,
  kinesis: client,
  createHelper,
  createKinesisHelper: createHelper
}
