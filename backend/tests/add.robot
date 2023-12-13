*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page


*** Test Cases ***

User can access the site
    Main Page Should Be Open

User can add a valid article
    Empty The Table
    Select Article
    Set Citekey  2
    Set Title  Book of rhymes
    Set Author  Marshall Bruce Mathers III
    Set Journal  Jonne
    Set Year  69
    Submit Reference
    Sleep  1
    Row Count Should Be  1  articlelist
    Empty The Table

User can add a valid Book
    Select Book
    Set Citekey  3
    Set Author   George RR Martin
    Set Title  Winds of Winter
    Set Publisher  Wonderland CORP 
    Set Year  2023
    Submit Reference
    Row Count Should Be  1  booklist
    Empty The Table

User can add a valid Inproceeding
    Empty The Table
    Select Inproceedings
    Set Citekey  4
    Set Title  Nursery Rhymes
    Set Author  Mary Poppins
    Set Year  1980
    Set BookTitle  Filler
    Submit Reference
    Row Count Should Be  1  inproceedingslist
    Empty The Table






