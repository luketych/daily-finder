import m from 'mithril'


export default {
    view: function() {
        return [
          m("div", {class: "scroll-prompt", "scroll-prompt": "", "ng-show": "showPrompt"}, [
            m("div", {class: "scroll-prompt-arrow-container"}, [
              m("div", {class: "scroll-prompt-arrow"}, [
                m("div")
              ]),
              m("div", {class: "scroll-prompt-arrow"}, [
                m("div")
              ])
            ])
          ])
        ]
    }
}