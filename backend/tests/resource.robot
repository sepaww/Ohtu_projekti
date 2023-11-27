*** Settings ***
Library  SeleniumLibrary


*** Variables ***
${SERVER}  localhost:5173
${DELAY}  0.1 seconds
${HOME_URL}  http://${SERVER}


*** Keywords ***
Open And Configure Browser
    ${options}  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys
    #Call Method  ${options}  add_argument  --headless
    Open Browser  browser=chrome  options=${options}
    Set Selenium Speed  ${DELAY}



Main Page Should Be Open
    Title Should Be  Vite + React


Go To Main Page
    Go To  ${HOME_URL}



Set Title
    [Arguments]  ${title}
    Input Text  title  ${title}

Set Author
    [Arguments]  ${author}
    Input Text  author  ${author}

Set Number
    [Arguments]  ${number}
    Input Text  number  ${number}

Set Pages
    [Arguments]  ${pages}
    Input Text  pages  ${pages}

Set Journal
    [Arguments]  ${journal}
    Input Text  journal  ${journal}

Set Year
    [Arguments]  ${year}
    Input Text  year  ${year}

Set Publisher
    [Arguments]  ${year}
    Input Text  publisher  ${year}

Set Adress
    [Arguments]  ${year}
    Input Text  adress  ${year}

Set Howpublished
    [Arguments]  ${year}
    Input Text  howpubluihsed  ${year}

Set Month
    [Arguments]  ${year}
    Input Text  Month  ${year}

Set School
    [Arguments]  ${year}
    Input Text  School  ${year}

Submit Reference
    Click Button  Submit Reference


Select Article
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     Article

Select Book
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     Book

Select Booklet
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     Booklet

Select MasterThesis
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     MasterThesis

Add Premade Article
    Select Article
    Set Title  Book of rhymes 2
    Set Author  Eminem
    Set Journal  Jonne
    Set Year  70
    Set Number  3
    Set Pages  1-99
    Submit Reference

Add Another Premade Article
    Select Article
    Set Title  Book of rhymes 3
    Set Author  Eminem
    Set Journal  Jonne
    Set Year  71
    Set Number  3
    Set Pages  1-99
    Submit Reference

These Should Be Equal
    [Arguments]  ${val1}  ${val2}
    ${val1}==${val2}

Empty The table
    Wait Until Element Is Visible    id:entrylist
    ${rows}=    Get Element Count    //table[@id="entrylist"]/tbody/tr
    FOR    ${row_num}    IN RANGE    1    ${rows+1}
        ${button}=    Get WebElement   //table[@id="entrylist"]/tbody/tr[1]/th[5]/button  
        Click Element  ${button}
    END