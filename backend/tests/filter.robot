*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page

*** Test Cases ***
#year_filter
User Can Filter The References By The Value Of Year
    Mass Add Articles
    Row Count Should Be  7  articlelist
    Filter By Year  2023  2023
    Row Count Should Be  3  articlelist
    Table Row Should Contain    articlelist    1     PAUL NEWBERRY Associated Press No. 8 Alabama knocks off No. 1 Georgia 27-24 for SEC title. Both teams await postseason fate 2023 AP_news1 
    
    Table Row Should Contain    articlelist    2   meika laine imagination apples are not real 2023 source_me 

    Table Row Should Contain    articlelist    3    JASON ADAMS Associated Press NASA Announces Successful Launch of Next-Generation Space Telescope. Astronomers eager for new discoveries. 2023 AP_news6  
    Filter By Year  2020  2020
    Table Row Should Contain    articlelist    1   EMMA MARTIN Associated Press Breakthrough in Medical Research: Promising Treatment for Common Cold Discovered. Potential global impact. 2020 AP_news5 
    
User Can FIlter The References By The Value Of year In The Range Of Multiple Years
    Sleep    100ms
    Filter By Year   2020  2021
    Row Count Should Be  3  articlelist
    Table Row Should Contain    articlelist    1   JESSICA ANDERSON Associated Press No. 5 Texas Upsets No. 2 Oklahoma 35-31 in Big 12 Championship. Playoff picture unfolds. 2021 AP_news2 
    Table Row Should Contain    articlelist    2   RYAN CARTER Associated Press Serena Williams Makes a Triumphant Return to Tennis with Grand Slam Victory. Fans celebrate her comeback. 2021 AP_news4 
    Table Row Should Contain    articlelist    3   EMMA MARTIN Associated Press Breakthrough in Medical Research: Promising Treatment for Common Cold Discovered. Potential global impact. 2020 AP_news5 
    Filter By Year   2020  2023
    #Empty The Table

User Can Filter The References By The Values Of Title
    Filter By Title  Tampa Bay
    Table Row Should Contain    articlelist    1   MICHELLE WILLIAMS Associated Press Tom Brady Leads Tampa Bay Buccaneers to Super Bowl Victory. Historic win for the Buccaneers. 2022 AP_news3 
    Filter By Title  Space Telescope
    Table Row Should Contain    articlelist    1   JASON ADAMS Associated Press NASA Announces Successful Launch of Next-Generation Space Telescope. Astronomers eager for new discoveries. 2023 AP_news6 
    Clear Filtering
User Can Filter The References By The Values Of Author
    Filter By Author  EMMA MARTIN
    Row Count Should Be  1  articlelist
    Table Row Should Contain    articlelist    1   EMMA MARTIN Associated Press Breakthrough in Medical Research: Promising Treatment for Common Cold Discovered. Potential global impact. 2020 AP_news5 
    Filter By Author  JESSI
    Row Count Should Be  1  articlelist
    Table Row Should Contain    articlelist    1   JESSICA ANDERSON Associated Press No. 5 Texas Upsets No. 2 Oklahoma 35-31 in Big 12 Championship. Playoff picture unfolds. 2021 AP_news2 
    Clear Filtering

User Can Filter The References By Year And Title or Author At The Same Time 
    Filter By Title  in
    Row Count Should Be  3  articlelist
    Filter By Year  2021  2021
    Row Count Should Be  1  articlelist
    Table Row Should Contain    articlelist    1   JESSICA ANDERSON Associated Press No. 5 Texas Upsets No. 2 Oklahoma 35-31 in Big 12 Championship. Playoff picture unfolds. 2021 AP_news2 
    Row Count Should Be  1  articlelist
    Clear Filtering

    Filter By Year  2022  2023  
    Row Count Should Be  4  articlelist
    Filter By Author  MS 
    Row Count Should Be  2  articlelist
    Table Row Should Contain    articlelist    1   MICHELLE WILLIAMS Associated Press Tom Brady Leads Tampa Bay Buccaneers to Super Bowl Victory. Historic win for the Buccaneers. 2022 AP_news3 
    Table Row Should Contain    articlelist    2   JASON ADAMS Associated Press NASA Announces Successful Launch of Next-Generation Space Telescope. Astronomers eager for new discoveries. 2023 AP_news6 
    Clear Filtering
    Filter By Year  2020  2023  
    Empty The Table

