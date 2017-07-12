module.exports = {


  login_UserName_Id : "login-email",
  login_Password_Id : "login-password",
  login_SubmitBtn_Id: "login-submit",
  searchTextBox_Xpath: ".//input[contains(@id,'a11y-ember')]",
  Ad_SearchTtitle_Xpath: "advanced-search-title",
  Ad_LocationAdBtn_Id: "sf-facetGeoRegion-add",
  Ad_LocationText_Xpath: ".//*[contains(@id,'ember') and contains(@placeholder,'location name')]",
  Ad_SearchList_Xpath: ".//*[@role='listbox']/li",
  Ad_CurCompanyAdBtn_Id: "sf-facetCurrentCompany-add",
  Ad_CurCompanyAdBtn_Xpath: ".//*[contains(@id,'ember') and contains(@placeholder,'company name')]",
  firstConnect_Xpath: ".//*[@class='search-s-facet-value__label' and @title='1st']",
  secondConnect_Xpath: ".//*[@class='search-s-facet-value__label' and @title='2nd']",
  thirdConnect_Xpath: ".//*[@class='search-s-facet-value__label' and @title='3rd+']",
  searchResultRows_Class: "search-result__wrapper",
  userNameLinkText_Xpath: ".//span[@class='name-and-icon']",
  searchResultActionBtn_Xpath: ".//button[contains(@class,'search-result__actions')]",
  inviteAddNoteBtn_Xpath: ".//*[@class='send-invite__actions']/button[1]",
  inviteMsgTextBox_Xpath: ".//*[@id='custom-message']",
  paginatorNextBtn_Xpath: ".//button[@class='next']",
  messageTextBox_Xpath: ".//textarea[contains(@class,'text-area msg-messaging-form')]",
  sendMessageBtn_Xpath: ".//button[contains(@class,'send-button')]",
  closeMessage_Xpath : ".//button[@data-control-name='overlay.close_conversation_window'],


getFilterSection : function(filterName)
{
  filter_xpath = ".//li[contains(@class,'search-facet')]//.//h3[text()='"+filterName+"']";
  return filter_xpath;
}

}
