import m from 'https://cdn.skypack.dev/mithril'

import Nav from './Nav.js'
import Footer from './Footer.js'





let articleID = undefined
let articleJSON = undefined

export default {
    oninit: async function(vnode) {
        articleID = vnode.attrs.articleID

        articleID = articleID || vnode.attrs.articleID

        articleJSON = await m.request({
            method: "GET",
            url: "http://localhost:2020/api/articles/" + articleID
        })

        m.redraw() // only do if oninit is async otherwise ill get into big big trouble :(
    },

    view: function(vnode) {
        if (articleJSON) {
            return articleJSON && [
                m(Nav),
                m("main", [
                  m( "section", { class: "ftco-section bg-light", style: "top:34px; padding-top:4px;" }, [
                      m( "div", { class: "article container" }, [
                          m( "img", { id: "article-image", src: `/${articleJSON._id}.jpg`, alt: "article image", class: "img-fluid" } ),
                          m( "h2", { id: "article-title" }, articleJSON.title),
                          m( "p", { class: "article-text" } ),
                          m.trust(articleJSON.text)
                      ] )
                    ] )
                ]),
                m(Footer)
            ]
        } else {
            return [
                m(Nav),
                m("main", [
                    m( "section", { class: "ftco-section bg-light", style: "top:34px; padding-top:4px;" }, [
                        m( "div", { class: "article container" }, [
                            m( "img", { id: "article-image", src: `/${articleID}.jpg`, alt: "article image", class: "img-fluid" } ),
                            m( "h2", { id: "article-title" }, vnode.attrs.title),
                            m( "p", { class: "article-text" } ),
                            m.trust(vnode.attrs.text)
                        ])
                    ])
                ]),
                m(Footer)
            ]
        }
    },
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