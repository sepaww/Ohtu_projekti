*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page

*** Test Cases ***

User can Generate A Citekey For Reference By Clicking Generate Button
    Empty The Table
    Select Article
    Set Title  Book of rhymes
    Set Author  Marshall Bruce Mathers III
    Set Journal  Jonne
    Set Year  69
    Click Button  generate-citekey
    Submit Reference
    Sleep  100ms
    Row Count Should Be  1  articlelist
    Empty The Table