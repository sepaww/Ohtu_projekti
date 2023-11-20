from repository.sql_commands import  Command
from logic.actions import Add, Show, Quit





class Run:
    def __init__(self, database):
        self.DB=Command(database)
        
    #Tän vois enum    
    def get_action(self, action):
        if action=='a':
            return Add(self.DB)
        elif action=='s':
            articles=Show(self.DB)
            return 1
        elif action=='q':
            return Quit()
        else: print('invalid action')
        return 1
    
    
    def start(self):
        print('Running bibtext handler')
        while(1):
            val=self.get_action(input('what action? a=Add, s=Show, q=Quit: '))
            if not val:
                break
        print('stopped running')
        
        
        
        