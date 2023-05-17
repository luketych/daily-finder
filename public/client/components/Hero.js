import m from 'mithril'


export default {
    view: function() {
        return [
          m("div", {class: "hero-wrap"}, [
            m("div", {class: "overlay"}, [
              m("div", {class: "overlay-search-container container-fluid"}, [
                m("h1", "Find Anything"),
                m("input", {class: "form-control", type: "text", placeholder: "Search"}),
              ])
            ])
          ])
        ]
    }
}