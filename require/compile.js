var requirejs = require('requirejs');

requirejs.optimize({
    name: 'bower_components/requirejs/require',
    mainConfigFile: __dirname + '/main.js',
    include: ['main'],
    insertRequire: ['main'],
    findNestedDependencies: false,
    cjsTranslate: false,
    optimize: 'uglify2',
    generateSourceMaps: true,
    preserveLicenseComments: false,
    out: __dirname + '/out.js'
});
