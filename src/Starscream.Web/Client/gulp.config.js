module.exports = function() {
    var config = {
         sourceTs:[
            './src/**/*.ts'
        ],
        build: './build/',
        configTs:[
           './*.ts'
        ]
    };
    return config;
};
