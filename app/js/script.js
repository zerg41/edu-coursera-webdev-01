/* Fix some jQuery functions */
$(function () { // Same as document.addEventListener("DOMContentLoaded"...)

    /* Fix Navbar Toggle with autocollapse when clicking outside toggle */
    $("#navbarToggle").blur(function (event) { // Same as document.querySelector("#..").addEventListener("..")
        var screenWith = window.innerWidth;
        if (screenWith < 768) {
            $("#collapsable-nav").collapse('hide');
        }
    });
});

(function (global) {

    var dc = {};

    /** VAR DECLARATIONS **/
    /* URLs of snippets */
    var homeHtml = "snippets/home-snippet.html";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";
    /* URLs to take JSONs from the restaraunt site*/
    // var allCategoriesURL = "https://www.davidchuschinabistro.com/categories.json";
    var allCategoriesURL = "https://davids-restaurant.herokuapp.com/categories.json";
    var menuItemsURL = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";


    /** SUPPORT FUNCTIONS **/
    /* Convienience function for inserting innerHTML for 'select' */
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };
    /* Show loading icon inside identified element by 'selector' */
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='img/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };
    /* Return substitute of {{propName}} with propValue in given string */
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };
    /* Remove the class 'active' from Home button and switch to Active Page button */
    var switchNavButtonToActive = function () {
        var classes = document.querySelector("#navHomeButton").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#navHomeButton").className = classes;

        // add active to menu button if not already there
        classes = document.querySelector("#navMenuButton").className;
        if (classes.indexOf("active") == -1) {
            classes += " active";
            document.querySelector("#navMenuButton").className = classes;
        }
    };


    /** LOADERS **/
    /* On page load (before images or CSS) */
    document.addEventListener("DOMContentLoaded", function (event) {
        
        // On first load, show home view
        showLoading("#main-content");

        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false
        );
    });
    /* Load the menu categories view */
    dc.loadMenuCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesURL, buildAndShowCategoriesHTML);
    };
    /* Load the menu items view */
    dc.loadMenuItems = function (categoryShort) {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            menuItemsURL + categoryShort,
            buildAndShowMenuItemsHTML
        );
    };


    /** BUILDERS **/
    /* Builds HTML for the categories page based on the data from the server */
    function buildAndShowCategoriesHTML(categories) {
        /* Load title snippet of categories page */
        $ajaxUtils.sendGetRequest(
            categoriesTitleHtml, 
            function (categoriesTitleHtml) {
                /* Retrieve single category snippet */
                $ajaxUtils.sendGetRequest(
                    categoryHtml, 
                    function (categoryHtml) {
                        switchNavButtonToActive(); // switch active navigation button
                        var categoriesViewHtml = buildCategoriesViewHtml(categories,
                                                                         categoriesTitleHtml,
                                                                         categoryHtml);
                        insertHtml("#main-content", categoriesViewHtml);
                        // document.querySelector("#main-content").innerHTML = categoriesViewHtml;
                    },
                    false
                );
            },
            false
        );
    }
    /* Using categories data and snippets html to build categories view HTML */
    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='categories-tiles row'>";

        // Loop over categories
        for (var i = 0; i < categories.length; i++) {
            // Insert category values
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
    /* Builds HTML for the single category page based on the data from the server */
    function buildAndShowMenuItemsHTML(categoryMenuItems) {
        /* Load title snippet of menu items page */
        $ajaxUtils.sendGetRequest(
            menuItemsTitleHtml,
            function (menuItemsTitleHtml) {
                /* Retrieve single category snippet */
                $ajaxUtils.sendGetRequest(
                    menuItemHtml,
                    function (menuItemHtml) {
                        switchNavButtonToActive(); // switch active navigation button
                        var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems,
                                                                       menuItemsTitleHtml,
                                                                       menuItemHtml);
                        insertHtml("#main-content", menuItemsViewHtml);
                    },
                    false
                );
            },
            false
        );
    }
    /* Using category and menu items data and snippets html to build menu items view HTML */
    function buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,
                                            "name",
                                            categoryMenuItems.category.name);
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,
                                            "special_instructions",
                                            categoryMenuItems.category.special_instructions);
        var finalHtml = menuItemsTitleHtml;
        finalHtml += "<section class='menu-tiles row'>";

        /* Loop over categories */
        var menuItems  = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;
        for (var i = 0; i < menuItems.length; i++) {
            /* Insert menu item values */
            var html = menuItemHtml;
            html = insertProperty(html, "short_name", menuItems[i].short_name);
            html = insertProperty(html, "catShortName", catShortName);
            html = insertItemPrice(html, "price_small", menuItems[i].price_small);
            html = insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);
            html = insertItemPrice(html, "price_large", menuItems[i].price_large);
            html = insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);
            html = insertProperty(html, "name", menuItems[i].name);
            html = insertProperty(html, "description", menuItems[i].description);

            /* Add clearfix after every second menu item */
            if (i % 2 != 0) {
                html += "<div class='clearfix visible-lg-block visible-md-block'></div>"
            }

            finalHtml += html;
        }

        finalHtml += "</section>";
        return finalHtml;
    }

    
    /** VALIDATORS **/
    /* Price Validator */
    function insertItemPrice(html, pricePropName, priceValue) {
        // If not specified, replace with empty string
        if (!priceValue) {
            return insertProperty(html, pricePropName, "");
        }

        priceValue = "$" + priceValue.toFixed(2); // 'toFixed' limits the number of decimal places
        html = insertProperty(html, pricePropName, priceValue);
        return html;
    }
    /* Portion Name Validator */
    function insertItemPortionName(html, portionPropName, portionValue) {
        if (!portionValue) {
            return insertProperty(html, portionPropName, "");
        }
        html = insertProperty(html, portionPropName, portionValue);
        return html;
    }


    global.$dc = dc;
    
})(window);