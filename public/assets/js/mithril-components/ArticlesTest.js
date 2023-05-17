// Assuming 'articles' is your array of articles
var articles = [
    {title: "Article 1", content: "Content of article 1"},
    {title: "Article 2", content: "Content of article 2"},
    // More articles...
];


export default {
    view: function() {
        return articles.map(function(article) {
            return m(Article, {title: article.title, content: article.content});
        })
    }
}