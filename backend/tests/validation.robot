*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page


*** Test Cases ***

A valid Year Must Be Provided To Add Any Reference
    Empty The Table
    Select Article
    Set Citekey  2
    Set Title  Book of rhymes
    Set Author  Marshall Bruce Mathers III
    Set Journal  Jonne
    Set Year  aamen 
    Submit Reference 
    Row Count Should Be  0  articlelist
    Set Year  222222222
    Submit Reference 
    Row Count Should Be  0  articlelist

    Select Book
    Set Citekey  3
    Set Author   George RR Martin
    Set Title  Winds of Winter
    Set Publisher  Wonderland CORP 
    Set Year  aamen 
    Submit Reference 
    Row Count Should Be  0  booklist
    Set Year  222222222
    Submit Reference 
    Row Count Should Be  0  booklist


    Select Inproceedings
    Set Citekey  4
    Set Title  Nursery Rhymes
    Set Author  Mary Poppins
    Set BookTitle  Filler
    Set Year  aamen 
    Submit Reference 
    Row Count Should Be  0  inproceedingslist
    Set Year  222222222
    Submit Reference  
    Row Count Should Be  0  inproceedingslist

No Reference Can Be Added With Missing Values
    Select Article
    Submit Reference 
    Row Count Should Be  0  articlelist
    Set Citekey  2
    Submit Reference 
    Row Count Should Be  0  articlelist
    Set Title  Book of rhymes
    Submit Reference 
    Row Count Should Be  0  articlelist
    Set Author  Marshall Bruce Mathers III
    Set Journal  Jonne
    Submit Reference 
    Row Count Should Be  0  articlelist
    Set Year  2222
    Submit Reference 
    Row Count Should Be  1  articlelist
    Empty The Table

Author Should Be A Valid Name And Can Handle Multiple Authors For One Reference
    Empty The Table
    Select Article
    Set Citekey  2
    Set Title  Book of rhymes
    Set Journal  Jonne
    Set Year  69
    Set Author  eminem
    Submit Reference
    Row Count Should Be  0  articlelist
    Set Author  Marshall Bruce Mathers III
    Submit Reference
    Row Count Should Be  1  articlelist
    Select Article
    Set Citekey  3
    Set Title  Book of rhymes
    Set Journal  Jonne
    Set Year  69
    Set Author  Marshall Mathers Andre Young Shawn Carter Nasir Jones Kendrick Duckworth Calvin Broadus Jr. Kanye West Dwayne Carter Jr. Curtis Jackson III Tupac Shakur
    Submit Reference
    Row Count Should Be  1  articlelist
    Set Author  Marshall Mathers and Andre Young and Shawn Carter and Nasir Jones and Kendrick Duckworth and Calvin Broadus Jr. and Kanye West and Dwayne Carter Jr. and Curtis Jackson III and Tupac Shakur
    Submit Reference
    Row Count Should Be  2  articlelist
    Empty The Table