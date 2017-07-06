


var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

browser.get('https://www.linkedin.com/');
browser.manage().window().maximize();
browser.findElement(webdriver.By.id("login-email")).sendKeys("test1234");
browser.findElement(webdriver.By.id("login-password")).sendKeys("testpasword123")
