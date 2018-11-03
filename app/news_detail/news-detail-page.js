/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const HomeViewModel = require("./news-detail-model");
const AnsaService = require("../shared/ansaservice");


function onNavigatingTo(args) {
    const page = args.object;
    var link = page.navigationContext.link;
    page.bindingContext = new HomeViewModel();
    AnsaService.getNews(link).then((r) => {
        console.log(r);
        page.bindingContext.news = r;
    }, (e) => {
        console.log(e);
    });
}

exports.onNavigatingTo = onNavigatingTo;
