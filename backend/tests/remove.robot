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

The Removed Entries Are Deleted In Real Time
    Mass Add Articles
    Row Count Should Be  7
    Delete One Row
    Row Count Should Be  6
    Delete One Row
    Row Count Should Be  5
    Delete One Row
    Row Count Should Be  4
    Delete One Row
    Row Count Should Be  3
    Delete One Row
    Row Count Should Be  2
    Delete One Row
    Row Count Should Be  1
    Delete One Row

Upon Removal The User Is Alerted If They Are Sure Of The Deletion
    Add Premade Article
    Affirmation Should Not Be Visible
    Delete one Row Without Affirmation
    Affirmation Should Be Visible
    Confirm Deletion
    Affirmation Should Not Be Visible
