'use strict'

const Multiplex = require('libp2p-mplex')
const SECIO = require('libp2p-secio')
const Railing = require('libp2p-railing')
const libp2p = require('libp2p')

class Node extends libp2p {
  constructor (peerInfo, peerBook, options) {
    options = options || {}

    const modules = {
      transport: [],
      connection: {
        muxer: [Multiplex],
        crypto: [SECIO]
      },
      discovery: []
    }

    if (options.bootstrap) {
      const r = new Railing(options.bootstrap)
      modules.discovery.push(r)
    }

    if (options.modules && options.modules.transport) {
      options.modules.transport.forEach((t) => modules.transport.push(t))
    }

    if (options.modules && options.modules.discovery) {
      options.modules.discovery.forEach((d) => modules.discovery.push(d))
    }

    super(modules, peerInfo, peerBook, options)
  }
}

module.exports = Node
