*** Settings ***
Library  SeleniumLibrary
Library  ./AppLibrary.py
Library    OperatingSystem
Library    BuiltIn
Library    Collections
*** Variables ***
${SERVER}  localhost:5173
${DELAY}  0.0 seconds
${HOME_URL}  http://${SERVER}

*** Keywords ***
Open And Configure Browser
    ${options}  Evaluate  sys.modules['selenium.webdriver'].FirefoxOptions()  sys
    #Kommentoi alempi rivi niin testit näkyvät ruudulla 
    Call Method  ${options}  add_argument  --headless
    Open Browser  browser=firefox  options=${options}
    Set Selenium Speed  ${DELAY}



Main Page Should Be Open
    Title Should Be  Bibmanager by Ryhmä2!


Go To Main Page
    Go To  ${HOME_URL}



Set Title
    [Arguments]  ${title}
    Input Text  title  ${title}

Set Author
    [Arguments]  ${author}
    Input Text  author  ${author}

Set Number
    [Arguments]  ${number}
    Input Text  number  ${number}

Set Pages
    [Arguments]  ${pages}
    Input Text  pages  ${pages}

Set Journal
    [Arguments]  ${journal}
    Input Text  journal  ${journal}

Set Year
    [Arguments]  ${year}
    Input Text  year  ${year}

Set Publisher
    [Arguments]  ${year}
    Input Text  publisher  ${year}

Set Adress
    [Arguments]  ${year}
    Input Text  adress  ${year}

Set Howpublished
    [Arguments]  ${year}
    Input Text  howpubluihsed  ${year}

Set Month
    [Arguments]  ${year}
    Input Text  Month  ${year}

Set School
    [Arguments]  ${school}
    Input Text  School  ${school}

Set Citekey
    [Arguments]  ${citekey}
    Input Text  citekey  ${citekey}

Set BookTitle
    [Arguments]  ${BookTitle}
    Input Text  booktitle  ${BookTitle}

Set Year Filter
    [Arguments]  ${min}  ${max}
    Input Text  small_year  ${min}
    Input Text  large_year  ${max}

Set Title Filter
    [Arguments]  ${title}
    Sleep  100ms
    Click Element  filter-select-button-1
    Sleep  100ms
    Click Element  title-filter
    Input Text  filter_word  ${title}
    Click Element  add_filter

Set Author Filter
    [Arguments]  ${author}
    sleep  100ms
    Click Element  filter-select-button-1
    Sleep  100ms
    Click Element  auth-filter
    Input Text  filter_word  ${author}
    Click Element  add_filter

Set All Filter
    [Arguments]  ${author}
    Sleep  100ms
    Click Element  filter-select-button-1
    Sleep  100ms
    Click Element  all-filter
    Input Text  filter_word  ${author}
    Click Element  add_filter

Clear Filtering
    Click Element  reset_button

Submit Reference
    Click Button  Submit Reference


Select Article
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     article

Select Book
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     book

Select Booklet
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     Booklet

Select Inproceedings
    Wait Until Element Is Visible    name:type
    Select From List By Value       name:type     inproceedings

Add Premade Article
    Select Article
    Sleep    500ms
    Set Citekey  22
    Set Title  Book of rhymes 2
    Set Author  Marshall Bruce Mathers III
    Set Journal  Jonne
    Set Year  70
    Submit Reference

Add Another Premade Article
    Select Article
    Sleep    500ms
    Set Citekey  23
    Set Title  Book of rhymes 3
    Set Author  Marshall Bruce Mathers III
    Set Journal  Jonne
    Set Year  71
    Submit Reference

Empty The Table With id
    [Arguments]  ${id}
    ${rows}=    Get Element Count    //table[@id="${id}"]/tbody/tr
    FOR    ${row_num}    IN RANGE    1    ${rows+1}
        ${button}=    Get WebElement   //table[@id="${id}"]/tbody/tr[1]/td[6]/button  
        Click Element  ${button}
        Sleep  100ms
        Click Button   dialog-delete
        Sleep  100ms
    END

Empty The table
    Empty The Table With id  articlelist
    Empty The Table With id  booklist
    Empty The Table With id  inproceedingslist
    Sleep  100ms

Delete one Row Without Affirmation
    Sleep  1
    ${button}=    Get WebElement   //table[@id="articlelist"]/tbody/tr[1]/td[6]/button  
    Click Element  ${button} 
    Sleep  1

Affirmation Should Not Be Visible
    Page Should Not Contain Element    id=dialog-delete

Affirmation Should Be Visible
    Page Should Contain Element    id=dialog-delete

Confirm Deletion
    Click Button    dialog-delete
    Sleep  1

Delete One Row
    Wait Until Element Is Visible    id:articlelist
    ${button}=    Get WebElement   //table[@id="articlelist"]/tbody/tr[1]/td[6]/button  
    Click Element  ${button}
    Click Button    dialog-delete

    
Check Table Row
    [Arguments]  ${selected_row}  ${expected_value}
    @{cells}=    Get WebElements    //table[@id="articlelist"]/tbody/tr[${selected_row}]
    ${data}=    Create List
    FOR    ${cell}    IN    @{cells}
        Sleep    1s
        Wait Until Element Is Visible    ${cell}
        ${text}=    Get Element Attribute    ${cell}    innerText
        ${data}=    Evaluate    [cell.text for cell in $cells]
        Log    ${cell} contains text: ${text}
    END
    Log    row ${selected_row} data: ${data}
    Should Be Equal As Strings  ${data}   ${expected_value}

Row Count Should Be
    [Arguments]  ${expected_value}  ${id}
    ${rows}=    Get Element Count    //table[@id='${id}']/tbody/tr
    Should Be Equal As Strings  ${rows}   ${expected_value}

