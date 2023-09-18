import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'

import { asyncGunzip, asynGzip } from '../lib/zipper.mjs'

export const createS3Helper = (S3ClientClass = S3Client) => ({
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
  },

  listObjectsV2 (params) {
    return this.client.send(new ListObjectsV2Command(params))
  }
})


export async function readBody (streamBody) {
  let buff = Buffer.from('')

  for await (const chunk of streamBody) {
    buff = Buffer.concat([buff, chunk])
  }

  return buff
}

export async function readCompressedBody (streamBody) {
  const buff = await readBody(streamBody)
  if (buff[0] != 31 || buff[1] != 139) {
    return buff
  }

  return asyncGunzip(buff)
}

export async function gzipPutParams (params, addGzipSuffix = true) {
  const gzipPromise = await asynGzip(params.Body)

  params.ContentEncoding = 'gzip'
  if (addGzipSuffix) {
    params.Key = `${params.Key}.gz`
  }

  params.Body = await gzipPromise

  return params
}

export const s3 = createS3Helper()
export const client = s3
export const createHelper = createS3Helper

export default {
  createS3Helper,
  s3,
  client: s3,
  createHelper: createS3Helper,
  gzipPutParams,
  readCompressedBody,
  readBody
}
