import {
  S3Client,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand
} from '@aws-sdk/client-s3'

import { asyncGunzip, asyncGzip } from '../lib/zipper.mjs'
import { AWSHelper } from '../lib/classes/AWSHelper.class.mjs'

export const createHelper = (region, ClientClass) => new S3Helper(region, ClientClass)

export class S3Helper extends AWSHelper {
  constructor (region = process.env.AWS_REGION, ClientClass = S3Client) {
    super(region, ClientClass)
  }

  getObject (params) {
    return this.client.send(new GetObjectCommand(params))
  }

  putObject (params) {
    return this.client.send(new PutObjectCommand(params))
  }

  headObject (params) {
    return this.client.send(new HeadObjectCommand(params))
  }

  deleteObjects (params) {
    return this.client.send(new DeleteObjectsCommand(params))
  }

  listObjectsV2 (params) {
    return this.client.send(new ListObjectsV2Command(params))
  }
}

export async function readBody (streamBody) {
  let buff = Buffer.from('')

  for await (const chunk of streamBody) {
    buff = Buffer.concat([buff, chunk])
  }

  return buff
}

export async function readCompressedBody (streamBody) {
  const buff = await readBody(streamBody)
  if (buff[0] !== 31 || buff[1] !== 139) {
    return buff
  }

  return asyncGunzip(buff)
}

export async function gzipPutParams (params, addGzipSuffix = true) {
  const gzipPromise = await asyncGzip(params.Body)

  params.ContentEncoding = 'gzip'
  if (addGzipSuffix) {
    params.Key = `${params.Key}.gz`
  }

  params.Body = await gzipPromise

  return params
}

export const s3 = createHelper()
export const client = s3
// export const createS3Helper = createHelper

export default {
  // createS3Helper: createHelper,
  s3,
  client: s3,
  createHelper,
  gzipPutParams,
  readCompressedBody,
  readBody
}
