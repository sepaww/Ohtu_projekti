*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page

*** Test Cases ***
User Can Download The Added Citations In A Bibtext Formatted File
    Mass Add Articles
    Download the Bibtext File
    #File Should Be Correctly Formatted
    Empty The Table
    #tiedoston sisällön oikeellisuus testattu yksikkö testeissä backend\tests\test_data_service.py

    



