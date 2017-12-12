import json

fileNum = 8
res = {}
for i in range(8):
    fn = './scraped_data/output%d.json' % (i)
    with open(fn) as json_data:
        d = json.load(json_data)
        res = {**res,**d['stories']}
    print(len(res))
with open('database.json', 'w') as outfile:
    json.dump({'stories':res}, outfile)
