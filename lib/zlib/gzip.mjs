import { promisify } from 'node:util'
import { gzip } from 'node:zlib'

export const asynGzip = promisify(gzip)
