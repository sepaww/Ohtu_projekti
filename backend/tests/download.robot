*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page

*** Test Cases ***
User Can Download The Added Citations In A Bibtext Formatted File
    Empty The Table
    Mass Add Articles
    Download the Bibtext File
    File Should Be Correctly Formatted
    Sleep  3s
    Empty The Table
    #Delete The File
    #^^ täytyy konfiguroida käyttäjän oman koneen mukaan resource.robot tiedostossa
    #tiedoston sisällön oikeellisuus testattu yksikkö testeissä backend\tests\test_data_service.py

    



