# Wikisolver
A website that finds the path from one Wikipedia page to another by only traversing hyperlinks found on Wikipedia pages. This implementation gets rid of the need for a database of results by using NLP to guess choices instead, more like how a human would play this game. 
## Interesting examples
![demo1](https://i.imgur.com/evRBY70.png)
![demo1](https://i.imgur.com/9toLzwj.png)
![demo1](https://i.imgur.com/MevB2nH.png)

## Hosting
You can run this locally by doing 
```
npm start
```
for the client and 
```
python app.py
```
for the backend after downloading wordnet. 
## Notes
The speed of the demo site is drastically slower than a realistic implementation, as it is hosted on a Heroku free plan. Calculation time can take 1-2 minutes. Normally this should take 4-5 seconds.