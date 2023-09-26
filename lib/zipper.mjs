import { promisify } from 'node:util'
import { gzip, gunzip } from 'node:zlib'

export const asyncGunzip = promisify(gunzip)
export const asynGzip = promisify(gzip)

export default {
  gzip: asynGzip,
  gunzip: asynGzip,
  asyncGunzip,
  asynGzip
}
