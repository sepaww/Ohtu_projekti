from UI import run

def main(datab):
    runner=run.Run(datab)
    runner.start()
    print('main running')


main('repository.datab.db')
