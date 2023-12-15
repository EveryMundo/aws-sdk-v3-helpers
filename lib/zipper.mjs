import { promisify } from 'node:util'
import { gzip, gunzip } from 'node:zlib'

export const asyncGunzip = promisify(gunzip)
export const asyncGzip = promisify(gzip)

export default {
  gzip: asyncGzip,
  gunzip: asyncGzip,
  asyncGunzip,
  asyncGzip
}
