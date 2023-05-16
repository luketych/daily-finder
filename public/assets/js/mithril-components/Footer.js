import m from 'https://cdn.skypack.dev/mithril'

import ScrollPrompt from "./ScrollPrompt.js"





export default {
    view: function(vnode) {
        return [
          m("footer", {class: "footer-distributed"}, [
            m("div", {class: "footer-top"}, [
              m("div", {class: "footer-left"}, [
                m("h3", "Daily", [
                  m("span", "Finder")
                ]),
                m("p", {class: "footer-links"}, [
                  m("a", {href: "#", class: "link-1"}, "Home"),
                  m("span", " | "),
                  m("a", {href: "/about"}, "About Us"),
                  m("span", " | "),
                  m("a", {href: "/contact"}, "Contact Us"),
                  m("span", " | "),
                  m("a", {href: "/privacy-policy"}, "Privacy Policy"),
                  m("span", " | "),
                  m("a", {href: "/terms"}, "Terms Of Service"),
                ]),
                m("p", {class: "footer-company-name"}, "DailyFinder © 2023")
              ]),
              /*m("div", {class: "footer-center"}, [
                m("div", [
                  m("i", {class: "fa fa-map-marker"}),
                  m("p", [
                    m("span", "444 S. Cedros Ave"),
                    m("span", "Solana Beach, California")
                  ])
                ]),
                m("div", [
                  m("i", {class: "fa fa-phone"}),
                  m("p", "+1.555.555.5555")
                ]),
                m("div", [
                  m("i", {class: "fa fa-envelope"}),
                  m("p", [
                    m("a", {href: "mailto:"}, "")
                  ])
                ])
              ]),*/
              m("div", {class: "footer-right"}, [
                m("p", {class: "footer-company-about"}, [
                  m("span", "About the company"),
                  "Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet."
                ]),
                m("div", {class: "footer-icons"}, [
                  m("a", {href: "#"}, [
                    m("i", {class: "fa fa-facebook"})
                  ]),
                  m("a", {href: "#"}, [
                    m("i", {class: "fa fa-twitter"})
                  ]),
                  m("a", {href: "#"}, [
                    m("i", {class: "fa fa-linkedin"})
                  ]),
                  m("a", {href: "#"}, [
                    m("i", {class: "fa fa-github"})
                  ])
                ])
              ]),
            ]),

            m("div", {class: "footer-bottom"}, "SCROLL TO LOAD MORE"),

            m(ScrollPrompt)
          ])
        ]   
    }
}
