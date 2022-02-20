// tools/next-watch-server/next-watch-server.ts

import {NextServer} from 'next/dist/server/next'
import { NextServerOptions, ProxyConfig } from '@nrwl/next'

const express = require('express')
const path = require('path')
const chokidar = require('chokidar')

export default async function nexctWatchServer (
  app: NextServer,
  settings: NextServerOptions & { [prop: string]: any },
  proxyConfig: ProxyConfig
) {
  const handle = app.getRequestHandler()
  await app.prepare()

  const articlePath = process.env.articleMarkdownPath

  // watch folders if spcified
  if (articlePath) {
    chokidar
      .watch(articlePath, {
        usePolling: false,
        ignoreInitial: true,
      })
      .on('all', async (filePathContext, eventContext = 'change') => {
        // CAUTION: accessing private APIs
        app['server']['hotReloader'].send('building')
        app['server']['hotReloader'].send('reloadPage')
      })
  }

  const server = express()
  server.disable('x-powered-by')

  // serve shared assets copied to 'public' folder
  server.use(
    express.static(path.resolve(settings.dir, settings.conf.outdir, 'public'))
  )

  // setup the proxy
  if (proxyConfig) {
    const proxyMiddleware = require('http-proxy-middleware')
    Object.keys(proxyConfig).forEach((context) => {
      server.use(proxyMiddleware(context, proxyConfig[context]))
    })
  }

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => handle(req, res))
  server.listen(settings.port, settings.hostname)
}