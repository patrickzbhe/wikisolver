import requests
from bs4 import BeautifulSoup

INVALID = ['Special', ':']


def is_valid(link):
    '''makes sure link is a legit topic'''

    if link and link[:5] == '/wiki':
        pass
    else:
        return False

    for chars in INVALID:
        if chars in link:
            return False
    return True


valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'


def trim_link(link):
    ''' trim off brackets and wiki part '''

    link = link[6:]
    output = ''
    deleting = False
    for i in range(len(link)):
        if link[i] == '(':
            deleting = True
        elif link[i] == ')':
            deleting = False
        if (not deleting) and link[i] != ')':
            if link[i] in valid:
                output += link[i]
            else:
                output += ' '

    output = output.strip()
    output = output.lower()
    return output


def get_topics(url):
    ''' scrapes all valid URLs from the wikipedia page '''
    topics = set()
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    text_content = soup.find(id='mw-content-text')
    links = text_content.find_all('a')
    for l in links:
        link = l.get('href')
        if is_valid(link):
            topics.add(trim_link(link))

    return list(topics)
