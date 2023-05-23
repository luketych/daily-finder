import m from 'mithril'



// <!-- Google Tag Manager (noscript) -->
// <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MXCSL68"
// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
// <!-- End Google Tag Manager (noscript) -->


 export default {
    view: function () {
        return m('div', [
            m.trust(
                `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MXCSL68"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
            )
        ])
    }
 }