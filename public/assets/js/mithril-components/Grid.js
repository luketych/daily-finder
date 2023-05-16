import m from 'https://cdn.skypack.dev/mithril'

import GridItem from './GridItem.js'




export default class Grid {
    constructor(vnode) {
        this.articles = []
        this.page = 0
        this.loading = false
    }

    loadMore() {
      this.loading = true
      this.total = 0

      let reqURL
      if (this.tag) reqURL = `/api/articles?tags[$in][]=${this.tag}&$limit=12&$skip=${12*this.page}` // load 12 at time. It fits into divisions of 2 or 3
      else reqURL = `/api/articles?$limit=12&$skip=${12*this.page}`
      console.log('reqURL', reqURL)
      
      m.request({
        method: "GET",
        url: reqURL
      })
      .then(res => {
        return res.data
      })
      .then(articles => {
        console.log('articles', articles)
        // we've already loaded all the articles. => Stop the infinite scrolling.
        if (this.total === articles.length) { 
          this.allLoaded = true
          
          // hide Load More button
          document.querySelector('.load-more-button').style.display = 'none'
        }

        if (this.allLoaded) {
          return
        } else {
          this.articles = this.articles.concat(articles);
          this.page++;
          this.loading = false;
          this.total += articles.length;
          m.redraw();
        }
      })
    }

    checkScroll() {
        const BUFFER = 10

        if (!this.loading && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BUFFER) {
            this.loadMore();
        }
    }

    oninit(vnode) {
        console.log('vnode', vnode)
        this.tag = vnode.attrs._tag;
        this.loadMore();
        window.addEventListener('scroll', this.checkScroll.bind(this));
        this.intervalId = setInterval(this.checkScroll.bind(this), 500);
    }

    onremove() {
        window.removeEventListener('scroll', this.checkScroll.bind(this));
        clearInterval(this.intervalId);
    }

    view(vnode) {
        //const articlesData = vnode.attrs.articlesData

        const numArticles = this.articles.length

        return [
            m('div', {class: "child-page-listing"}, [
              m("div", {class: "grid-container"}, [
                this.articles.map((article, idx) => {
                  return m(GridItem, {
                    title: article.title,
                    text: article.text,
                    image: `/assets/images/image_${idx}.jpg`,
                    link: `/article/${article._id}`
                  })
                })
              ])
            ]),
            m('div', {style: 'text-align: center;'}, [
              m('button', {
                class: 'load-more-button',
                onclick: () => {
                  this.loadMore()
                }
              }, 'Load More')
            ])
        ]
    }
}