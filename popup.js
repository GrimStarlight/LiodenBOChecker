document.getElementById('searchButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
        }, () => {
            console.log("Content script executed.");
        });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'updatePopup') {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `<p>Total Traits Found: ${request.totalTraitsFound}</p>`;

        if (request.noTraitsFoundMessage) {
            resultsDiv.innerHTML += `<p>${request.noTraitsFoundMessage}</p>`;
        } else {
          if (request.baseColors.length > 0) {
              resultsDiv.innerHTML += `<br> ${request.baseColors.join('<br> ')}`;
          }
          if (request.skinColors && request.skinColors.length > 0) {
              resultsDiv.innerHTML += `<br> ${request.skinColors.join('<br> ')}`;  // Add skin colors to the display
          }
          if (request.eyeColors.length > 0) {
              resultsDiv.innerHTML += `<br> ${request.eyeColors.join('<br> ')}`;
          }
            if (request.maneTypes && request.maneTypes.length > 0) {
                resultsDiv.innerHTML += `<br> ${request.maneTypes.join('<br> ')}`;
            }
            if (request.maneColors.length > 0) {
                resultsDiv.innerHTML += `<br> ${request.maneColors.join('<br> ')}`;
            }
            if (request.markings && request.markings.length > 0) {
                resultsDiv.innerHTML += `<br> ${request.markings.join('<br> ')}`;
            }
        }
    }
});
