export default {
    view: function() {
      return m('div', {style: 'text-align: center;'}, [
        m('button', {
          class: 'load-more-button',
          onclick: () => {
            // Your load more function goes here
            
          }
        }, 'Load More')
      ])
    }
}