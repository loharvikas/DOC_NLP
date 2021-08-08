function onInstall() {
  onOpen();
  analyzeData("s popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions ofLorem ")
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
  return text;
}


function analyzeData(text) {
  let url = "https://33dad1944753.ngrok.io/analyze-text/";
  let payload = {
    "data": text
  }
  let options= {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(text)
  }
  console.log(payload)
  let response = UrlFetchApp.fetch(url, options)
  let responseContent = response.getContentText();
  let data = JSON.parse(responseContent);
  console.log(data.data.parts_of_speech)
  let metrics = data["metrics"]
  return data
 
}

