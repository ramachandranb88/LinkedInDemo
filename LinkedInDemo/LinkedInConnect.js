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
username = "xxxxxxxxxxx";
password = "xxxxxxxxxxx";

var connectFilter1st_flag = false;
var connectFilter2nd_flag = true;
var connectFilter3rd_flag = true;

var KeywordsSearch_flag = true;
var searchTitle = "Tester";

var LocationsSearch_flag = true;
//var addCountry = "United States";

var addCountry = "India";


var CompanySearch_flag = true;
var addCompany = "Tata Consultancy";

var maxConnectCount = 60;




//Script reference Count
var maxPageNavCount = 20;
var rowCount = 0;



browser.get('https://www.linkedin.com/');
browser.manage().window().maximize();
browser.manage().timeouts().implicitlyWait(10000);

browser.findElement(By.id(locator.login_UserName_Id)).sendKeys(username);
browser.findElement(By.id(locator.login_Password_Id)).sendKeys(password);
browser.findElement(By.id(locator.login_SubmitBtn_Id)).click().then(function(){sleep(5000)});
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
    browser.wait(until.elementLocated(By.xpath(locator.getFilterSection("Current companies"))), 10000, 'Error - unable to locate element');
    browser.executeScript("arguments[0].scrollIntoView(false);",   browser.findElement(By.xpath(locator.getFilterSection("Current companies"))));
    browser.executeScript(locator.scrollElementIntoMiddle,browser.findElement(By.xpath(locator.getFilterSection("Current companies"))));
    browser.findElement(By.xpath(locator.getFilterSection("Current companies"))).click().then(function(){sleep(5000)});
    var addCompanyEle = browser.findElement(By.id(locator.Ad_CurCompanyAdBtn_Id));
    browser.executeScript("arguments[0].scrollIntoView(false);", addCompanyEle);
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
    console.log('Step - Select 3rd Connect Check box - Done');
    sleep(10000)
});



//top:

for (var j = 0; j < maxPageNavCount; j++) {

    browser.findElements(By.className("search-result__wrapper")).then(function(resultRows) {
        browser.executeScript("arguments[0].scrollIntoView(true)", resultRows[(resultRows.length - 1)]);
        browser.executeScript(locator.scrollElementIntoMiddle,resultRows[(resultRows.length - 1)]);
        browser.executeScript("arguments[0].scrollIntoView(true)", browser.findElement(By.xpath(locator.searchTextBox_Xpath))).then(function() {
            sleep(5000);
        });
    }).then(function() {
        browser.findElements(By.className(locator.searchResultRows_Class)).then(function(resultRows) {
            console.log('rows length =', resultRows.length);
            //Line Statement to check and load all 10 rows of search results page
            for (var i = 0; i < resultRows.length; i++) {

                var name = '';
                browser.executeScript(locator.scrollElementIntoMiddle,resultRows[i].findElement(By.xpath(locator.userNameLinkText_Xpath)));
                resultRows[i].findElement(By.xpath(locator.userNameLinkText_Xpath)).getText().then(function(text) {
                    name = text;
                    rowCount++;
                });
                resultRows[i].findElements(By.xpath(locator.searchResultActionBtn_Xpath)).then(function(resultRowBtn) {
                    if (resultRowBtn.length > 0) {
                        var button = resultRowBtn[0];
                        button.getText().then(function(text) {
                            if (text == "Connect") {
                                console.log('Start to process connect request to user: ', name);
                                button.click().then(function() {
                                    sleep(5000)
                                });
                                browser.findElement(By.xpath(locator.inviteAddNoteBtn_Xpath)).click().then(function() {
                                    sleep(5000)
                                });

                                browser.findElement(By.xpath(locator.inviteMsgTextBox_Xpath)).sendKeys("Hi " + name + ", can we connect and discuss career options in " + addCountry + ". Thanks!");
                                browser.findElement(By.xpath(".//button[text()='Send invitation']")).click().then(function() {
                                    sleep(5000);
                                }).then(function() {
                                    maxConnectCount--;
                                    if (maxConnectCount <= 0) {
                                      console.log('Reached maximum connect request people count - Exiting the code');
                                        process.exit();
                                    }
                                    console.log('Sent connection request to user:' + name);
                                    console.log('\nPending Connection request count:' + maxConnectCount);

                                });
                            }

                        });
                    }
                }).then(function(){

                if (rowCount == resultRows.length) {
                  browser.executeScript(locator.scrollElementIntoMiddle,browser.findElement(By.xpath(locator.paginatorNextBtn_Xpath)));

                    browser.executeScript("arguments[0].scrollIntoView(false)", browser.findElement(By.xpath(locator.paginatorNextBtn_Xpath)));
                    browser.executeScript(locator.scrollElementIntoMiddle,browser.findElement(By.xpath(locator.paginatorNextBtn_Xpath)));
                    browser.findElement(By.xpath(locator.paginatorNextBtn_Xpath)).click().then(function() {
                        console.log('Processing to next page navigation : Done')
                        sleep(10000)
                    });
                }
                });



            }

        }).then(function() {
            rowCount = 0;
        });

    });


}
