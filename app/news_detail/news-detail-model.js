const observableModule = require("tns-core-modules/data/observable");

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        news : {}
    });

    return viewModel;
}

module.exports = HomeViewModel;
