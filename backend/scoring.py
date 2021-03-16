from nltk.corpus import wordnet
import scraper
import sys


def compare(word1, word2):
    # compares two words and calculates how similar they are
    if word1 == word2:
        return 2
    syn1 = wordnet.synsets(word1)
    syn2 = wordnet.synsets(word2)
    if len(syn1) == 0 or len(syn2) == 0:
        return 0

    similarity = syn1[0].wup_similarity(syn2[0])

    if similarity:
        return similarity

    return 0


def rank(words, target, query_size):
    # takes a list of words and calculates each words similarity to the target, redefining each element to be a 2-d array
    # also only returns a query_size amount of words at most, with highest similarity taking priority
    for i in range(len(words)):
        words[i] = [words[i], compare(words[i], target)]

    words.sort(key=lambda x: x[1])
    if query_size >= len(words):
        return words

    return words[-1 * query_size:]


def search(w1, w2, breadth):
    # starts a breadth first search and returns a search history
    if not w1.isalpha() or not w2.isalpha() or breadth > 100 or breadth < 1:
        return []

    history = []
    visited = set()
    visited.add(w1)
    w1 = [w1]
    history.append([w1[::] + [compare(w1[0], w2)] + [0]])
    loops = 0
    while w2 not in w1:
        loops += 1
        if loops > 100:
            return []
        for i in range(len(w1)):
            result = rank(scraper.get_topics(
                'https://en.wikipedia.org/wiki/' + w1[0]), w2, 100)
            for j in range(len(result)-1, -1, -1):
                if result[j][0] in visited:
                    del result[j]
            del w1[0]
            w1 += [x + [i] for x in result]
        w1.sort(key=lambda x: x[1])
        if len(w1) >= breadth:
            w1 = w1[-1 * breadth:]
        for w in w1:
            visited.add(w[0])
        history.append(w1[::])
        for i in range(len(w1)):
            w1[i] = w1[i][0]

    for i in range(len(history[-1])):
        if history[-1][i][0] == w2:
            history[-1][i].append(1)
        else:
            history[-1][i].append(0)

    for i in range(len(history) - 1, 1, -1):
        for j in range(len(history[i])):
            if history[i][j][3] == 1:
                history[i-1][history[i][j][2]].append(1)
        for k in range(len(history[i-1])):
            if len(history[i-1][k]) < 4:
                history[i-1][k].append(0)

    return history
