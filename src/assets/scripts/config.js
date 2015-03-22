require.config({
    paths: {
        requirejs: '../vendor/requirejs/require',
        jQuery: '../vendor/jquery/jquery.min',
        velocity: '../vendor/velocity/velocity.min'
    },
    shim: {
        jQuery: {
            exports: '$'
        },
        velocity: {
            deps: ['jquery']
        }
    },
    waitSeconds: 120
});
