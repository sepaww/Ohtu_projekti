*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page


*** Test Cases ***
User can remove added entries
    Add Premade Article
    Add Another Premade Article
    ${rows}=    Get Element Count    //table[@id="entrylist"]/tbody/tr
    FOR    ${row_num}    IN RANGE    1    ${rows+1}
        ${button}=    Get WebElement   //table[@id="entrylist"]/tbody/tr[1]/th[5]/button  
        Click Element  ${button}
    END
    ${rows}=    Get Element Count    //table[@id="entrylist"]/tbody/tr
    ${rows_int}=  Convert To String  ${rows}
    Should Be Equal   0  ${rows_int}

