function onInstall() {
  // this should be in Code.gs
  onOpen();
}

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu().addItem("Analyze", "showSidebar").addToUi();
}

function showSidebar() {
  let html = HtmlService.createTemplateFromFile("sidebar").evaluate().setTitle("NLP: Text Analyzer");
  DocumentApp.getUi().showSidebar(html);
}

function getSelectedText() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  var text = [];
  if (selection) {
    let elements = selection.getSelectedElements();
    for (var i = 0; i < elements.length; ++i) {
      if (elements[i].isPartial()) {
        let element = elements[i].getElement().asText();
        let startIndex = elements[i].getStartOffset();
        let endIndex = elements[i].getEndOffsetInclusive();

        text.push(element.getText().substring(startIndex, endIndex + 1));
      } else {
        let element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip images and
        // other non-text elements.
        if (element.editAsText) {
          let elementText = element.asText().getText();
          // This check is necessary to exclude images, which return a blank
          // text element.
          if (elementText) {
            text.push(elementText);
          }
        }
      }
    }
  }
  if (!text.length) throw new Error('Please select some text.');
  let data = text.toString();
  return data
}


function analyzeData(text) {
  let url = "https://doc-add-on.herokuapp.com/analyze-text/";
  let options= {
    "method": "post",
    "contentType": "application/json",
    "payload": text
  }
  let response = UrlFetchApp.fetch(url, options)
  let responseContent = response.getContentText();
  let data = JSON.parse(responseContent);
  return data
 
}