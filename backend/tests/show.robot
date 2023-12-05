*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page

*** Test Cases ***

User can access the site
    Main Page Should Be Open

User can select article type
    Select Article
    #Select Book
    #Select Booklet
    #Select MasterThesis

User can see added entries
    Add Premade Article
    Add Another Premade Article
    Row Count Should Be  2
    Table Row Should Contain    entrylist    1    Eminem Jonne Book of rhymes 2 70 Delete 22
    Table Row Should Contain    entrylist    2    Eminem Jonne Book of rhymes 3 71 Delete 23
    #Check Table Row  1  ['Eminem Jonne Book of rhymes 2 70 Delete 22']
    #Check Table Row  2  ['Eminem Jonne Book of rhymes 3 71 Delete 23']
    #Empty The Table



