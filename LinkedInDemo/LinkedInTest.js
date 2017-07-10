
var sleep = require('thread-sleep');

var webdriver = require('selenium-webdriver');
      //     By = require('selenium-webdriver').By;
var until = webdriver.until;
var By    = webdriver.By;

var locator  = require('./locators');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();


var connectFilter1st_flag = true;
var connectFilter2nd_flag = false;
var connectFilter3rd_flag = true;


var KeywordsSearch_flag   = true;
var searchTitle           = "Tester";

var LocationsSearch_flag  = true;
var addCountry            = "Switzerland";

var CompanySearch_flag    = true;
var addCompany            = "Cognizant";




browser.get('https://www.linkedin.com/');
browser.manage().window().maximize();
browser.manage().timeouts().implicitlyWait(10000);

browser.findElement(By.id("login-email")).sendKeys("ramachandran.b88@gmail.com");
browser.findElement(By.id("login-password")).sendKeys("qaram@94424");
browser.findElement(By.id("login-submit")).click();
browser.findElement(By.xpath(".//input[contains(@id,'a11y-ember')]")).sendKeys(""+webdriver.Key.ENTER).then(function(){
  console.log('Step - Navigation to Advance search page - Done');
});


/*
if(KeywordsSearch_flag)
{
  browser.findElement(By.xpath(locator.getFilterSection("Keywords"))).click();
  browser.findElement(By.id("advanced-search-title")).sendKeys(searchTitle).then(function(){
    console.log('Step - Keywords Search filter @ title - Done');
  });
}
if(LocationsSearch_flag)
{
  browser.findElement(By.xpath(locator.getFilterSection("Locations"))).click();
  var addLocationEle = browser.findElement(By.id("sf-facetGeoRegion-add"));
  browser.executeScript("arguments[0].scrollIntoView()",addLocationEle);
  addLocationEle.click();
  browser.findElement(By.xpath(".//*[contains(@id,'ember') and contains(@placeholder,'location name')]")).sendKeys(addCountry);


  browser.findElements(By.xpath(".//*[@role='listbox']/li")).then(function(list){
    list[0].click().then(function(){
      console.log('Step - Add location filter @ locations - Done');
      sleep(10000);
    });
  });



}
if(CompanySearch_flag)
{
  browser.wait(until.elementLocated(By.xpath(locator.getFilterSection("Current companies"))),10000,'testttt - unable to locate element');
  browser.findElement(By.xpath(locator.getFilterSection("Current companies"))).click();
  var addCompanyEle = browser.findElement(By.id("sf-facetCurrentCompany-add"));
  browser.executeScript("arguments[0].scrollIntoView()", addCompanyEle);
  addCompanyEle.click();
  browser.findElement(By.xpath(".//*[contains(@id,'ember') and contains(@placeholder,'company name')]")).sendKeys(addCompany);
  browser.findElements(By.xpath(".//*[@role='listbox']/li")).then(function(list){
    list[0].click().then(function(){
      console.log('Stpe - Add company filter @ Current Companies - Done');
      sleep(10000);
    });
  });
}*/
if(connectFilter1st_flag) browser.findElement(By.xpath(".//*[@class='search-s-facet-value__label' and @title='1st']")).click().then(function(){sleep(5000)});
if(connectFilter2nd_flag) browser.findElement(By.xpath(".//*[@class='search-s-facet-value__label' and @title='2nd']")).click().then(function(){sleep(5000)});
if(connectFilter3rd_flag) browser.findElement(By.xpath(".//*[@class='search-s-facet-value__label' and @title='3rd+']")).click().then(function(){sleep(5000)});



browser.findElements(By.className("search-result__wrapper")).then(function(resultRows){


var resultRowBtn = resultRows[0].findElement(By.xpath(".//button[contains(@class,'search-result__actions')]"));
//resultRows[0].findElement(By.xpath(".//button[contains(@class,'search-result__actions')]")).then(function(btnText)
resultRowBtn.then(function(RowBtn)
{
  RowBtn.getText().then(function(text){
    if(text  == 'Message')
    {
      RowBtn.click().then(function(){sleep(5000)});
    }

  })
})
/*
console.log('000000:',buttonText);
if(buttonText == 'Message')
{
   resultRow.getText().then(function(text){
     console.log('exttttt-  ',text);
   });
}*/


});
