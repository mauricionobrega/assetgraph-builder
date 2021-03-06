var _ = require('underscore'),
    uglifyAst = require('uglifyast'),
    urlTools = require('assetgraph/lib/util/urlTools'),
    bootstrapper = require('../bootstrapper'),
    i18nTools = require('../i18nTools');

module.exports = function (queryObj, options) {
    if (!queryObj) {
        throw new Error("transforms.injectBootstrapper: The 'queryObj' parameter is required.");
    }
    return function injectBootstrapper(assetGraph) {
        assetGraph.findAssets(queryObj).forEach(function (initialAsset) {
            var bootstrapAsset = new assetGraph.JavaScript({
                parseTree: bootstrapper.createAst(initialAsset, assetGraph, options)
            });
            assetGraph.addAsset(bootstrapAsset);
            if (initialAsset.type === 'Html') {
                new assetGraph.HtmlScript({to: bootstrapAsset})
                    .attach(initialAsset, 'first')
                    .inline()
                    .node.setAttribute('id', 'bootstrapper');
            } else { // initialAsset.type === 'JavaScript'
                new assetGraph.JavaScriptInclude({to: bootstrapAsset}).attach(initialAsset, 'first');
            }
        });
    };
};
