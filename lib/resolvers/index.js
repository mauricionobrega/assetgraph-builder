var _ = require('underscore');

// Start with AssetGraph's built-in resolvers:

_.extend(exports, require('assetgraph').resolvers);

// Install getters for all resolvers in this directory:

require('fs').readdirSync(__dirname).forEach(function (fileName) {
    if (/\.js$/.test(fileName) && fileName !== 'index.js') {
        exports.__defineGetter__(fileName.replace(/\.js$/, ''), function () {
            return require('./' + fileName);
        });
    }
});
