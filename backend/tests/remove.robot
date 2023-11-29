*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page


*** Test Cases ***
User can remove added entries
    Add Premade Article
    Add Another Premade Article
    Empty The Table
    Table Should Be Empty


