import m from 'https://cdn.skypack.dev/mithril'

import Nav from './Nav.js'
import Footer from './Footer.js'


function getCookie(name) {
    var cookies = document.cookie.split(';');

    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var [cookieName, cookieValue] = cookie.split('=');

        // Remove any leading/trailing spaces
        cookieName = cookieName.replace(/^ +| +$/g, '');

        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}


let articleID = undefined
let articleJSON = undefined

export default {
    oninit: async function(vnode) {
        articleID = vnode.attrs.articleID

        articleID = articleID || vnode.attrs.articleID

        articleJSON = await m.request({
            method: "GET",
            url: "https://dailyfinder.org/api/articles/" + articleID
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

    oncreate: function(vnode) {
      // Wrap the oncreate function in a promise
      var oncreatePromise = new Promise(function(resolve, reject) {
        console.log("oncreate");
        var script = document.createElement('script');
        script.src = 'https://trk.dailyfinder.org/unilpclick.js?attribution=lastpaid&cookiedomain=dailyfinder.org&cookieduration=90&defaultcampaignid=6456c81c70175b0001e0f1d1&regviewonce=false';

        // Listen for the 'load' event on the script element
        script.addEventListener('load', function() {
          console.log('Script has finished loading!');
          console.log(getCookie('rtkclickid-store'))
          
          // Resolve the promise when the script has loaded
          resolve();
        });
        
        document.body.appendChild(script);
      });

      // Wrap the DOMContentLoaded event in a promise
      var domContentLoadedPromise = new Promise(function(resolve, reject) {
        document.addEventListener('DOMContentLoaded', function() {
          console.log('DOM is fully loaded');
          resolve();
        });
      });

      // Use Promise.all to run code once both promises have resolved
      Promise.all([oncreatePromise, domContentLoadedPromise]).then(function() {
        console.log('Both oncreate and DOMContentLoaded have finished');
        // You can put additional code here that you want to run after both events have finished
        console.log(getCookie('rtkclickid-store'))

        const relatedTopicsAdsEl = document.querySelector('.related-topics-ads a')

        const href = relatedTopicsAdsEl.getAttribute('href')
        if (!href.includes('clickid') && !href.includes('refferer')) {
          relatedTopicsAdsEl.setAttribute('href', href + `?clickid=${getCookie('rtkclickid-store')}&refferer=${window.location.href}`)
        }

      });
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