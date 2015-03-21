require.config({
    paths: {
        requirejs: '../vendor/requirejs/require',
        jquery: '../vendor/jquery/jquery',
        velocity: '../vendor/velocity/velocity'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        velocity: {
            deps: ['jquery']
        }
    },
    waitSeconds: 120
});