Table Should Be Empty
    Row Count Should Be  0  articlelist

Add Article By Values
    Sleep    100ms
    [Arguments]  ${citekey}  ${title}  ${author}  ${year}  ${journal}
    Select Article
    Sleep    100ms
    Set Citekey  ${citekey}
    Set Title  ${title}
    Set Author  ${author}
    Set Year  ${year}
    Set Journal  ${journal}
    Submit Reference
    sleep  100ms
Mass Add Articles
    Add Article By Values  AP_news1  No. 8 Alabama knocks off No. 1 Georgia 27-24 for SEC title. Both teams await postseason fate  PAUL NEWBERRY  2023  Associated Press

    Add Article By Values  source_me  apples are not real  meika laine  2023   imagination  

    Add Article By Values  AP_news2  No. 5 Texas Upsets No. 2 Oklahoma 35-31 in Big 12 Championship. Playoff picture unfolds.  JESSICA ANDERSON  2021  Associated Press

    Add Article By Values  AP_news3  Tom Brady Leads Tampa Bay Buccaneers to Super Bowl Victory. Historic win for the Buccaneers.  MICHELLE WILLIAMS  2022  Associated Press

    Add Article By Values  AP_news4  Serena Williams Makes a Triumphant Return to Tennis with Grand Slam Victory. Fans celebrate her comeback.  RYAN CARTER  2021  Associated Press

    Add Article By Values  AP_news5  Breakthrough in Medical Research: Promising Treatment for Common Cold Discovered. Potential global impact.  EMMA MARTIN  2020  Associated Press

    Add Article By Values  AP_news6  NASA Announces Successful Launch of Next-Generation Space Telescope. Astronomers eager for new discoveries.  JASON ADAMS  2023  Associated Press

Add Book By Values
    [Arguments]  ${citekey}  ${title}  ${author}  ${year}  ${publisher}
    Select Book
    Sleep  100ms
    Set Citekey  ${citekey}
    Set Title  ${title}
    Set Author  ${author}
    Set Year  ${year}
    Set Publisher  ${publisher}
    Submit Reference
    sleep  100ms

Mass Add Books
    Add Book By Values  978-0-306-40615-7  "The Great Gatsby"  F. Scott Fitzgerald  1925  Scribner
    Add Book By Values  978-0-547-57886-0  "To Kill a Mockingbird"  Harper Lee  1960  JB Lippincott & Co
    Add Book By Values  978-0-141-18202-6  "1984"  George Orwell  1949  Secker & Warburg
    Add Book By Values  978-0-395-78846-0  "Pride and Prejudice"  Jane Austen  1813  T Egerton
    Add Book By Values  978-1-4027-6719-0  "Harry Potter and the Sorcerer's Stone"  JK Rowling  1997  Bloomsbury
    Add Book By Values  978-0-06-112008-4  "The Catcher in the Rye"  JD Salinger  1951  Little, Brown and Company

Add Inproceedings By Values
    [Arguments]  ${key}  ${title}  ${author}  ${year}  ${booktitle}
    Select Inproceedings
    Sleep  100ms
    Set Citekey  ${key}
    Set Title  ${title}
    Set Author  ${author}
    Set Year  ${year}
    Set BookTitle  ${booktitle}
    Submit Reference
    sleep  100ms
Mass Add Inproceedings
    Add Inproceedings By Values  ICY_2023  "Ice Cream Yodeling"  Ben Gelato  2023  "Proceedings of the International Symposium on Frozen Delights"
    Add Inproceedings By Values  ROFL_2022  "Rolling on the Floor Laughing"  Ha Ha  2022  "Laughter Conference 2022"
    Add Inproceedings By Values  WIZARD_2021  "Wizardry and Spells: A Comprehensive Guide"  Merlin Magic  2021  "Book of Magic Spells"
    Add Inproceedings By Values  TECH_2020  "Tech Trends: From AI to Zoom"  Byte Byteson  2020  "Conference on Cutting-Edge Technology"
    Add Inproceedings By Values  UFO_2019  "Unidentified Flying Objects: A Closer Look"  ET Explorer  2019  "Extraterrestrial Symposium"
    Add Inproceedings By Values  TACO_2018  "Tacos: The Ultimate Culinary Experience"  Salsa Sanchez  2018  "Taco Fiesta Proceedings"



Filter By Year
    [Arguments]  ${minvalue}  ${maxvalue}
    Set Year Filter  ${minvalue}  ${maxvalue}

Filter By Title
    [Arguments]  ${value}
    Set Title Filter  ${value}

Filter By Author
    [Arguments]  ${value}
    Set Author Filter  ${value}

Download the Bibtext File
    Click Element  export

Check If File Downloaded
    ${HOME}=    Evaluate    os.path.expanduser
    Log    Home Folder: ${HOME}
    ${file_exists}=    Run Keyword And Return Status    Test File Exists    ${HOME}/Downloads/output.bib
    Run Keyword If    not ${file_exists}    Log    File not downloaded yet
    File Should Exist    ${HOME}/Downloads/output.bib


Test File Exists
    [Arguments]    ${file_path}
    ${result}=    Run Keyword And Return Status    File Should Exist    ${file_path}
    [Return]    ${result}

File Should Be Correctly Formatted
    Set Global Variable    ${file_path}      ${CURDIR}${/}..${/}bibtex${/}output.bib
    ${file_content}    Get File    ${file_path}
    ${expected_content}  Get File  ${CURDIR}/sample.bib 
    Should Be Equal As Strings    ${file_content}    ${expected_content}

Delete The File
#Komento hakee tietokoneen juuresta kansion download. jos path ei toimi nii muuta se koneesi omaan download folder pathiin
    Set Global Variable    ${file_path}      ~${/}downloads${/}output.bib
    Remove File  ${file_path}