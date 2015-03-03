module.exports = function() {
    var config = {
         sourceTs:[
            './src/**/*.ts'
        ],
        build: './build/',
        buildTs: './build/**/*.ts',
        configTs:[
           './*.ts'
        ]
    };
    return config;
};
