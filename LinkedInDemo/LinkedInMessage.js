var sleep = require('thread-sleep');
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;
var locator = require('./locators');

//Browser driver initialisation
var browser = new webdriver.Builder().usingServer().withCapabilities({
    'browserName': 'chrome'
}).build();

//Script dependent inputs
username = "ramachandran.b88@gmail.com";
password = "qaram@94424";

var connectFilter1st_flag = true;  //Set to false to skip 1st Connect Filter
var connectFilter2nd_flag = true;  //Set to false to skip 2nd Connect Filter
var connectFilter3rd_flag = true;  //Set to false to skip 3rd+ Connect Filter

var KeywordsSearch_flag = true;    //Set to false to skip Keword Search with Title
var searchTitle = "Tester";

var LocationsSearch_flag = true;  //Set to false to skip location search
var addCountry = "United States";

var CompanySearch_flag = true;    //Set to false to skip Company Search
var addCompany = "Tata Consultancy";

var maxConnectCount = 2;

var messageText =  ", thanks for connecting. Is "+addCompany+" willing to hire experienced "+searchTitle+". \nThanks!";



//Script reference Count
var maxPageNavCount = 20;
var rowCount = 0;



browser.get('https://www.linkedin.com/');
browser.manage().window().maximize();
browser.manage().timeouts().implicitlyWait(10000);

browser.findElement(By.id(locator.login_UserName_Id)).sendKeys(username);
browser.findElement(By.id(locator.login_Password_Id)).sendKeys(password);
browser.findElement(By.id(locator.login_SubmitBtn_Id)).click();
browser.findElement(By.xpath(locator.searchTextBox_Xpath)).sendKeys("" + webdriver.Key.ENTER).then(function() {
    console.log('Step - Navigation to Advance search page - Done');
    sleep(10000);
});



if (KeywordsSearch_flag) {
    browser.findElement(By.xpath(locator.getFilterSection("Keywords"))).click();
    browser.findElement(By.id(locator.Ad_SearchTtitle_Xpath)).sendKeys(searchTitle).then(function() {
        console.log('Step - Keywords Search filter @ title - Done');
    });
}


if (LocationsSearch_flag) {
    browser.executeScript("arguments[0].scrollIntoView(false);",   browser.findElement(By.xpath(locator.getFilterSection("Locations"))));
    browser.executeScript(locator.scrollElementIntoMiddle,browser.findElement(By.xpath(locator.getFilterSection("Locations"))));
    browser.findElement(By.xpath(locator.getFilterSection("Locations"))).click().then(function(){sleep(5000)});
    var addLocationEle = browser.findElement(By.id(locator.Ad_LocationAdBtn_Id));
    browser.executeScript(locator.scrollElementIntoMiddle,addLocationEle);
    browser.executeScript("arguments[0].scrollIntoView(false)", addLocationEle);
    addLocationEle.click();
    browser.findElement(By.xpath(locator.Ad_LocationText_Xpath)).sendKeys(addCountry).then(function() {
        sleep(5000);
    });
    browser.findElements(By.xpath(locator.Ad_SearchList_Xpath)).then(function(list) {
      browser.executeScript(locator.scrollElementIntoMiddle,list[0]);
        list[0].click().then(function() {
            console.log('Step - Add location filter @ locations - Done');
            sleep(10000);
        });
    });



}
if (CompanySearch_flag) {
    browser.wait(until.elementLocated(By.xpath(locator.getFilterSection("Current companies"))), 10000, 'testttt - unable to locate element');
    browser.executeScript("arguments[0].scrollIntoView(false);",   browser.findElement(By.xpath(locator.getFilterSection("Current companies"))));
    browser.executeScript(locator.scrollElementIntoMiddle,browser.findElement(By.xpath(locator.getFilterSection("Current companies"))));
    browser.findElement(By.xpath(locator.getFilterSection("Current companies"))).click().then(function(){sleep(5000)});
    var addCompanyEle = browser.findElement(By.id(locator.Ad_CurCompanyAdBtn_Id));
    browser.executeScript("arguments[0].scrollIntoView(false)", addCompanyEle);
    browser.executeScript(locator.scrollElementIntoMiddle,addCompanyEle);
    addCompanyEle.click();
    browser.findElement(By.xpath(locator.Ad_CurCompanyAdBtn_Xpath)).sendKeys(addCompany).then(function() {
        sleep(5000);
    });
    browser.findElements(By.xpath(locator.Ad_SearchList_Xpath)).then(function(list) {
      browser.executeScript(locator.scrollElementIntoMiddle,list[0]);
        list[0].click().then(function() {
            console.log('Step - Add company filter @ Current Companies - Done');
            sleep(10000);
        });
    });
}

