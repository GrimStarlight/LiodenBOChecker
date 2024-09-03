(function() {
    // Function to extract text from specific table cells based on the label
    function getLionTrait(traitLabel) {
        const xpath = `//td[contains(text(), '${traitLabel}')]/following-sibling::td`;
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

        if (result.singleNodeValue) {
            return result.singleNodeValue.textContent.trim();
        } else {
            console.warn(`Failed to find element for ${traitLabel} with XPath: ${xpath}`);
            return null;
        }
    }

    // Function to load trait sources from a remote JSON file
    function loadTraitSources(callback) {
      fetch('https://grimstarlight.github.io/bocheckersources.json')  // Replace with your actual URL
          .then(response => response.json())
          .then(data => {
              console.log("Fetched Data:", data);
              callback(data);
          })
          .catch(error => console.error('Error fetching trait sources:', error));
      }

    function extractTraits(traitSources) {
        const maneType = getLionTrait("Mane Type");
        const maneColor = getLionTrait("Mane Color");
        const baseText = getLionTrait("Base");
        const eyeColor = getLionTrait("Eyes");

        if (!baseText) {
            console.error("Failed to extract base text, stopping execution.");
            return;
        }

        function splitBaseAndSkinColor(baseText) {
            const matches = baseText.match(/^(.+?)\s*\((.+?)\s+Skin\)$/);
            return matches ? { baseColor: matches[1].trim(), skinColor: matches[2].trim() } : { baseColor: baseText.trim(), skinColor: null };
        }

        const { baseColor, skinColor } = splitBaseAndSkinColor(baseText);

        console.log("Extracted Mane Type:", maneType || "Mane Type not found");
        console.log("Extracted Mane Color:", maneColor);
        console.log("Extracted Base Color:", baseColor);
        console.log("Extracted Skin Color:", skinColor || "No Skin Color Found");
        console.log("Extracted Eye Color:", eyeColor);

        function checkTraitWithSource(text, traitSources) {
            const foundTraits = [];
            for (const [source, traits] of Object.entries(traitSources)) {
                traits.forEach(trait => {
                    if (text && text.includes(trait)) {
                        foundTraits.push(`${trait} (${source})`);
                    }
                });
            }
            return foundTraits;
        }

        const foundManeTypes = checkTraitWithSource(maneType, traitSources.maneTypeSources);
        const foundManeColors = checkTraitWithSource(maneColor, traitSources.maneColorSources);
        const foundBaseColors = checkTraitWithSource(baseColor, traitSources.baseColorSources);
        const foundEyeColors = checkTraitWithSource(eyeColor, traitSources.eyeColorSources);
        const foundSkinColors = checkTraitWithSource(skinColor, traitSources.skinColorSources);
        const markingTraits = [];

        document.querySelectorAll('.table.table td').forEach(td => {
            const marking = td.textContent.trim();
            const foundMarkings = checkTraitWithSource(marking, traitSources.markingSources);
            if (foundMarkings.length > 0) {
                markingTraits.push(...foundMarkings);
            }
        });

        chrome.runtime.sendMessage({
            type: 'traitsFound',
            maneTypes: foundManeTypes,
            maneColors: foundManeColors,
            baseColors: foundBaseColors,
            eyeColors: foundEyeColors,
            skinColors: foundSkinColors,
            markings: markingTraits
        });
    }

    // Load trait sources and then extract traits
    loadTraitSources(traitSources => extractTraits(traitSources));
})();
