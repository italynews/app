/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const HomeViewModel = require("./news-list-model");
const topmost = require("tns-core-modules/ui/frame").topmost;

const listViewModule = require("tns-core-modules/ui/list-view");

const AnsaService = require("../shared/ansaservice");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();
    AnsaService.listNews().then((r) => {
        console.log(r);
        page.bindingContext.news = r;
    }, (e) => {
        console.log(e);
    });
}

exports.onNavigatingTo = onNavigatingTo;

function onListViewLoaded(args) {
    const listView = args.object;
}
exports.onListViewLoaded = onListViewLoaded;

function onItemTap(args) {
    const page = args.object;
    console.log(page);
    topmost().navigate({
        moduleName: "news_detail/news-detail-page",
        context: {link : page.bindingContext.news[args.index].link},
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onItemTap = onItemTap;
