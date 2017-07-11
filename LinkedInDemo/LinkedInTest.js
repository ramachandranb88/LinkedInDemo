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
var connectFilter1st_flag = false;
var connectFilter2nd_flag = true;
var connectFilter3rd_flag = true;

var KeywordsSearch_flag = true;
var searchTitle = "Tester";

var LocationsSearch_flag = true;
var addCountry = "United States";

var CompanySearch_flag = true;
var addCompany = "Tata Consultancy";
var maxConnectCount = 25;



//Script reference Count
var maxPageNavCount = 20;
var rowCount = 0;



browser.get('https://www.linkedin.com/');
browser.manage().window().maximize();
browser.manage().timeouts().implicitlyWait(10000);

browser.findElement(By.id(locator.login_UserName_Id)).sendKeys("ramachandran.b88@gmail.com");
browser.findElement(By.id(locator.login_Password_Id)).sendKeys("qaram@94424");
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
    browser.findElement(By.xpath(locator.getFilterSection("Locations"))).click();
    var addLocationEle = browser.findElement(By.id("sf-facetGeoRegion-add"));
    browser.executeScript("arguments[0].scrollIntoView()", addLocationEle);
    addLocationEle.click();
    browser.findElement(By.xpath(".//*[contains(@id,'ember') and contains(@placeholder,'location name')]")).sendKeys(addCountry).then(function() {
        sleep(5000);
    });
    browser.findElements(By.xpath(".//*[@role='listbox']/li")).then(function(list) {
        list[0].click().then(function() {
            console.log('Step - Add location filter @ locations - Done');
            sleep(10000);
        });
    });



}
if (CompanySearch_flag) {
    browser.wait(until.elementLocated(By.xpath(locator.getFilterSection("Current companies"))), 10000, 'testttt - unable to locate element');
    browser.findElement(By.xpath(locator.getFilterSection("Current companies"))).click();
    var addCompanyEle = browser.findElement(By.id("sf-facetCurrentCompany-add"));
    browser.executeScript("arguments[0].scrollIntoView()", addCompanyEle);
    addCompanyEle.click();
    browser.findElement(By.xpath(".//*[contains(@id,'ember') and contains(@placeholder,'company name')]")).sendKeys(addCompany).then(function() {
        sleep(5000);
    });
    browser.findElements(By.xpath(".//*[@role='listbox']/li")).then(function(list) {
        list[0].click().then(function() {
            console.log('Step - Add company filter @ Current Companies - Done');
            sleep(10000);
        });
    });
}

if (connectFilter1st_flag) browser.findElement(By.xpath(".//*[@class='search-s-facet-value__label' and @title='1st']")).click().then(function() {
    console.log('Step - Select 1st Connect Check box - Done');
    sleep(10000)
});
if (connectFilter2nd_flag) browser.findElement(By.xpath(".//*[@class='search-s-facet-value__label' and @title='2nd']")).click().then(function() {
    console.log('Step - Select 1st Connect Check box - Done');
    sleep(10000)
});
if (connectFilter3rd_flag) browser.findElement(By.xpath(".//*[@class='search-s-facet-value__label' and @title='3rd+']")).click().then(function() {
    console.log('Step - Select 1st Connect Check box - Done');
    sleep(10000)
});



//top:

for (var j = 0; j < maxPageNavCount; j++) {

    browser.findElements(By.className("search-result__wrapper")).then(function(resultRows) {
        browser.executeScript("arguments[0].scrollIntoView(true)", resultRows[(resultRows.length - 1)]);
        browser.executeScript("arguments[0].scrollIntoView(true)", browser.findElement(By.xpath(".//input[contains(@id,'a11y-ember')]"))).then(function() {
            sleep(5000)
        });
    }).then(function() {
        browser.findElements(By.className("search-result__wrapper")).then(function(resultRows) {

            //Line Statement to check and load all 10 rows of search results page
            for (var i = 0; i < resultRows.length; i++) {

                var name = '';

                resultRows[i].findElement(By.xpath(".//span[@class='name-and-icon']")).getText().then(function(text) {
                    name = text;
                    console.log('Start to process connect request to user: ', name);
                    rowCount++;
                });
                resultRows[i].findElements(By.xpath(".//button[contains(@class,'search-result__actions')]")).then(function(resultRowBtn) {
                    if (resultRowBtn.length > 0) {
                        var button = resultRowBtn[0];
                        button.getText().then(function(text) {
                            if (text == "Connect") {

                                button.click().then(function() {
                                    sleep(5000)
                                });
                                browser.findElement(By.xpath(".//*[@class='send-invite__actions']/button[1]")).click().then(function() {
                                    sleep(5000)
                                });
                                browser.findElement(By.xpath(".//*[@id='custom-message']")).sendKeys("Hi " + name + ", can we connect and discuss career options in " + addCountry + ". Thanks!");
                                browser.findElement(By.xpath(".//button[@class='send-invite__cancel-btn']")).click().then(function() {
                                    sleep(5000);
                                }).then(function() {
                                    maxConnectCount--;
                                    if (maxConnectCount <= 0) {
                                        console.log('Pending connect request people count : ' + maxConnectCount + ' - Exiting the code');
                                        process.exit();
                                    }
                                    console.log('Sent connection request to user:' + name);
                                    console.log('\nPending Connection request count:' + maxConnectCount);
                                    if (rowCount == 10) {
                                        browser.executeScript("arguments[0].scrollIntoView(false)", browser.findElement(By.xpath(".//button[@class='next']")));
                                        browser.findElement(By.xpath(".//button[@class='next']")).click().then(function() {
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
