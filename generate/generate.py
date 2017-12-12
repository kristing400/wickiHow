import json
import random
import re
import unicodedata
from nltk import word_tokenize, pos_tag
import nltk.data
from nltk.corpus import wordnet
import os.path
from rake_nltk import Rake

'''
Basic Structure:
Intro: 4 sentences
      * sentences 1-4 will be "similar" to title
        with threshold = 0.80 and maxIteraton of 60
Part 1: 1- 4 sub steps
      * each sub step has 1 - 6 lines
      * each sentence is "similar" with
        threshold = 0.60
Part 2: 1- 4 sub steps
        each sub step has 1 - 6 lines
Part 3: 1- 4 sub steps
        each sub step has 1 - 6 lines
'''

def similarityScore(wordlist1,wordlist2):
    tempList = []
    # print(words)
    for word1 in wordlist1:
        for word2 in wordlist2:
            wordFromKeywords = wordnet.synsets(word1)
            wordFromWordsList = wordnet.synsets(word2)
            if wordFromKeywords and wordFromWordsList:
                s = wordFromKeywords[0].wup_similarity(wordFromWordsList[0])
                if s:
                    tempList.append(s)
    if len(tempList):
        return max(tempList)
    else:
        return None

def randomize(title):
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    fn = os.path.join(os.path.dirname(__file__), 'database.json')
    #intro: 4 rand sentences
    #3 parts: random # of step (1-4) => each has 1 - 6 lines
    nsteps= [0,0,0]

    with open(fn) as json_data:
        d = json.load(json_data)
        n = len(d['stories'])

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

            KW = r.get_ranked_phrases() # To get keyword phrases ranked highest to lowest.
            # K = word_tokenize(title)
            # catL = pos_tag(K)
            # print(catL)
            # keywords = []
            # for (wd,cat) in catL:
            #     if (wd in KW) and (cat == "NN" or cat == "NNS" or cat == "NNP"):
            #         keywords.append(wd)
            # Error handling
            # if not len(keywords):
            keywords = []
            for phrase in KW:
                keywords += phrase.split(" ")
            # print(keywords)


        # images = d['images']
        # imagesLen = len(images)

        # generate intro
        tried = set()
        intro=[]
        for i in range(4):
            threshold = 0.80
            met = False
            numberOfTriedArticles = 0
            maxTries = 60
            bestLine = None
            bestScore = 0

            while not met:
                introLen = 0
                if numberOfTriedArticles >= maxTries:
                    line = bestLine
                    break
                # print("count",numberOfTriedArticles)
                while introLen == 0:
                    articleIndex = random.randint(0,n-1)
                    page = d['stories'][list(d['stories'].keys())[articleIndex]]
                    article_intro = page['intro']
                    # split article into sentences
                    # article_intro = unicodedata.normalize('NFKD', article_intro).encode('ascii','ignore')
                    article_intro = tokenizer.tokenize(article_intro)
                    introLen = len(article_intro)

                j = random.randint(0,introLen-1)
                if(articleIndex,j) in tried:
                    # print("tried already")
                    continue
                tried.add((articleIndex,j))
                line = article_intro[j].strip()
                words = line.split(' ')
                maxCurList = similarityScore(keywords,words)
                if not maxCurList:
                    numberOfTriedArticles +=1
                    continue
                # print(maxCurList,bestScore)
                if maxCurList >= threshold:
                    met = True
                elif maxCurList >= bestScore:
                    bestScore = maxCurList
                    bestLine = line
                # print(maxCurList)
                numberOfTriedArticles +=1
            # print(line)
            # tok_line = word_tokenize(line)
            # catLine = pos_tag(tok_line)
            # newLine = []
            # found = False
            # for (wd,cat) in catLine:
            #     if (not found) and (cat == "NN" or cat == "NNS" or cat == "NNP"):
            #         found = True
            #         newLine.append(keywords[0])
            #     else:
            #         newLine.append(wd)

            intro.append(line)
        intro = " ".join(intro)
        parts = []
        partsThreshold = [0.6,0.3,0]
        # 3 parts
        for i in range(3):
            res = {}
            currentThreshold = partsThreshold[i]
            res["partNumber"] = str(i+1)
            res["steps"] = []
            # generate part title
            score = None
            # print(score,currentThreshold)
            while (not score) or (score < currentThreshold):
                articleIndex = random.randint(0,n-1)

                article = d['stories'][list(d['stories'].keys())[articleIndex]]
                article_step = article["steps"]
                articleStepLen = len(article_step)
                step = article_step[random.randint(0,articleStepLen-1)]
                # step = unicodedata.normalize('NFKD', step).encode('ascii','ignore')
                currentStep = tokenizer.tokenize(step)[0]
                score = similarityScore(keywords,currentStep.split(" "))
                # print("threshold", currentThreshold,"score",score)

            #get subtitle keywords
            res["subtitle"] = currentStep
            r = Rake()
            r.extract_keywords_from_text(currentStep)
            keyPhrases = r.get_ranked_phrases()
            subtitleKeywords = []
            for phrase in keyPhrases:
                subtitleKeywords += phrase.split(" ")

            # print(subtitleKeywords)

            stepLen = random.randint(1,4)
            nsteps[i] = stepLen
            # (1-4) substeps
            for j in range(stepLen):
                stepRes = {}
                # stepRes['img'] = images[random.randint(0,imagesLen - 1)]
                stepRes["stepNumber"] = str(j+1)
                linesLen = random.randint(2,6)
                p = []
                # (2-6) lines in each step
                for lineI in range(linesLen):
                    score1, score2 = None, None
                    while (not score1) or (not score2) or (score1 < currentThreshold) or (score2 < currentThreshold):
                        article = d['stories'][list(d['stories'].keys())[random.randint(0,n-1)]]
                        article_step = article["steps"]
                        articleStepLen = len(article_step)
                        step = article_step[random.randint(0,articleStepLen-1)]
                        # step = unicodedata.normalize('NFKD', step).encode('ascii','ignore')
                        step = tokenizer.tokenize(step)
                        # lol cased on first instance to get title of step D=
                        if lineI == 0:
                            selectedLine = step[0]
                            # check partsThreshold
                        else:
                            randi = random.randint(0,len(step) -1)
                            selectedLine = step[randi].strip()
                        # take out unecessary brackets
                        if re.search("\[\w+\]",selectedLine):
                            r = re.compile(r"\[(\w+)\]")
                            selectedLine = r.sub(r'',selectedLine).strip()
                        score1 = similarityScore(keywords,selectedLine.split(" "))
                        score2 = similarityScore(subtitleKeywords,selectedLine.split(" "))


                    # add to res strcture
                    if lineI >0:
                        p.append(selectedLine)
                    else:
                        stepRes['title'] = selectedLine + " "
                        imagesLen = len(article['images'])
                        stepRes['img'] = article['images'][random.randint(0,imagesLen-1)]

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
