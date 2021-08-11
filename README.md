# Text Analyzer add-on for Google Doc
---
## How to setup the enivronment
The add on is not deployed on Google workspace marketplace so, it can't be accessed directly. 

---

#### Create Google document then open tools->Script editor

Then setup below filesystem and copy-paste the code.
```bash
code.gs
sidebar.html
stylesheet.html
javascript.html
```
### How to use
* Once above steps are done save the file and refresh that particular document.

* Then open Add-ons you will see **NLP** open it and click analyze. Then a sidebar will appear.

* In order to process the data you have to select the text you want to analyzed once that is done click **Analyze Text** and you will be able to get your relevant information.

### Disclaimer: 

* The initial request may take some time or may not even successfully processed. Because inactivity on server might cause it to reboot.

* This add-on will only be available for the document you used to create the script.(Won't be available for every document.)

# Text Analysis

It uses **spacy** python library to analyze our data.

### API ENDPOINT

https://doc-add-on.herokuapp.com/analyze-text/

### The app is hosted on Heroku app platform.

https://doc-add-on.herokuapp.com/
