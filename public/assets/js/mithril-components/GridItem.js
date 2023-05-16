import m from 'https://cdn.skypack.dev/mithril'


/*
    m("article", {id: "3688", class: "grid-item"}, [
      m("a", {class: "grid-title", href: "#"}, "London"),
      m("div", {class: "grid-image"}, [
        m("a", {href: "#"}, [
          m("img", {width: "300", height: "169", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/london-768x432.jpg", alt: "london"})
        ])
      ])
    ])
*/


// export default class{
//     constructor() {
      export default {
        oninit: function(vnode) {

        },

        view: function(vnode) {
            const id = vnode.attrs.id
            const title = vnode.attrs.title
            const text = vnode.attrs.text
            const image = vnode.attrs.image
            const link = vnode.attrs.link

            return [
              m("article", {id: `${id}`, class: "grid-item"}, [
                m("a", {class: "grid-title", href: link}, title),
                m("div", {class: "grid-image"}, [
                  m("a", {href: link}, [
                    m("img", {width: "300", height: "169", src: image, alt: title})
                  ])
                ])
              ])
            ]
        }

      }
//     }
// }