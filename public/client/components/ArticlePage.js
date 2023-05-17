// import './ArticlePage.css'

import m from 'mithril'

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
let imageURL = undefined

const ArticlePage = {
    oninit: async function(vnode, waitFor) {
        articleID = vnode.attrs.articleID

        let reqURL = "https://dailyfinder.org/api/articles/6462ebd82783dd5e2aa16ec7"

        // articleJSON = waitFor(m.request({
        //     method: "GET",
        //     url: reqURL
        // }))

        // return await fetch(reqURL)
        // .then(function(resp) {
        //   vnode.state.myDog = resp.data[0]
        // })
        // .catch(err => {
        //   console.log(err)
        // })

        let r = waitFor(new Promise(async function (resolve) {          
            const articleJSONPromise = await fetch(reqURL)
            .then(res => {
              return res.json()
            })
            .catch(err => {
              console.log(err)
            })

            articleJSON = await articleJSONPromise


            // imageURL = `https://dailyfinder.org/assets/images/${articleJSON._id}.jpg`

            // await fetch(imageURL, { method: 'HEAD' })
            // .then(resp => {
            //     if (!resp.ok) imageURL = null
            // }).catch(console.error)

            resolve()
        }))

        console.log(r)

        // waitFor(new Promise(async function (resolve) {          
        //   let res = await m.request({
        //     method: "GET",
        //     url: reqURL
        //   }).then(res => {
        //     articleJSON = res
        //     console.log('articleJSON', articleJSON)
        //     resolve()
        //   })

        //   console.log(res)
        // }))

        // new Promise(function (resolve) {
        //   m.request({
        //     method: "GET",
        //     url: reqURL
        //   }).then(res => {
        //     articleJSON = res
        //     console.log('articleJSON', articleJSON)
        //     resolve()
        //   })

        //   //resolve()
        // })





        // m.redraw() // only do if oninit is async otherwise ill get into big big trouble :(
    },


    view: function(vnode) {
        if (articleJSON) {
            return articleJSON && [
                m("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
                m("link", { rel: "stylesheet", href: "/assets/css/newstyle.css" }),

                m(Nav),

                m("main", [
                  m( "section", {}, [
                      m( "div", { class: "article-container" }, [
                          imageURL ? m("img", { id: "article-image", src: imageURL, alt: "", class: "img-fluid" }) : null,
                          m( "h1", { id: "article-title" }, articleJSON.title),
                          m( "p", { class: "article-text" } ),
                          m.trust(articleJSON.text)
                      ])
                  ])
                ]),

                m(Footer),

                m("script", { src: "https://trk.dailyfinder.org/unilpclick.js?attribution=lastpaid&cookiedomain=dailyfinder.org&cookieduration=90&defaultcampaignid=6456c81c70175b0001e0f1d1&regviewonce=false" })
            ]
        } else {
            return [
                m(Nav),

                m("main", [
                    m( "section", { }, [
                        m( "div", { class: "article container" }, [
                            imageURL ? m("img", { id: "article-image", src: imageURL, alt: "", class: "img-fluid" }) : null,
                            m( "h1", { id: "article-title" }, vnode.attrs.title),
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
      var oncreatePromise = new Promise(function(resolve, reject) {
        console.log("oncreate");
        var script = document.createElement('script');
        script.src = 'https://trk.dailyfinder.org/unilpclick.js?attribution=lastpaid&cookiedomain=dailyfinder.org&cookieduration=90&defaultcampaignid=6456c81c70175b0001e0f1d1&regviewonce=false';
        document.body.appendChild(script);

        script.addEventListener('load', function() {
          console.log('Script has finished loading!');

          let attempt = 0;
          const maxAttempts = 10;

          function tryGettingCookie() {
            const cookieValue = getCookie('rtkclickid-store');
            console.log(cookieValue);

            if (cookieValue === null) {
              attempt++;
              if (attempt < maxAttempts) {
                // Try again after 1 second
                setTimeout(tryGettingCookie, 1000);
              } else {
                console.error('Failed to get the cookie after', maxAttempts, 'attempts');
                reject();
              }
            } else {
              const relatedTopicsAdsEl = document.querySelector('.related-topics-ads a');
              const href = relatedTopicsAdsEl.getAttribute('href');

              if (!href.includes('clickid') && !href.includes('refferer')) {
                relatedTopicsAdsEl.setAttribute('href', href + `?clickid=${cookieValue}&refferer=${window.location.href}`);
              }

              resolve();
            }
          }

          setInterval(tryGettingCookie, 500);
        });
      });

      var domContentLoadedPromise = new Promise(function(resolve, reject) {
        document.addEventListener('DOMContentLoaded', function() {
          console.log('DOM is fully loaded');
          resolve();
        });
      });

      Promise.all([oncreatePromise, domContentLoadedPromise]).then(function() {
        console.log('Both oncreate and DOMContentLoaded have finished');
      });
    }

}




export default ArticlePage


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