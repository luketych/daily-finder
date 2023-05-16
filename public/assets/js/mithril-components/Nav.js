import m from 'https://cdn.skypack.dev/mithril'

/*
<nav class="nav">
  <input type="checkbox" id="nav-check">
  <div class="nav-header">
    <div class="nav-title">
      Logo
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <ul class="nav-list">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
*/


export default {
    view: function() {
        return [

          m("nav", {class: "nav"}, [
            m("input", {type: "checkbox", id: "nav-check"}),
            m("div", {class: "nav-header"}, [
              m("div", {class: "nav-title"}, [
                m("a", {href: "/", class: "nav-logo"}, "DailyFinder")
              ])
            ]),
            m("div", {class: "nav-btn"}, [
              m("label", {for: "nav-check"}, [
                m("span"),
                m("span"),
                m("span")
              ])
            ]),
            m("ul", {class: "nav-list"}, [
              m("li", [
                m("a", {href: "/health"}, "Health")
              ]),
              m("li", [
                m("a", {href: "/finance"}, "Finance")
              ]),
              m("li", [
                m("a", {href: "/travel"}, "Travel")
              ]),
              m("li", [
                m("a", {href: "/tech"}, "Tech")
              ]),
              m("li", [
                m("a", {href: "/education"}, "Education")
              ])
            ])
          ]),


        ]
    }
}