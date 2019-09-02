# workshopApi
Framework to test the APIs via codeceptJS

1) Check out the project
2) Run `npm install` to install all the dependencies
3) Get the API_Key and Access token from https://developers.trello.com/ and add them to data/trelloData.js
4) You can run all tests via the `npm run testAll` command


When you're checking the tests, you should view them in the following order:
1) trelloListTest.js
2) trelloCardTest.js
3) trelloCreateCardTest.js

if you view them in this order, you should see that for example the trelloCardTest.js has already some improvements in place when comparing it to trelloListTests.js. 
Same for trelloCreateCardTest.js ;)
