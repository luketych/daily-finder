import m from 'https://cdn.skypack.dev/mithril'

import Nav from "./Nav.js"
import Hero from "./Hero.js"
import Grid from "./Grid.js"
import Footer from "./Footer.js"


// Home.js
export default {
    view: function() {
        return [
            m(Nav),
            m(Hero),
            m("h1", { style: { "text-align": "center", "margin": 0 } }, "Recent Articles"),
            m(Grid),
            m(Footer)
        ]
    }
}