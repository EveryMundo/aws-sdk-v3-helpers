import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

const createS3Helper = (S3ClientClass = S3Client) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new S3ClientClass({ region: process.env.AWS_REGION })
    }

    return this._client
  },

  getObject (params) {
    return this.client.send(new GetObjectCommand(params))
  },

  putObject (params) {
    return this.client.send(new PutObjectCommand(params))
  },

  headObject (params) {
    return this.client.send(new HeadObjectCommand(params))
  }
})

export const s3 = createS3Helper()
export const client = s3
export const createHelper = createS3Helper

export default {
  createS3Helper,
  s3,
  client: s3,
  createHelper: createS3Helper
}