if (connectFilter1st_flag) browser.findElement(By.xpath(locator.firstConnect_Xpath)).click().then(function() {
    console.log('Step - Select 1st Connect Check box - Done');
    sleep(10000)
});
if (connectFilter2nd_flag) browser.findElement(By.xpath(locator.secondConnect_Xpath)).click().then(function() {
    console.log('Step - Select 2nd Connect Check box - Done');
    sleep(10000)
});
if (connectFilter3rd_flag) browser.findElement(By.xpath(locator.thirdConnect_Xpath)).click().then(function() {
    console.log('Step - Select 3rd+ Connect Check box - Done');
    sleep(10000)
});




for (var j = 0; j < maxPageNavCount; j++) {

    browser.findElements(By.className("search-result__wrapper")).then(function(resultRows) {
        browser.executeScript("arguments[0].scrollIntoView(true)", resultRows[(resultRows.length - 1)]);
        browser.executeScript(locator.scrollElementIntoMiddle,resultRows[(resultRows.length - 1)]);
        browser.executeScript("arguments[0].scrollIntoView(true)", browser.findElement(By.xpath(locator.searchTextBox_Xpath))).then(function() {
            sleep(5000);
        });
    }).then(function() {
        browser.findElements(By.className(locator.searchResultRows_Class)).then(function(resultRows) {

            //Line Statement to check and load all 10 rows of search results page
            for (var i = 0; i < resultRows.length; i++) {

                var name = '';

                resultRows[i].findElement(By.xpath(locator.userNameLinkText_Xpath)).getText().then(function(text) {
                    name = text;
                    rowCount++;
                });
                resultRows[i].findElements(By.xpath(locator.searchResultActionBtn_Xpath)).then(function(resultRowBtn) {
                    if (resultRowBtn.length > 0) {
                        var button = resultRowBtn[0];
                        button.getText().then(function(text) {
                            if (text == "Message") {
                                console.log('Start to process Message request to user: ', name);
                                button.click().then(function() {
                                    sleep(5000)
                                });

                                browser.findElement(By.xpath(locator.messageTextBox_Xpath)).sendKeys("Hi " + name + messageText).then(function(){
                                  sleep(5000);
                                  browser.findElement(By.xpath(locator.sendMessageBtn_Xpath)).click();
                                }).then(function() {
                                    maxConnectCount--;
                                    if (maxConnectCount <= 0) {
                                      browser.findElement(By.xpath(locator.closeMessage_Xpath)).click().then(function(){sleep(5000)});
                                        console.log('Reached maximum Message request people count - Exiting the code');
                                        process.exit();
                                    }
                                    console.log('Sent message request to user:' + name);
                                    console.log('\nPending Connection request count:' + maxConnectCount);
                                    browser.findElement(By.xpath(locator.closeMessage_Xpath)).click().then(function(){sleep(5000)});
                                    if (rowCount == 10) {
                                        browser.executeScript("arguments[0].scrollIntoView(false)", browser.findElement(By.xpath(locator.paginatorNextBtn_Xpath)));
                                        browser.executeScript(locator.scrollElementIntoMiddle,browser.findElement(By.xpath(locator.paginatorNextBtn_Xpath)));
                                        browser.findElement(By.xpath(locator.paginatorNextBtn_Xpath)).click().then(function() {
                                            sleep(10000)
                                        });
                                    }
                                });
                            }

                        });
                    }
                });



            }

        }).then(function() {
            rowCount = 0;
        });

    });


}
