const HttpStatus = require('http-status-codes');
const expect = require('chai').expect;
let trelloToDoListsUrl;
let getCardsResponse;

Feature('Trello Card Test - ', {retries: process.env.retries});

BeforeSuite(async function (I, trelloData) {
    trelloToDoListsUrl = `${trelloData.BASIC_API_URL}${trelloData.LIST.LISTS_URL}/${trelloData.LIST.TO_DO_LIST_ID}/cards?key=${trelloData.LOGIN.API_KEY}&token=${trelloData.LOGIN.TOKEN}`;
});

Before(async function (I) {
    getCardsResponse = await I.sendGetRequest(trelloToDoListsUrl);
    expect(getCardsResponse.status).to.equal(HttpStatus.OK);
});

Scenario('test cards - it should return all CARD attributes', function (trelloData) {
    trelloData.CARD.CARD_PROPERTIES.forEach(function (currentProperty) {
        expect(getCardsResponse.data[0]).to.have.property(currentProperty);
    });
}).tag('@cards');

Scenario('test cards - it should return all CARD -> BADGES attributes', function (trelloData) {
    trelloData.CARD.CARD_BADGES_PROPERTIES.forEach(function (currentProperty) {
        expect(getCardsResponse.data[0].badges).to.have.property(currentProperty);
    });
}).tag('@cards');

Scenario('test cards - it should return the correct type for CARD string attributes', function () {
    const stringAttributes = ["id", "idBoard", "idList", "name", "shortLink", "shortUrl", "url"];

    stringAttributes.forEach(function (currentProperty) {
        expect(getCardsResponse.data[0][currentProperty]).to.be.a('string');
    });
}).tag('@cards');

Scenario('test cards - it should return the correct type for CARD boolean attributes', function () {
    const booleanAttributes = ["closed", "manualCoverAttachment", "dueComplete", "subscribed"];

    booleanAttributes.forEach(function (currentProperty) {
        expect(getCardsResponse.data[0][currentProperty]).to.be.a('boolean');
    });
}).tag('@cards');

Scenario('test cards - it should return the correct type for CARD array attributes', function () {
    const arrayAttributes = ["idMembersVoted", "idLabels", "idChecklists", "idMembers", "labels"];

    arrayAttributes.forEach(function (currentProperty) {
        expect(getCardsResponse.data[0][currentProperty]).to.be.a('array');
    });
}).tag('@cards');

Scenario('test cards - it should return the correct type for CARD numeric attributes', function () {
    const numberAttributes = ["idShort", "pos"];

    numberAttributes.forEach(function (currentProperty) {
        expect(getCardsResponse.data[0][currentProperty]).to.be.a('number');
    });
}).tag('@cards');

Scenario('test cards - it should return the correct type for CARD null attributes', function () {
    const nullAttributes = ["checkItemStates", "descData", "dueReminder", "idAttachmentCover", "due"];

    nullAttributes.forEach(function (currentProperty) {
        expect(getCardsResponse.data[0][currentProperty]).to.be.null;
    });
}).tag('@cards');
