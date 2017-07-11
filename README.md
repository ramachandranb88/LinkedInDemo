# LinkedInDemo

#Simple selenium automation script built over node js using selenium-webdriver and execute the scripts in chrome browser

Set up Steps:
1. Download LinkedInDemo folder to local
2. Open command window and get into LinkedInDemo folder
3. Perform NPM install on package.json
4. Set chrome driver path at System Environment variable => Path = %node_modules%\chromedriver\lib\chromedriver
5. Now execute script using command : "node LinkedInTest.js"

Note: Currently the script will perform until Add Invite Navigation and Enter the Connect request text. Then it will close the invitation pop up window and move on to next linked in user. Once if this flow is ok, will add send invite action.
