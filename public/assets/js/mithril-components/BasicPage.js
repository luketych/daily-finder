import m from 'https://cdn.skypack.dev/mithril'

import Nav from './Nav.js'
import Footer from './Footer.js'


let articleTitle = undefined
let articleJSON = undefined


export default {
    oninit: async function(vnode) {
        articleTitle = vnode.attrs.title

        const resp = await m.request({
            method: "GET",
            url: "http://localhost:3030/api/articles?title=" + articleTitle
        })

        articleJSON = resp.data[0]

        m.redraw()
    },

    view: function(vnode) {
        return articleJSON && [
            m(Nav),
            m.trust(articleJSON.text),
            m(Footer)
        ]
    }
}


// export default {
//     view: function(vnode) {
//         console.log('ArticlePage:vnode', vnode)

//         return m("article-container", [
//             m("article", [
//                 m("h1", "Article 1"),
//                 m("p", "Content of article 1")
//             ]),
//         ])
//     }
// }