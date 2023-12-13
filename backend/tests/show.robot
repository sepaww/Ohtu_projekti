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
    Row Count Should Be  2  articlelist
    Table Row Should Contain    articlelist    1    Marshall Bruce Mathers III Jonne Book of rhymes 2 70 22 Delete
    Table Row Should Contain    articlelist    2    Marshall Bruce Mathers III Jonne Book of rhymes 3 71 23 Delete
    #Check Table Row  1  ['Eminem Jonne Book of rhymes 2 70 22 Delete']
    #Check Table Row  2  ['Eminem Jonne Book of rhymes 3 71 23 Delete']
    #Empty The Table



