chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked, injecting content script into tab:", tab.id);

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    }, () => {
        console.log("Content script injected and executed.");
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'traitsFound') {
        const totalTraitsFound =
            (request.maneTypes?.length || 0) +
            (request.maneColors?.length || 0) +
            (request.baseColors?.length || 0) +
            (request.eyeColors?.length || 0) +
            (request.skinColors?.length || 0) +  // Include skin colors in the count
            (request.markings?.length || 0);

        if (totalTraitsFound > 0) {
            console.log(`Total Traits Found: ${totalTraitsFound}`);
            console.log("Mane Types:", request.maneTypes);
            console.log("Mane Colors:", request.maneColors);
            console.log("Base Colors:", request.baseColors);
            console.log("Eye Colors:", request.eyeColors);
            console.log("Skin Colors:", request.skinColors);  // Log skin colors
            console.log("Markings:", request.markings);
        } else {
            console.log("No BO Traits Found: May not be updated with newest traits!");
        }

        // Send the data to the popup
        chrome.runtime.sendMessage({
            type: 'updatePopup',
            totalTraitsFound: totalTraitsFound,
            maneTypes: request.maneTypes,
            maneColors: request.maneColors,
            baseColors: request.baseColors,
            eyeColors: request.eyeColors,
            skinColors: request.skinColors,  // Include skin colors in the message
            markings: request.markings,
            noTraitsFoundMessage: totalTraitsFound === 0 ? "No BO Traits Found: May not be updated with newest traits!" : null
        });
    }
});
