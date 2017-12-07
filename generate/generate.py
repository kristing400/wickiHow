import json
import random
import re
import unicodedata
import nltk.data
import os.path
from rake_nltk import Rake


def randomize(title):
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    fn = os.path.join(os.path.dirname(__file__), 'database.json')


    #intro: 4 rand sentences
    #3 parts: random # of step (1-4) => each has 1 - 6 lines
    nsteps= [0,0,0]
    with open(fn) as json_data:
        d = json.load(json_data)
        n = len(d['stories'])
        keywords = None

        if not title:
            title_i = random.randint(0,n-1)
            maintitle = list(d['stories'].keys())[title_i]
            # maintitle = unicodedata.normalize('NFKD', maintitle).encode('ascii','ignore')
            maintitle = maintitle[4:]
        else:
            #title exists, use RAKE to find keywords
            maintitle = title
            r = Rake() # Uses stopwords for english from NLTK, and all puntuation characters.

            # If you want to provide your own set of stop words and punctuations to
            # r = Rake(<list of stopwords>, <string of puntuations to ignore>)

            r.extract_keywords_from_text(maintitle)

            keywords = r.get_ranked_phrases() # To get keyword phrases ranked highest to lowest.
            print(keywords)


        images = d['images']
        imagesLen = len(images)


        intro=[]
        for i in range(4):
            introLen = 0

            while introLen == 0:
                page = d['stories'][list(d['stories'].keys())[random.randint(0,n-1)]]
                article_intro = page['intro']
                # article_intro = unicodedata.normalize('NFKD', article_intro).encode('ascii','ignore')
                article_intro = tokenizer.tokenize(article_intro)
                introLen = len(article_intro)

            j = random.randint(0,introLen-1)
            line = article_intro[j].strip()
            intro.append(line)
        intro = " ".join(intro)
        parts = []
        # 3 parts
        for i in range(3):
            res = {}
            res["partNumber"] = str(i+1)
            res["steps"] = []
            article = d['stories'][list(d['stories'].keys())[random.randint(0,n-1)]]
            article_step = article["steps"]
            articleStepLen = len(article_step)
            step = article_step[random.randint(0,articleStepLen-1)]
            # step = unicodedata.normalize('NFKD', step).encode('ascii','ignore')
            step = tokenizer.tokenize(step)
            res["subtitle"] = step[0]
            stepLen = random.randint(1,4)
            nsteps[i] = stepLen
            # (1-4) steps
            for j in range(stepLen):
                stepRes = {}
                stepRes['img'] = images[random.randint(0,imagesLen - 1)]
                stepRes["stepNumber"] = str(j+1)
                linesLen = random.randint(2,6)
                p = []
                # (2-6) lines in each step
                for lineI in range(linesLen):
                    article = d['stories'][list(d['stories'].keys())[random.randint(0,n-1)]]
                    article_step = article["steps"]
                    articleStepLen = len(article_step)
                    step = article_step[random.randint(0,articleStepLen-1)]
                    # step = unicodedata.normalize('NFKD', step).encode('ascii','ignore')
                    step = tokenizer.tokenize(step)
                    if lineI == 0:
                        selectedLine = step[0]
                        stepRes['title'] = selectedLine + " "
                    else:
                        randi = random.randint(0,len(step) -1)
                        selectedLine = step[randi].strip()
                    if re.search("\[\w+\]",selectedLine):
                        r = re.compile(r"\[(\w+)\]")
                        selectedLine = r.sub(r'',selectedLine).strip()
                    if lineI >0:
                        p.append(selectedLine)
                p = " ".join(p)
                stepRes['content'] = p
                res["steps"].append(stepRes)
            parts.append(res)
    output = {
        "title": maintitle,
        "intro": intro,
        "part1": parts[0],
        "part2": parts[1],
        "part3": parts[2]
    }
    return output


if __name__ == '__main__':
    # test1.py executed as script
    # do something
    while True:
        try:
            randomize(None)
        except:
            continue
        break
# with open('randomized.json', 'w') as outfile:
#     json.dump(output, outfile)
# print(output)
# nth = 0
# for part in parts:
#     assert(len(part['steps']) == nsteps[nth])
#     nth += 1
# print(parts)
