*** Settings ***
Library  SeleniumLibrary
Library  ./AppLibrary.py

*** Variables ***
${SERVER}  localhost:5173
${DELAY}  0.1 seconds
${HOME_URL}  http://${SERVER}/index.html


*** Keywords ***
Open And Configure Browser
    ${options}  Evaluate  sys.modules['selenium.webdriver'].FirefoxOptions()  sys
    #Call Method  ${options}  add_argument  --headless
    Open Browser  browser=firefox  options=${options}
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

Set Citekey
    [Arguments]  ${citekey}
    Input Text  citekey  ${citekey}

Submit Reference
    Click Button  Submit Reference


Select Article
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     article

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
    Set Citekey  22
    Set Title  Book of rhymes 2
    Set Author  Eminem
    Set Journal  Jonne
    Set Year  70
    #Set Number  3
    #Set Pages  1-99
    Submit Reference

Add Another Premade Article
    Select Article
    Set Citekey  23
    Set Title  Book of rhymes 3
    Set Author  Eminem
    Set Journal  Jonne
    Set Year  71
    #Set Number  3
    #Set Pages  1-99
    Submit Reference



Empty The table
#when delete is fixed to update instantly change for loop to use 1 instead of row num
    Wait Until Element Is Visible    id:entrylist
    ${rows}=    Get Element Count    //table[@id="entrylist"]/tbody/tr
    FOR    ${row_num}    IN RANGE    1    ${rows+1}
        ${button}=    Get WebElement   //table[@id="entrylist"]/tbody/tr[${row_num}]/th[5]/button  
        Click Element  ${button}
    END
    Sleep  1
    Go To Main Page

Check Table Row
    [Arguments]  ${selected_row}  ${expected_value}
    @{cells}=    Get WebElements    //table[@id="entrylist"]/tbody/tr[${selected_row}]
    ${data}=    Create List
    FOR    ${cell}    IN    @{cells}
        Sleep    1s
        Wait Until Element Is Visible    ${cell}
        ${text}=    Get Element Attribute    ${cell}    innerText
        ${data}=    Evaluate    [cell.text for cell in $cells]
        Log    ${cell} contains text: ${text}
    END
    Log    row ${selected_row} data: ${data}
    Should Be Equal As Strings  ${data}   ${expected_value}

Row Count Should Be
    [Arguments]  ${expected_value}
    ${rows}=    Get Element Count    //table[@id="entrylist"]/tbody/tr
    Should Be Equal As Strings  ${rows}   ${expected_value}

Table Should Be Empty
    Row Count Should Be  0