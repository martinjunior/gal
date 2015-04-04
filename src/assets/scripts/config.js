require.config({
    paths: {
        requirejs: '../vendor/requirejs/require',
        jQuery: '../vendor/jquery/jquery.min'
    },
    shim: {
        jQuery: {
            exports: '$'
        }
    },
    waitSeconds: 120
});
