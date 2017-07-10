module.exports = {


getFilterSection : function(filterName)
{
  filter_xpath = ".//li[contains(@class,'search-facet')]//.//h3[text()='"+filterName+"']";
  return filter_xpath;
}

}
