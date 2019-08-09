const HttpStatus = require('http-status-codes');
const expect = require('chai').expect;
let trelloListsUrl;
let getListResponse;

Feature('Trello List Test - ', {retries: process.env.retries});

BeforeSuite(async function (I, trelloData) {
    trelloListsUrl = trelloData.BASIC_API_URL + trelloData.BOARD.BOARDS_URL + trelloData.BOARD.BOARD_ID + '/?fields=name&lists=all&list_fields_all&key='+trelloData.LOGIN.API_KEY+'&token=' + trelloData.LOGIN.TOKEN;
});

Before(async function (I) {
    getListsResponse = await I.sendGetRequest(trelloListsUrl);
    expect(getListsResponse.status).to.equal(HttpStatus.OK);
});

Scenario('test lists - it should return all attributes', function (I) {
  expect(getListsResponse.data).to.have.property('id');
  expect(getListsResponse.data).to.have.property('name');
  expect(getListsResponse.data).to.have.property('lists');
}).tag('@lists');

Scenario('test lists - it should return the correct type', function (I) {
  expect(getListsResponse.data.id).to.be.a('string');
  expect(getListsResponse.data.name).to.be.a('string');
  expect(getListsResponse.data.lists).to.be.a('array');
}).tag('@lists');

Scenario('test lists - it should return all lists attributes', function (I) {
  getListsResponse.data.lists.forEach(function (currentList){
  	expect(currentList).to.have.property('id');
  	expect(currentList).to.have.property('name');
  	expect(currentList).to.have.property('closed');
  	expect(currentList).to.have.property('idBoard');
  	expect(currentList).to.have.property('pos');
  	expect(currentList).to.have.property('subscribed');
  	expect(currentList).to.have.property('softLimit');
  });
}).tag('@lists');

Scenario('test lists - it should return the correct list attribute types', function (I) {
  getListsResponse.data.lists.forEach(function (currentList){
  	expect(currentList.id).to.be.a('string');
  	expect(currentList.name).to.be.a('string');
  	expect(currentList.closed).to.be.a('boolean');
  	expect(currentList.idBoard).to.be.a('string');
  	expect(currentList.pos).to.be.a('number');
  	expect(currentList.subscribed).to.be.a('boolean');
  });
}).tag('@lists');

Scenario('test lists - lists should have the same board id as the board', function (I) {
	getListsResponse.data.lists.forEach(function (currentList) {
			expect(currentList.idBoard).to.equal(getListsResponse.data.id);
	});
}).tag('@lists');

Scenario('test lists - lists should have the correct names', function (I, trelloData) {
	getListsResponse.data.lists.forEach(function (currentList) {
			expect(trelloData.LIST.LIST_NAMES).to.include(currentList.name);
	});
}).tag('@lists');