// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'

import corss from '@koa/cors';
import Router from '@koa/router'; 
import send from 'koa-send'

import { configurationValidator } from './configuration.js'
import { logError } from './hooks/log-error.js'
import { mongodb } from './mongodb.js'

import { services } from './services/index.js'
import { channels } from './channels.js'

import render from 'mithril-node-render'
import ArticlePage from '../public/client/components/ArticlePage.js';

// import path from 'path'
// import views from 'koa-views'



const app = koa(feathers())
const router = new Router();

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(cors())
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())








// Configure services and transports
app.configure(rest())
app.configure(
  socketio({
    cors // : { origin: app.get('cors_origins') }
  })
)



// Setup views middleware specifying the view directory and the default extension to be `.pug`
// app.use(views(path.join(__dirname, '/views'), {
//   extension: 'pug'
// }));



// @blade?
// app.use(async (ctx) => {
//     const path = ctx.path;
//     const subdomains = ctx.subdomains;

//     // custom 404
//     // if (ctx.status == 404) {
//     //   ctx.body = 'Nothing Here.';
//     // }

//     if (path === '/test') {
//         ctx.type = 'html';
//         ctx.body = '<h1>Hello World</h1>';
//     }

//     else if (RegExp('^\/article\/([^\/]+)$').test(path)) {
//         const id = path.split('/article/')[1];

//         ctx.type = 'html';

//         console.log('id', id)

//         await render(ArticlePage, { articleID: id }).then(function (html) {
//           ctx.body = html
//         })
//     }

//     else {
//       await send(ctx, 'index.html', { root: app.get('public') });
//     }
// })




// add your custom 404 page
// app.use(function* (ctx) {
//   // requests not matching the routes will have a status of 404 by now,
//   // but the response it not yet sent
//   if (this.status == 404) {
//     ctx.body = 'Nothing Here.';
//   }
// });


app.config
app.configure(channels)
app.configure(mongodb)

app.configure(services)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})



// if user visits /article/6462ebd82783dd5e2aa16ec7, render ArticlePage with articleID:
// app.get('/article/:articleID', async (ctx) => {
//   const articleID = ctx.params.articleID
//   const html = await render(ArticlePage, { articleID: articleID })
//   ctx.body = html
// })



// DEFINE KOA ROUTES AT BOTTOM SO THAT THEY DONT OVERRIDE FEATHERS ROUTES

router.get('/article/:id', async (ctx) => {
    const id = ctx.params.id;
    ctx.type = 'html';
    console.log('id', id);
    await render(ArticlePage, { articleID: id }).then(function (html) {
        ctx.body = html;
    });
});

// catch-all route
router.get('(.*)', async (ctx) => {
    await send(ctx, 'index.html', { root: app.get('public') });
});

app.use(router.routes()).use(router.allowedMethods());




export { app }
