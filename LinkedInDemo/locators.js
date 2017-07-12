module.exports = {


  login_UserName_Id : "login-email",
  login_Password_Id : "login-password",
  login_SubmitBtn_Id: "login-submit",
  searchTextBox_Xpath: ".//input[contains(@id,'a11y-ember')]",
  Ad_SearchTtitle_Xpath: "advanced-search-title",





getFilterSection : function(filterName)
{
  filter_xpath = ".//li[contains(@class,'search-facet')]//.//h3[text()='"+filterName+"']";
  return filter_xpath;
}

}
