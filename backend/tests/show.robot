*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page

*** Test Cases ***

User can access the site
    Main Page Should Be Open

User can select any of the given type
    Select Article
    Select Book
    Select Booklet
    Select MasterThesis

User can see added entries
    Add Premade Article
    Add Another Premade Article
    ${rows}=    Get Element Count    //table[@id="entrylist"]/tbody/tr
    Should Be Equal  ${rows}   2
    
    
    @{cells}=    Get WebElements    //table[@id="entrylist"]/tbody/tr[1]
    ${data}=    Create List
    FOR    ${cell}    IN    @{cells}
        Sleep    1s
        Wait Until Element Is Visible    ${cell}
        ${text}=    Get Element Attribute    ${cell}    innerText
        ${data}=    Evaluate    [cell.text for cell in $cells]
        Log    ${cell} contains text: ${text}
    END
    Log    data: ${data}
    Should Be Equal As Strings  ${data}    ['Eminem Jonne Book of rhymes 2 70 Delete']
    
    @{cells}=    Get WebElements    //table[@id="entrylist"]/tbody/tr[2]
    ${data}=    Create List
    FOR    ${cell}    IN    @{cells}
        Sleep    1s
        Wait Until Element Is Visible    ${cell}
        ${text}=    Get Element Attribute    ${cell}    innerText
        ${data}=    Evaluate    [cell.text for cell in $cells]
        Log    ${cell} contains text: ${text}
    END
    Log    data: ${data}

    Should Be Equal As Strings  ${data}    ['Eminem Jonne Book of rhymes 3 71 Delete']
    
    Empty The Table


*** Keywords ***
Add Row Data
    [Arguments]    ${row_data}
    Set Global Variable    ${all_data}    @{all_data} + [${row_data}]


*** Variables ***
${all_data}    Create List
