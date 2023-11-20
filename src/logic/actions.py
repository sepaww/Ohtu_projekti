def article_printer(articles):
    if len(articles)==0:
        print('no articles added')
        return
    citation = ["author","title","journal","year","volume","number","pages"]
    for article in articles:
        print('--------')
        for i in range(len(article)-1):
            print(f'{citation[i]}: {article[i]}')
    print('--------')
    
class Add():
    def __init__(self, DB):
        self.DB=DB
        self.get_type()
        
    def get_type(self):
        text_type=input('what type of text? a=article')
        if text_type=='a':
            values=[]
            values.append(input('author: '))
            values.append(input('title: '))
            values.append(input('journal: '))
            values.append(input('year: '))
            values.append(input('volume: '))
            values.append(input('number: '))
            values.append(input('pages: '))
            self.DB.add_article(values)
        else: print('not implemented yet')
        return 1
class Show():
    def __init__(self, DB):
        self.DB=DB
        self.get_type()
    def get_type(self):
        text_type=input('what type of text? a=article')
        if text_type=='a':
            articles=self.DB.get_articles()
            article_printer(articles)
        else: print('not implementation for that type')
        return 1
            
            
class Quit():
    def __init__(self):
        self.val=0
        self.quit()
    def quit(self):
        return self.val
            
        