const HttpStatus = require('http-status-codes');
const expect = require('chai').expect;
const casual = require('casual');
let trelloToDoListsUrl;
let postCreateCardResponse;
let cardName, cardDescription;
let payload;

Feature('Trello Create Card Test - ', {retries: process.env.retries});

BeforeSuite(async function (I, trelloData) {

});

Before(async function (I, trelloData) {
    payload = {
        key: trelloData.LOGIN.API_KEY,
        token: trelloData.LOGIN.TOKEN
    };

    cardName = casual.day_of_year + casual.word + casual.integer(1, 100);
    cardDescription = casual.sentence;

    trelloToDoListsUrl = `${trelloData.BASIC_API_URL}cards?idList=${trelloData.LIST.TO_DO_LIST_ID}&name=${cardName}&desc=${cardDescription}`;

    postCreateCardResponse = await I.sendPostRequest(trelloToDoListsUrl, payload);
    expect(postCreateCardResponse.status).to.equal(HttpStatus.OK);
});

After( async function (I, trelloData) {
    const closeCardResponse = await I.sendPutRequest(`${trelloData.BASIC_API_URL}cards/${postCreateCardResponse.data.id}/closed?value=true`, payload);
    expect(closeCardResponse.status).to.equal(HttpStatus.OK);
});

Scenario('test create cards - it should return all CARD attributes', function (trelloData) {
    trelloData.CARD.CARD_PROPERTIES.forEach(function (currentProperty) {
        expect(postCreateCardResponse.data).to.have.property(currentProperty);
    });
}).tag('@createCards').tag('@cards');

Scenario('test create cards - it should have the correct name', function () {
    expect(postCreateCardResponse.data.name).to.equal(cardName);
}).tag('@createCards').tag('@cards');

Scenario('test create cards - it should have the correct description', function () {
    expect(postCreateCardResponse.data.desc).to.equal(cardDescription);
}).tag('@createCards').tag('@cards');

Scenario('test create cards - it should have the correct ListId', function (trelloData) {
    expect(postCreateCardResponse.data.idList).to.equal(trelloData.LIST.TO_DO_LIST_ID);
}).tag('@createCards').tag('@cards');

Scenario('test create cards - it should create the shortUrl with the shortLink in it', function () {
    expect(postCreateCardResponse.data.shortUrl).to.equal(`https://trello.com/c/${postCreateCardResponse.data.shortLink}`);
}).tag('@createCards').tag('@cards');

Scenario('test create cards - it should be possible to close the recently created card', async function (I, trelloData) {
    let cardId = postCreateCardResponse.data.id;
    expect(postCreateCardResponse.data.closed).to.equal(false);

    const putCloseCardResponse = await I.sendPutRequest(`${trelloData.BASIC_API_URL}cards/${cardId}/closed?value=true`, payload);
    expect(putCloseCardResponse.data.id).to.equal(cardId);
    expect(putCloseCardResponse.data.closed).to.equal(true);
}).tag('@createCards').tag('@cards');
