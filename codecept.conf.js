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
        },
    WebDriver: {
      url: 'http://localhost',
      browser: 'chrome'
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
        rootSuiteTitle: ' API Tests'
    }    
  },
  plugins: {
    "allure": {
      outputDir: './output',
      enableScreenshotDiffPlugin: false
    }
  },
  name: 'workshopApi'
}

exports.config.helpers.WebDriver.desiredCapabilities = {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                "--headless",
                "--disable-gpu",
                "--lang=en"
            ]
        },
    };