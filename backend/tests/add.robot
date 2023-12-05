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
    Set Author  Eminem
    Set Journal  Jonne
    Set Year  69
    #Set Number  3
    #Set Pages  1-99
    Submit Reference
    Sleep  1
    Row Count Should Be  1
    Empty The Table

#User can add a valid Book
#    Select Book
#    Set Author   George R.R. Martin
#    Set Title  Winds of Winter
#    Set Publisher  Wonderland CORP 
#    Set Adress  Quality Street 1
#    Set Year  2023

#User can add a valid Booklet
#    Select Booklet
#    Set Title  Nursery Rhymes
#    Set Author  Mary Poppins
#    Set Howpublished  Fell from sky
#    Set Month  Jul 
#    Set Pages  3-5

#User can add a valid MasterThesis
#    Select MasterThesis
#    Set Title  Sampo
#    Set Author  Jami
#    Set School  University of Helsinki
#    Set Pages  2,4
#    Set Publisher  WSOY.JAK
#    Set Month  Jan





