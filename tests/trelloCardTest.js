const HttpStatus = require('http-status-codes');

Feature('Trello Card Test - ', {retries: process.env.retries});

BeforeSuite(async function (I) {
    I.say('>> BEFORE BeforeSuite');
});

Before(function (I) {
    I.say('>> BEFORE');
});

/**
Scenario('test cards - it should return all cards', function (I) {
   I.say('i am the test')
}).tag('@cards');
*/