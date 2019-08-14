exports.config = {
    tests: './tests/*Test.js',
    timeout: 60000,
    output: './output',
    helpers: {
        REST: {
            defaultHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    },
    include: {
        // data
        trelloData: './data/trelloData.js'

    },
    bootstrap: null,
    mocha: {
        reporterOptions: {
            reportDir: './output',
            enableCharts: true,
            reportTitle: 'Workshop API Test Reporter',
            mochaFile: "output/result.xml",
            rootSuiteTitle: 'API Tests'
        }
    },
    plugins: {
        "allure": {
            outputDir: './output',
            enableScreenshotDiffPlugin: false
        },
        wdio: {
            enabled: true,
            services: ['selenium-standalone']
        }
    },
    name: 'workshopApi'
};
