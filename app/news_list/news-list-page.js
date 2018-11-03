/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const HomeViewModel = require("./news-list-model");
const topmost = require("tns-core-modules/ui/frame").topmost;

const listViewModule = require("tns-core-modules/ui/list-view");

const LottieView = require('nativescript-lottie');

const AnsaService = require("../shared/ansaservice");

var view = require("ui/core/view");
var drawer;
var drawerButton;
var drawerButtonItem;
var drawerOpen = false;

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();
    drawer = view.getViewById(page, "sideDrawer");
    drawerButtonItem = view.getViewById(page, "sideButtonDrawer");
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


exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};

exports.drawerButtonLoaded = function(args) {
    drawerButton = args.object;
    drawerButton.speed = 0.1;
};

exports.onTapDrawer = function(args) {
    drawerOpen = !drawerOpen;
    console.log(drawerButton._animationView.animationSpeed);
    drawerButton._animationView.animationSpeed = 2.5;
    if (drawerOpen == true) {
        drawerButton._animationView.playFromProgressToProgressWithCompletion(1.0, 0.5, null);
    } else {
        drawerButton._animationView.playFromProgressToProgressWithCompletion(0.5, 1.0, null);
    }

};

exports.onDrawerClosed = function(args) {
    drawerOpen = false;
    drawerButton.cancelAnimation();
    drawerButton._animationView.animationProgress = 1.0;
};

exports.onDrawerOpened = function(args) {
    drawerOpen = true;
    drawerButton.cancelAnimation();
    drawerButton._animationView.animationProgress = 0.5;
};
