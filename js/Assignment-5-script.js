(function (global) {

    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "data/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";

    var dc = {};

    document.addEventListener("DOMContentLoaded", function (event) {
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
    });

    function buildAndShowCategoriesHTML(categories) {
        $ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
            $ajaxUtils.sendGetRequest(categoryHtml, function (categoryHtml) {
                var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
                document.querySelector("#main-content").innerHTML = categoriesViewHtml;
            }, false);
        }, false);
    }

    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";

        for (var i = 0; i < categories.length; i++) {
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;

            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);

            finalHtml += html;
        }

        finalHtml += "</section>";
        return finalHtml;
    }

    function insertProperty(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    global.$dc = dc;

})(window);
