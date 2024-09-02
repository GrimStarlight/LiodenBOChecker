(function() {
    // Function to extract text from specific table cells based on the label (e.g., Mane Color, Base, Eyes)
    function getLionTrait(traitLabel) {
        const xpath = `//td[contains(text(), '${traitLabel}')]/following-sibling::td`;
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

        if (result.singleNodeValue) {
            const extractedText = result.singleNodeValue.textContent.trim();
            console.log(`Extracted ${traitLabel}:`, extractedText); // Log the exact extracted text
            return extractedText;
        } else {
            console.error(`Failed to find element for ${traitLabel} with XPath: ${xpath}`);
            return null;
        }
    }

    // Function to split base color and skin color
    function splitBaseAndSkinColor(baseText) {
        // Example format: "Base Color (Skin Color Skin)"
        const matches = baseText.match(/^(.+?)\s*\((.+?)\s+Skin\)$/);
        if (matches) {
            return {
                baseColor: matches[1].trim(),
                skinColor: matches[2].trim()
            };
        } else {
            console.log(`Base text does not match expected pattern: "${baseText}"`);
            return {
                baseColor: baseText.trim(),
                skinColor: null
            };
        }
    }

    // Extract mane type, mane color, base color, and eye color
    const maneType = getLionTrait("Mane Type");
    const maneColor = getLionTrait("Mane Color");
    const baseText = getLionTrait("Base");
    const eyeColor = getLionTrait("Eyes");

    // Ensure that baseText is being extracted
    if (!baseText) {
        console.error("Failed to extract base text, stopping execution.");
        return;
    }

    // Split base text into base color and skin color
    const { baseColor, skinColor } = splitBaseAndSkinColor(baseText);

    // Log the extracted values for debugging
    console.log("Extracted Mane Type:", maneType);
    console.log("Extracted Mane Color:", maneColor);
    console.log("Extracted Base Color:", baseColor);
    console.log("Extracted Skin Color:", skinColor);
    console.log("Extracted Eye Color:", eyeColor);









// Define arrays of traits with their sources
    const maneColorSources = {
        "BO_Mane_Color": ["Algae", "Amber", "Anjeer", "Ashen", "Briar", "Cameo", "Champagne", "Chartreux", "Cimmerian", "Cinnabar", "Cocoa", "Dinar", "Ebony", "Fiery", "Flaxen", "Flint", "Fulvous", "Goldenrod", "Honey", "Lilac", "Nacarat", "Orchid", "Pearl", "Pistachio", "Platinum", "Prune", "Ruffian", "Scoundrel", "Sepia", "Shedua", "Slate", "Taupe", "Ukame", "Umber"],
        "BO_NCL_Mane_Color": ["Clay", "Copal", "Marigold"],
		"BO_Combo_Mane_Color": ["Cairngorm", "Citrine", "Elysian", "Madagascar", "Qahir", "Serruria", "Soul"]

    };

        const skinColorSources = {
          "BO_Skin": ["Clouded", "Peach", "Pale", "Greige",
      "Echo", "Eggshell Blue", "Ink", "Lilac",
      "Plum", "Quail", "Sandstone", "Welsummer",
      "Bunting", "Ruffian", "Badawi"],
        };

    const baseColorSources = {
        "BO_Rare_Base": [
        "Acacia", "Amber", "Anjeer", "Argent", "Ashen", "Buff", "Buttercream", "Cameo", "Cassis", "Champagne",
        "Chartreux", "Cimmerian", "Cinnabar", "Cocoa", "Dandelion", "Desolate", "Dinar", "Ebony", "Fiery", "Finch",
        "Flaxen", "Flint", "Frost", "Fulvous", "Goldenrod", "Goridhe", "Honey", "Maroon", "Mocha", "Nacarat",
        "Noctis", "Platinum", "Powder", "Prune", "Red (", "Sapela", "Scallop", "Senegal", "Shedua", "Slate", "Snowpard",
        "Soot", "Sulphur", "Sunkissed", "Taupe", "Teardrop", "Tusk", "Udara", "Umber"],

		"BO_NCL_Exclusive_Base": ["Asali", "Dhahabi", "Maziwa", "Mobola"],

		"BO_Event_Base": [
        "Ambrosia", "Celestial", "Dawn", "Jellyfish", "Leonid", "Prismatic", "Sidereal", "Skyward", "Stratosphere", "Sunrise", "Sunset",
        "Abyssinian", "Beet", "Damu", "Mushroom", "Nudar", "Ripe", "Sahara", "Sunspot", "Wine",
        "Bandit", "Nomad", "Outlaw", "Ruffian", "Scoundrel", "Ukame", "Vagabond"],
	"BO_Raffle_Base": ["Bushveld", "Haze", "Lilac", "Orchid", "Pearl", "Pecora", "Sepia"],
	"BO_Hybrid_Base": ["Kimanjano", "Mandarin"],
	"BO_Combo_Base": ["Arabica", "Asiatic", "Basalt", "Black Rose", "Cairngorm", "Celsian", "Citrine", "Cloudburst", "Constellation",
        "Elysian", "Ember", "Ennead", "Esker", "Gilded", "Hellebore", "Hexaplex", "Hoarfrost", "Madagascar", "Majivu",
        "Mistletoe", "Mudstone", "Nadir", "Nun", "Ogdoad", "Olive", "Pulsar", "Qahir", "Ra", "Rime", "Rose Gold",
        "Serruria", "Smog", "Snowflake", "Soul", "Sphinx", "Squall", "Styx", "Temporal", "Witch"]
    };

    const eyeColorSources = {
        "BO_Event_Eyes": ["Hetero Ice & Blue","Hetero Intense Gold & Earth","Hetero Denim & Jade","Hetero Jade & Denim","Hetero Cucumber & Saffron","Hetero Intense Salt & Malachite","Hetero Malachite & Intense Salt","Hetero Blue & Ice","Hetero Saffron & Cucumber","Hetero Earth & Intense Gold","Dove","Gem","Maroon","Pearl","Rose","Gazania","Daisy","Flax","Hyacinth","Iris","Guava","Grape","Banana","Apricot","Maneater","Vicious","Sunglow","Stellar","Starshine","Galaxy","Preon","Neutron","Axion","Draconid","Dawn"],
        "BO_Combo_Eyes": ["Aquamarine", "Coffee", "Cosmic", "Dusk", "Euphorbia", "Pine", "Shamal", "Spacetime", "Wistful", "Sectoral Amber & Ice","Sectoral Apricot & Sapphire","Sectoral Aqua & Grape","Sectoral Brown & Blue","Sectoral Crystal & Fire Opal","Sectoral Crystal & Lavender","Sectoral Draconid & Reptile","Sectoral Green & Blue","Sectoral Ice & Green","Sectoral Pink & Violet","Sectoral Red & Jet","Sectoral Sapphire & Albinoid","Sectoral Tyrian & Indigo","Sectoral Yellow & Green"],
		"BO_Passed_Eyes": ["Burnish", "Clay", "Dunt", "Eglomise", "Faience", "Mire", "Porcelain", "Rose Ebony", "Rose Quartz", "Terrazzo"],
		"BO_Raffle_Eyes": ["Aegean", "Cherimoya", "Fern", "Kiwifruit", "Ocean", "Phase"]
    };

    // Define general traits with their sources to search in the visible text
    const markingSources = {
        "Piety_Event_Marking": ["Bone Balbok", "Brown Balbok", "Cream Balbok", "Gold Balbok", "Henna Balbok", "Quartz Balbok", "Red Balbok", "Royal Balbok", "Shell Balbok", "Silky Balbok", "White Balbok", "Blue Ardeida","Brown Ardeida","Cherry Ardeida","Cream Ardeida","Dark Brown Ardeida","Heather Ardeida","Henna Ardeida","Merlot Ardeida","Noctis Ardeida","Red Ardeida","Saffron Ardeida","Tan Ardeida","White Ardeida","Blue Cozy","Fallow Cozy","Noctis Cozy","Onyx Cozy","Red Cozy","Tan Cozy","Black Glaze","Brown Glaze","Cherry Glaze","Dark Brown Glaze","Heather Glaze","Henna Glaze","Quartz Glaze","Scoria Glaze","Tan Glaze","Tangor Glaze","White Glaze","Cherry Inverted Cover","Blue Nuzzle","Cherry Nuzzle","Merlot Nuzzle","Noctis Nuzzle","Red Nuzzle","White Nuzzle","Blue Pelt Heavy","Brown Pelt Heavy","Cherry Pelt Heavy","Henna Pelt Heavy","Merlot Pelt Heavy","Noctis Pelt Heavy","Onyx Pelt Heavy","Blue Reverse Vitiligo Mash","Cherry Reverse Vitiligo Mash","Noctis Reverse Vitiligo Mash","Onyx Reverse Vitiligo Mash","Red Reverse Vitiligo Mash","Saffron Reverse Vitiligo Mash","Steele Reverse Vitiligo Mash","White Reverse Vitiligo Mash","Blue Ridge","Dark Brown Ridge","Onyx Ridge","Red Ridge","Tan Ridge","Shaded Black","Shaded Brown","Shaded Dark Brown","Shaded Henna","Shaded Noctis","Shaded Onyx","Black Shoulders","Brown Shoulders","Dark Brown Shoulders","Henna Shoulders","Onyx Shoulders","Blue Snuggle","Brown Snuggle","Cherry Snuggle","Merlot Snuggle","Noctis Snuggle","Tan Snuggle","White Tip Toe","Bone Undershine","Cherry Undershine","Cream Undershine","Quartz Undershine","Saffron Undershine","White Undershine","Blue Upendezi","Cherry Upendezi","Noctis Upendezi","Onyx Upendezi","Red Upendezi","Rose Upendezi","Steele Upendezi","Tan Upendezi","Bone Venter","Cherry Venter","Cream Venter","Quartz Venter","White Venter","Golden Belly","Bone Bottom","Cream Bottom","Steele Bottom","White Bottom","Black Cloak","Chocolate Coat","Fawn Coat","Onyx Coat","Saffron Coat","White Coat","Black Cowl","Brown Cowl","Dark Brown Cowl","Fallow Cowl","Golden Cowl","Onyx Cowl","Red Cowl","Saffron Cowl","Blue Cover","Fallow Cover","Noctis Cover","Onyx Cover","Red Cover","Tan Cover","Blue Countershade","Fallow Countershade","Golden Countershade","Heather Countershade","Henna Countershade","Onyx Countershade","Red Countershade","Shell Countershade","Blue Crackle","Brown Crackle","Fallow Crackle","Golden Crackle","Onyx Crackle","Red Crackle","Steele Crackle","White Crackle","Black Coat","Brown Coat","Cream Coat","Fallow Coat","Henna Coat","Noctis Coat","Onyx Coat","Red Coat","Shell Coat","Tan Coat","Blue Eyebrows","Noctis Eyebrows","Onyx Eyebrows","Red Eyebrows","Shell Eyebrows","Blue Feline 6","Brown Feline 6","Cream Feline 6","Noctis Feline 6","Onyx Feline 6","Red Feline 6","Shell Feline 6","White Feline 6","Blue Flecks","Fallow Flecks","Golden Flecks","Noctis Flecks","Onyx Flecks","Saffron Flecks","White Flecks","Black Flow","Brown Flow","Cream Flow","Henna Flow","Noctis Flow","Onyx Flow","Red Flow","Shell Flow","Silky Flow","Steele Flow","White Flow","Bone Grit","Brown Grit","Cream Grit","Golden Grit","Onyx Grit","Red Grit","White Grit","Bone Grunge","Cream Grunge","Golden Grunge","Henna Grunge","Onyx Grunge","Shell Grunge","Steele Grunge","White Grunge","Blue Indri","Fallow Indri","Golden Indri","Heather Indri","Henna Indri","Onyx Indri","Red Indri","Silky Indri","White Indri","Blue Indri Inverted","Onyx Indri Inverted","Red Indri Inverted","White Indri Inverted","Black Ink","Brown Ink","Cream Ink","Onyx Ink","Red Ink","Shell Ink","Silky Ink","Steele Ink","White Ink","Bone Luster","Brown Luster","Fallow Luster","Golden Luster","Noctis Luster","Onyx Luster","Saffron Luster","Blue Luster Inverted","Onyx Luster Inverted","Red Luster Inverted","White Luster Inverted","Black Marbled Unders","Brown Marbled Unders","Cream Marbled Unders","Fallow Marbled Unders","Henna Marbled Unders","Noctis Marbled Unders","Onyx Marbled Unders","Red Marbled Unders","Shell Marbled Unders","Silky Marbled Unders","Steele Marbled Unders","White Marbled Unders","Bone Merle","Fallow Merle","Noctis Merle","Onyx Merle","Saffron Merle","Shell Merle","White Merle","Black Mirage","Brown Mirage","Cream Mirage","Golden Mirage","Heather Mirage","Henna Mirage","Noctis Mirage","Onyx Mirage","Red Mirage","White Mirage","Black Smoke","Brown Smoke","Fallow Smoke","Noctis Smoke","Onyx Smoke","White Smoke","Bone Taper","Cream Taper","Fallow Taper","Golden Taper","Noctis Taper","Onyx Taper","Silver Taper","White Taper","Cream Tuxedo","Noctis Tuxedo","Onyx Tuxedo","Royal Tuxedo","Shell Tuxedo","Silky Tuxedo","Silver Tuxedo","White Tuxedo","Blue Vitiligo 3","Blue Vitiligo 6","Red Vitiligo 3","Red Vitiligo 6","Gold Web","Noctis Web","Onyx Web","Red Web","Tangor Web","White Web"],
		"BO_Event_Marking": ["Celestial Agouti","Celestial Cover","Celestial Shine","Celestial Speckles","Dawn Dapple","Dawn Lace","Dawn Margay","Dawn Shine","Jellyfish Ardeida","Jellyfish Inverted Maracaja","Jellyfish Maracaja","Jellyfish Quail Flecks","Leonid Coat","Leonid Feline","Leonid Smoke","Leonid Undershine","Prismatic Feline","Prismatic Glaze","Prismatic Smoke","Prismatic Undercover","Sidereal Cover","Sidereal Glaze","Sidereal Points","Sidereal Shine","Skyward Cover","Skyward Crumbing","Skyward Shine","Skyward Undercover","Stratosphere Feline","Stratosphere Lycaon","Stratosphere Undertone","Stratosphere Vitiligo","Bandit Cloud","Bandit Feline","Bandit Mirage","Bandit Unders","Nomad Feline","Nomad Mottled Vents","Nomad Rogue","Nomad Shepherd","Outlaw Cheetah","Outlaw Feline","Outlaw Mottled Fissures","Outlaw Rogue","Ruffian Feline","Ruffian Panther","Ruffian Siamese","Ruffian Soft Unders","Scoundrel Feline","Scoundrel Inverted Brawl","Scoundrel Pelage","Scoundrel Undersides","Ukame Feralis","Ukame Marble","Ukame Rugged Unders","Ukame Undercover","Vagabond Mirage","Vagabond Mottled Fissures","Vagabond Nuzzle","Vagabond Reverse Indri"],
		"Rosette": ["Auburn Heavy Rosette", "Briar Heavy Rosette", "Bushveld Heavy Rosette", "Dark Brown Heavy Rosette", "Doubloon Heavy Rosette", "Ebony Heavy Rosette", "Fiery Heavy Rosette", "Ginger Heavy Rosette", "Goridhe Heavy Rosette", "Noctis Heavy Rosette", "Onyx Heavy Rosette", "Red Heavy Rosette", "Seal Heavy Rosette", "Briar Rosette", "Brown Rosette", "Bushveld Rosette", "Cream Rosette", "Dark Brown Rosette", "Fiery Rosette", "Ginger Rosette", "Gold Rosette", "Goridhe Rosette", "Noctis Rosette", "Onyx Rosette", "Seal Rosette", "Auburn Shaded Rosette", "Briar Shaded Rosette", "Bushveld Shaded Rosette", "Dark Brown Shaded Rosette", "Doubloon Shaded Rosette", "Ebony Shaded Rosette", "Fiery Shaded Rosette", "Ginger Shaded Rosette", "Goridhe Shaded Rosette", "Noctis Shaded Rosette", "Onyx Shaded Rosette", "Red Shaded Rosette", "Seal Shaded Rosette", "Auburn Soft Rosette", "Briar Soft Rosette", "Bushveld Soft Rosette", "Dark Brown Soft Rosette", "Doubloon Soft Rosette", "Ebony Soft Rosette", "Fiery Soft Rosette", "Ginger Soft Rosette", "Goridhe Soft Rosette", "Noctis Soft Rosette", "Onyx Soft Rosette", "Red Soft Rosette", "Seal Soft Rosette"],
		"Inverted_Rosette": ["Inverted Rosette Cream", "Inverted Rosette Fallow", "Inverted Rosette Fiery", "Inverted Rosette Gold", "Inverted Rosette Saffron", "Inverted Rosette Silky", "Inverted Rosette White"],

		"Raffle_Marking": ["Briar Brindle", "Bushveld Brindle", "Fiery Brindle", "Gold Brindle", "Seal Brindle", "Spice Brindle", "Tangor Brindle", "Black Burmese", "Blue Burmese", "Briar Burmese", "Brown Burmese", "Cimmerian Burmese", "Dark Brown Burmese", "Henna Burmese", "Lilac Burmese", "Noctis Burmese", "Onyx Burmese", "Red Burmese", "Scoria Burmese", "Seal Burmese", "Algae Crackle", "Almond Crackle", "Blue Crackle", "Briar Crackle", "Brown Crackle", "Bushveld Crackle", "Cimmerian Crackle", "Cinnabar Crackle", "Dark Brown Crackle", "Fiery Crackle", "Goridhe Crackle", "Lilac Crackle", "Marigold Crackle", "Noctis Crackle", "Onyx Crackle", "Red Crackle", "Saffron Crackle", "Seal Crackle", "Spice Crackle", "White Crackle", "Algae Crumbing", "Bushveld Crumbing", "Lilac Crumbing", "Pistachio Crumbing", "Tan Crumbing", "Tangor Crumbing", "Dim Black", "Dim Blue", "Dim Brown", "Dim Cimmerian", "Dim Dark Brown", "Dim Gold", "Dim Goridhe", "Dim Lilac", "Dim Mahogany", "Dim Noctis", "Dim Onyx", "Dim Red", "Dim Saffron", "Dim Seal", "Dim Silver", "Dim Spice", "Dim White", "Black Dorsal Line", "Blue Dorsal Line", "Briar Dorsal Line", "Brown Dorsal Line", "Bushveld Dorsal Line", "Cream Dorsal Line", "Dark Brown Dorsal Line", "Gold Dorsal Line", "Lilac Dorsal Line", "Noctis Dorsal Line", "Onyx Dorsal Line", "Red Dorsal Line", "Seal Dorsal Line", "Spice Dorsal Line", "Tangor Dorsal Line", "White Dorsal Line", "Lilac Eye Rims", "Feline 1 Black", "Feline 1 Dark Brown", "Feline 1 Fiery", "Feline 1 Ginger", "Feline 1 Gold", "Feline 1 Lilac", "Feline 1 Noctis", "Feline 1 Onyx", "Feline 1 Silky", "Feline 1 Silver", "Feline 2 Black", "Feline 2 Dark Brown", "Feline 2 Fiery", "Feline 2 Ginger", "Feline 2 Gold", "Feline 2 Lilac", "Feline 2 Noctis", "Feline 2 Onyx", "Feline 2 Silky", "Feline 2 Silver", "Feline 3 Black", "Feline 3 Dark Brown", "Feline 3 Fiery", "Feline 3 Ginger", "Feline 3 Gold", "Feline 3 Lilac", "Feline 3 Noctis", "Feline 3 Onyx", "Feline 3 Silky", "Feline 3 Silver", "Feline 4 Black", "Feline 4 Dark Brown", "Feline 4 Fiery", "Feline 4 Ginger", "Feline 4 Gold", "Feline 4 Lilac", "Feline 4 Noctis", "Feline 4 Onyx", "Feline 4 Silky", "Feline 4 Silver", "Feline 5 Black", "Feline 5 Dark Brown", "Feline 5 Fiery", "Feline 5 Ginger", "Feline 5 Gold", "Feline 5 Lilac", "Feline 5 Noctis", "Feline 5 Onyx", "Feline 5 Silky", "Feline 5 Silver", "Feline 6 Black", "Feline 6 Dark Brown", "Feline 6 Fiery", "Feline 6 Ginger", "Feline 6 Gold", "Feline 6 Lilac", "Feline 6 Noctis", "Feline 6 Onyx", "Feline 6 Silky", "Feline 6 Silver", "Feline 7 Black", "Feline 7 Dark Brown", "Feline 7 Fiery", "Feline 7 Ginger", "Feline 7 Gold", "Feline 7 Lilac", "Feline 7 Noctis", "Feline 7 Onyx", "Feline 7 Silky", "Feline 7 Silver", "Bone Glaze", "Fiery Glaze", "Golden Glaze", "Scoria Glaze", "Shaded Glaze", "White Glaze", "Blonde Indri", "Bushveld Indri", "Dark Brown Indri", "Goridhe Indri", "Lilac Indri", "Moss Agate Indri", "Noctis Indri", "Red Indri", "Scoria Indri", "Seal Indri", "Steele Indri", "White Indri", "Blue Koenigsegg", "Cherry Koenigsegg", "Cream Koenigsegg", "Dark Brown Koenigsegg", "Noctis Koenigsegg", "Onyx Koenigsegg", "Red Koenigsegg", "Shell Koenigsegg", "Silver Koenigsegg", "Black Limbs", "Bushveld Limbs", "Dark Brown Limbs", "Fiery Limbs", "Goridhe Limbs", "Noctis Limbs", "Onyx Limbs", "Red Limbs", "Saffron Limbs", "Seal Limbs", "White Limbs", "Black Marble", "Brown Marble", "Dark Brown Marble", "Golden Marble", "Lilac Marble", "Red Marble", "Saffron Marble", "Seal Marble", "Shell Marble", "Shaded Marble", "Silky Marble", "Bone Marbled Unders", "Fiery Marbled Unders", "Golden Marbled Unders", "Scoria Marbled Unders", "Shaded Marbled Unders", "White Marbled Unders", "Algae Patches", "Bushveld Patches", "Cimmerian Patches", "Cinnabar Patches", "Cream Patches", "Fiery Patches", "Golden Patches", "Goridhe Patches", "Henna Patches", "Lilac Patches", "Marigold Patches", "Noctis Patches", "Onyx Patches", "Red Patches", "Seal Patches", "Spice Patches", "White Patches", "Black Quail Flecks", "Bushveld Quail Flecks", "Dark Brown Quail Flecks", "Fiery Quail Flecks", "Goridhe Quail Flecks", "Noctis Quail Flecks", "Onyx Quail Flecks", "Red Quail Flecks", "Saffron Quail Flecks", "Seal Quail Flecks", "White Quail Flecks", "Bone Quail Piebald", "Brown Quail Piebald", "Fiery Quail Piebald", "Golden Quail Piebald", "Scoria Quail Piebald", "Shaded Quail Piebald", "White Quail Piebald", "Black Reversed Brindle", "Brown Reversed Brindle", "Dark Brown Reversed Brindle", "Fiery Reversed Brindle", "Goridhe Reversed Brindle", "Lilac Reversed Brindle", "Noctis Reversed Brindle", "Onyx Reversed Brindle", "Red Reversed Brindle", "Saffron Reversed Brindle", "Seal Reversed Brindle", "White Reversed Brindle", "Black Reversed Siamese", "Brown Reversed Siamese", "Dark Brown Reversed Siamese", "Fiery Reversed Siamese", "Goridhe Reversed Siamese", "Lilac Reversed Siamese", "Noctis Reversed Siamese", "Onyx Reversed Siamese", "Red Reversed Siamese", "Saffron Reversed Siamese", "Seal Reversed Siamese", "White Reversed Siamese", "Bone Rugged Unders", "Fiery Rugged Unders", "Golden Rugged Unders", "Scoria Rugged Unders", "Shaded Rugged Unders", "White Rugged Unders", "Blue Skin Spots", "Bushveld Skin Spots", "Dark Brown Skin Spots", "Fiery Skin Spots", "Goridhe Skin Spots", "Noctis Skin Spots", "Onyx Skin Spots", "Red Skin Spots", "Saffron Skin Spots", "Seal Skin Spots", "White Skin Spots", "Black Streaks", "Bushveld Streaks", "Dark Brown Streaks", "Fiery Streaks", "Goridhe Streaks", "Noctis Streaks", "Onyx Streaks", "Red Streaks", "Saffron Streaks", "Seal Streaks", "White Streaks", "Black Trim", "Bushveld Trim", "Dark Brown Trim", "Fiery Trim", "Goridhe Trim", "Noctis Trim", "Onyx Trim", "Red Trim", "Saffron Trim", "Seal Trim", "White Trim", "Black Tuxedo", "Brown Tuxedo", "Dark Brown Tuxedo", "Fiery Tuxedo", "Goridhe Tuxedo", "Noctis Tuxedo", "Onyx Tuxedo", "Red Tuxedo", "Saffron Tuxedo", "Seal Tuxedo", "White Tuxedo", "White Undertone", "Algae Vitiligo 3", "Bushveld Vitiligo 3", "Fiery Vitiligo 3", "Golden Vitiligo 3", "Lilac Vitiligo 3", "Moss Agate Vitiligo 3", "Noctis Vitiligo 3", "Scoria Vitiligo 3", "Shaded Vitiligo 3", "Silky Vitiligo 3", "Tangor Vitiligo 3", "White Vitiligo 3", "Algae Vitiligo 6", "Bushveld Vitiligo 6", "Fiery Vitiligo 6", "Golden Vitiligo 6", "Lilac Vitiligo 6", "Moss Agate Vitiligo 6", "Noctis Vitiligo 6", "Scoria Vitiligo 6", "Shaded Vitiligo 6", "Silky Vitiligo 6", "Tangor Vitiligo 6", "White Vitiligo 6", "Dim Web", "Gold Web", "Noctis Web", "Onyx Web", "Red Web", "Silver Web", "White Web", "White Underfelt", "Fuchsia Underfelt", "Feline 10 Noctis", "Feline 10 Ginger"],

		"BO_Hybrid_Marking": ["Phantom Rosette", "Mottled Rosette", "Mottled Stripes"],

		"RMA_Exclusive": [ "Almond Dinictis", "Auburn Dinictis", "Black Dinictis", "Blue Dinictis", "Briar Dinictis", "Brown Dinictis",
		"Chocolate Dinictis", "Cimmerian Dinictis", "Cinnabar Dinictis", "Clay Dinictis", "Dark Brown Dinictis",
		"Doubloon Dinictis", "Gold Dinictis", "Henna Dinictis", "Noctis Dinictis", "Onyx Dinictis", "Red Dinictis",
		"Saffron Dinictis", "Scoria Dinictis", "Seal Dinictis", "Silver Dinictis", "White Dinictis",
		"Almond Fawn", "Bone Fawn", "Cream Fawn", "Gold Fawn", "Quartz Fawn", "Saffron Fawn", "Shell Fawn",
		"Silky Fawn", "Silver Fawn", "White Fawn",
		"Feralis Cimmerian", "Feralis Doubloon", "Feralis Gold", "Feralis Henna", "Feralis Lilac", "Feralis Noctis",
		"Feralis Onyx", "Feralis Pistachio", "Feralis Red", "Feralis White",
		"Bone Ghost Feralis", "Cimmerian Ghost Feralis", "Cream Ghost Feralis", "Gold Ghost Feralis", "Noctis Ghost Feralis",
		"Red Ghost Feralis", "White Ghost Feralis",
		"Almond Inverted Quagga", "Bone Inverted Quagga", "Cream Inverted Quagga", "Saffron Inverted Quagga", "White Inverted Quagga",
		"Cimmerian Inverted Zebra", "Noctis Inverted Zebra",
		"Maofelis Cimmerian", "Maofelis Doubloon", "Maofelis Gold", "Maofelis Henna", "Maofelis Lilac", "Maofelis Noctis",
		"Maofelis Onyx", "Maofelis Pistachio", "Maofelis Red", "Maofelis White",
		"Bone Mottled Vents", "Cream Mottled Vents", "White Mottled Vents",
		"Nimravus Cimmerian", "Nimravus Doubloon", "Nimravus Gold", "Nimravus Henna", "Nimravus Noctis", "Nimravus Onyx",
		"Nimravus Pistachio", "Nimravus Red", "Nimravus White",
		"Auburn Nyala", "Black Nyala", "Brown Nyala", "Chert Nyala", "Chocolate Nyala", "Cimmerian Nyala", "Clay Nyala",
		"Dark Brown Nyala", "Ebony Nyala", "Ginger Nyala", "Goridhe Nyala", "Henna Nyala", "Lilac Nyala", "Noctis Nyala",
		"Onyx Nyala", "Scoria Nyala", "Seal Nyala", "Spice Nyala",
		"Bushveld Okapi", "Cimmerian Okapi", "Ebony Okapi", "Goridhe Okapi", "Noctis Okapi", "Onyx Okapi", "Red Okapi", "Scoria Okapi",
		"Almond Quagga", "Bushveld Quagga", "Cimmerian Quagga", "Clay Quagga", "Copal Quagga", "Ginger Quagga", "Goridhe Quagga",
		"Henna Quagga", "Noctis Quagga", "Onyx Quagga",
		"Algae Zebra", "Bushveld Zebra", "Cimmerian Zebra", "Cinnabar Zebra", "Clay Zebra", "Copal Zebra", "Ginger Zebra",
		"Goridhe Zebra", "Henna Zebra", "Noctis Zebra", "Onyx Zebra", "Red Zebra"],


    };

	const maneTypeSources = {
		"BO_Mane": ["Royal", "Pariah", "Savage", "Tsavo"]
	};

  // Function to check for traits and their sources
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

    // Search for markings within the tables with class 'table.table'
    const markingTraits = [];
    document.querySelectorAll('.table.table td').forEach(td => {
        const marking = td.textContent.trim();
        const foundMarkings = checkTraitWithSource(marking, markingSources);
        if (foundMarkings.length > 0) {
            markingTraits.push(...foundMarkings);
        }
    });

    // Compare the extracted values with your arrays
    const foundManeTypes = checkTraitWithSource(maneType, maneTypeSources);
    const foundManeColors = checkTraitWithSource(maneColor, maneColorSources);
    const foundBaseColors = checkTraitWithSource(baseColor, baseColorSources);
    const foundEyeColors = checkTraitWithSource(eyeColor, eyeColorSources);
    const foundSkinColors = checkTraitWithSource(skinColor, skinColorSources);

    // Log the found traits for debugging
    console.log("Found Mane Types:", foundManeTypes);
    console.log("Found Mane Colors:", foundManeColors);
    console.log("Found Base Colors:", foundBaseColors);
    console.log("Found Eye Colors:", foundEyeColors);
    console.log("Found Skin Colors:", foundSkinColors);

    // Send the found traits to the background script
    chrome.runtime.sendMessage({
        type: 'traitsFound',
        maneTypes: foundManeTypes,
        maneColors: foundManeColors,
        baseColors: foundBaseColors,
        eyeColors: foundEyeColors,
        skinColors: foundSkinColors,
        markings: markingTraits
    });

})();
