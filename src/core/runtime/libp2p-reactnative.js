'use strict'

const WebRTCStar = require('libp2p-webrtc-star')
const Multiplex = require('libp2p-mplex')
const SECIO = require('libp2p-secio')
const Railing = require('libp2p-railing')
const libp2p = require('libp2p')
const rnRTC = require('react-native-webrtc')

class Node extends libp2p {
  constructor (peerInfo, peerBook, options) {
    options = options || {}
    const wrtcstar = new WebRTCStar({id: peerInfo.id, wrtc: rnRTC})

    const modules = {
      transport: [wrtcstar],
      connection: {
        muxer: [Multiplex],
        crypto: [SECIO]
      },
      discovery: [wrtcstar.discovery]
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
