*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page


*** Test Cases ***

All Types Are Stored And Listed Correctly
    Empty The Table
    Mass Add Articles
    Row Count Should Be  7  articlelist
    Empty The Table
    Mass Add Books
    Row Count Should Be  6  booklist
    Empty The Table
    Mass Add Inproceedings
    Row Count Should Be   6   inproceedingslist
    Empty The Table