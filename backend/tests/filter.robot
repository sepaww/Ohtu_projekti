*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Go To Main Page

*** Test Cases ***
#year_filter
User Can Filter The References By The Value Of Year
    Mass Add Articles
    Row Count Should Be  7
    Filter By Year  2023  2023
    Row Count Should Be  3
    Table Row Should Contain    entrylist    1     PAUL NEWBERRY Associated Press No. 8 Alabama knocks off No. 1 Georgia 27-24 for SEC title. Both teams await postseason fate 2023 AP_news1 Delete
    
    Table Row Should Contain    entrylist    2   meikä imagination apples are not real 2023 source_me Delete

    Table Row Should Contain    entrylist    3    JASON ADAMS Associated Press NASA Announces Successful Launch of Next-Generation Space Telescope. Astronomers eager for new discoveries. 2023 AP_news6 Delete 
    Filter By Year  2020  2020
    Table Row Should Contain    entrylist    1   EMMA MARTIN Associated Press Breakthrough in Medical Research: Promising Treatment for Common Cold Discovered. Potential global impact. 2020 AP_news5 Delete
    
User Can FIlter The References By The Value Of year In The Range Of Multiple Years
    Filter By Year   2020  2021
    Row Count Should Be  3
    Table Row Should Contain    entrylist    1   JESSICA ANDERSON Associated Press No. 5 Texas Upsets No. 2 Oklahoma 35-31 in Big 12 Championship. Playoff picture unfolds. 2021 AP_news2 Delete
    Table Row Should Contain    entrylist    2   RYAN CARTER Associated Press Serena Williams Makes a Triumphant Return to Tennis with Grand Slam Victory. Fans celebrate her comeback. 2021 AP_news4 Delete
    Table Row Should Contain    entrylist    3   EMMA MARTIN Associated Press Breakthrough in Medical Research: Promising Treatment for Common Cold Discovered. Potential global impact. 2020 AP_news5 Delete
    Filter By Year   2020  2023
    #Empty The Table

User Can Filter The References By The Values Of Title
    Filter By Title  Tampa Bay
    Table Row Should Contain    entrylist    1   MICHELLE WILLIAMS Associated Press Tom Brady Leads Tampa Bay Buccaneers to Super Bowl Victory. Historic win for the Buccaneers. 2022 AP_news3 Delete
    Filter By Title  Space Telescope
    Table Row Should Contain    entrylist    1   JASON ADAMS Associated Press NASA Announces Successful Launch of Next-Generation Space Telescope. Astronomers eager for new discoveries. 2023 AP_news6 Delete
    Clear Filtering
User Can Filter The References By The Values Of Author
    Filter By Author  EMMA MARTIN
    Row Count Should Be  1
    Table Row Should Contain    entrylist    1   EMMA MARTIN Associated Press Breakthrough in Medical Research: Promising Treatment for Common Cold Discovered. Potential global impact. 2020 AP_news5 Delete
    Filter By Author  JESSI
    Row Count Should Be  1
    Table Row Should Contain    entrylist    1   JESSICA ANDERSON Associated Press No. 5 Texas Upsets No. 2 Oklahoma 35-31 in Big 12 Championship. Playoff picture unfolds. 2021 AP_news2 Delete
    Clear Filtering

User Can Filter The References By Year And Title or Author At The Same Time 
    Filter By Title  in
    Row Count Should Be  3
    Filter By Year  2021  2021
    Row Count Should Be  1
    Table Row Should Contain    entrylist    1   JESSICA ANDERSON Associated Press No. 5 Texas Upsets No. 2 Oklahoma 35-31 in Big 12 Championship. Playoff picture unfolds. 2021 AP_news2 Delete
    Row Count Should Be  1
    Clear Filtering

    Filter By Year  2022  2023  
    Row Count Should Be  4
    Filter By Author  MS 
    Row Count Should Be  2
    Table Row Should Contain    entrylist    1   MICHELLE WILLIAMS Associated Press Tom Brady Leads Tampa Bay Buccaneers to Super Bowl Victory. Historic win for the Buccaneers. 2022 AP_news3 Delete
    Table Row Should Contain    entrylist    2   JASON ADAMS Associated Press NASA Announces Successful Launch of Next-Generation Space Telescope. Astronomers eager for new discoveries. 2023 AP_news6 Delete
    Clear Filtering
    Filter By Year  2020  2023  
    Empty The Table
