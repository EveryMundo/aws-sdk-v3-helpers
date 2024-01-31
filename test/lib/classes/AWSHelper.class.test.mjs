/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import { AWSHelper } from '../../../lib/classes/AWSHelper.class.mjs'

describe('lib/classes/AWSHelper.class.mjs', () => {
  describe('AWSHelper', () => {
    it('should be a function', async () => {
      expect(AWSHelper).to.be.a('function')
    })

    describe('when called without a ClientClass', () => {
      it('should throw an error', () => {
        expect(() => new AWSHelper()).to.throw('ClientClass must be a class')
      })
    })

    describe('when called with a ClientClass', () => {
      it('should return an instance of AWSHelper', () => {
        const ClientClass = class {}
        const o = new AWSHelper(undefined, ClientClass)
        expect(o).to.be.instanceof(AWSHelper)
      })

      it('should have client as an instance of ClientClass', () => {
        const ClientClass = class {}
        const o = new AWSHelper(undefined, ClientClass)
        expect(o.client).to.be.instanceof(ClientClass)
      })
    })
  })
})
