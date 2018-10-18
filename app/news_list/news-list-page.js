/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const HomeViewModel = require("./news-list-model");
const topmost = require("tns-core-modules/ui/frame").topmost;


function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();
}

function onSelectCategories(args) {
    topmost().navigate({
        moduleName: "news_detail/news-detail-page",
        context: {saluto : 'hola'},
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}
exports.onSelectCategories = onSelectCategories;

exports.onNavigatingTo = onNavigatingTo;
