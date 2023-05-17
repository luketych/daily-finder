import m from 'mithril'
import render from 'mithril-node-render'

import ArticlePage from './ArticlePage.js'
import Grid from './Grid.js'
import Hero from './Hero.js'
import Nav from './Nav.js'
import Footer from './Footer.js'




// Create a new Intersection Observer instance
let observer = new IntersectionObserver((entries, observer) => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
            console.log('.footer-top is completely visible in the screen');

            // document.querySelector('.scroll-prompt').style.display = 'block'

            // You can also stop observing if you want
            // observer.unobserve(entry.target);
        }
        else {
          // document.querySelector('.scroll-prompt').style.display = 'none'
        }
    });
}, { threshold: 1.0 }); // the callback will run when 100% of the target is visible





const root = document.querySelector("#app")


m.route.prefix = ""

const defaultGrid = new Grid()

m.route(root, "/", {
    "/": {
        onmatch: async function() {
            return (await import('./Home.js')).default
        }
    },

    // catch-all, doesn't forward to /, it serves home but the url stays the same
    /* "/:path...": {
        onmatch: async function() {
            return (await import('../Home.js')).default
        }
    }, */

    //"/article/:article": ArticlePage,
    "/article/:articleID": ArticlePage,


    // TEST GRID
    "/grid": defaultGrid,


    "/health": {
          onmatch: async function(args, requestedPath, route) {
            const Grid = (await import('./Grid.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(Nav),
                        m(Hero),
                        m(Grid, { _tag: 'health' }), // tag doesn't work so I have to use _tag. I think tag is already used. 
                        // ie https://mithril.js.org/hyperscript.html: var vnode = {tag: "div", attrs: {id: "box"}, children: [ /*...*/ ]}
                        m(Footer)
                    ])
                }
            };
        }
    },
    "/finance": {
        onmatch: async function(args, requestedPath, route) {
            const Grid = (await import('./Grid.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(Nav),
                        m(Hero),
                        m(Grid, { _tag: 'finance' }),
                        m(Footer) 
                    ])
                }
            };
        }
    },
    "/travel": {
        onmatch: async function(args, requestedPath, route) {
            const Grid = (await import('./Grid.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(Nav),
                        m(Hero),
                        m(Grid, { _tag: 'travel' }),
                        m(Footer)
                    ])
                }
            };
        }
    },
    "/tech": {
        onmatch: async function(args, requestedPath, route) {
            const Grid = (await import('./Grid.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(Nav),
                        m(Hero),
                        m(Grid, { _tag: 'tech' }),
                        m(Footer)
                    ])
                }
            };
        }
    },
    "/education": {
        onmatch: async function(args, requestedPath, route) {
            const Grid = (await import('./Grid.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(Nav),
                        m(Hero),
                        m(Grid, { _tag: 'education' }),
                        m(Footer)
                    ])
                },

                oncreate: function(vnode) {
                    let footer = document.querySelector('.footer-top');

                    observer.observe(footer);
                }
            };
        }
    },


    "/about": {
          onmatch: async function(args, requestedPath, route) {
            const BasicPage = (await import('./BasicPage.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(BasicPage, { title: 'about' })
                    ])
                }
            };
        }
    },
    "/contact": {
          onmatch: async function(args, requestedPath, route) {
            const BasicPage = (await import('./BasicPage.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(BasicPage, { title: 'contact' })
                    ])
                }
            };
        }
    },
    "/privacy-policy": {
          onmatch: async function(args, requestedPath, route) {
            const BasicPage = (await import('./BasicPage.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(BasicPage, { title: 'privacy-policy' })
                    ])
                }
            };
        }
    },
    "/terms": {
          onmatch: async function(args, requestedPath, route) {
            const BasicPage = (await import('./BasicPage.js')).default;

            return {
                view: function() {
                    return m("div", [
                        m(BasicPage, { title: 'terms' })
                    ])
                }
            };
        }
    },

})