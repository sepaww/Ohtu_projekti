
import requests


import sys
 
# setting path
#sys.path.append('..')
#from model import Entry
class AppLibrary:
    def __init__(self):
        self._base_url = "http://localhost:5173"
        
        self.reset_application()

    def reset_application(self):
        return
        #for entry in Entry.all():
        #    entry.delete()
        #requests.get(f"{self._base_url}/test/reset")
