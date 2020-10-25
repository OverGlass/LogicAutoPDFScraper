import { Test, assertEquals, getReferentialAssets } from "./testUtils.ts";

import { _ } from "../deps.ts";

import {
  pickedTexts,
  getArrayOfAvailableEquiments,
  getArrayOfNotAvailableEquiments,
  getArrayOfOptions,
} from "../pickLogicAutoPdfText.ts";

const itShould = Test("pickLogicAutoPdfTex");

const { referentialString } = await getReferentialAssets();

itShould(
  "have pick text from logicAuto PDF text the exact same format than referencial object strings",
  () => {
    const referentialObject = {
      reference: "RE133f",
      model: "RENAULT\nCLIO\n1.4 DCI 85 INTENS",
      emission:
        "Emission de CO2 NEDC 94 GR/KM\nEmission de CO2 WLTP 109-124 GR/KM",
      allOptions:
        'OPTIONS\nPeinture métallisée 550 €\nJantes alliage 17" Viva Stella [RDIF21] 300 €\nChargeur sans fil 250 €\nRoue de secours tôle [RSEC01] 150 €\nINTÉRIEUR\nSellerie Zen (Au lieu de Sellerie mixte similicuir Velours)\nEQUIPEMENTS DE SERIE\nAide au démarrage en côte\nAide au freinage actif d\'urgence avec détection piétons\nAirbag passager déconnectable\nAllumage automatique des feux et des essuie-glaces\nAssistance au freinage d\'urgence (A.F.U.)\nCarte Renault "Mains libres"\nClimatisation automatique\nCommutation automatique des feux de route/croisement\nCompteur Numérique 7"\nFeux de jour à LED. Feux de stop à LED\nPare-soleil avec miroir de courtoisie éclairé\nProjecteurs antibrouillard\nRégulateur limiteur de vitesse\nRétroviseurs extérieur dégivrant, réglables et rabattables électriquement\nSiège conducteur réglable en hauteur\nVitres AR surteintées\nVolant cuir\nEclairage avant et arrière Full LED Pure Vision\nFrein de parking assisté automatique avec Auto hold\nAccoudoir central avec rangement\nNavigation [NA40A] (NON DISPONIBLE)\nAlerte de survitesse avec reconnaissance des panneaux de signalisation\n[AVOSP1] (NON DISPONIBLE)\nCanule Chromée (NON DISPONIBLE)\nRenault Multi-Sense (choix de modes de conduite) (NON DISPONIBLE)',
    };
    assertEquals(pickedTexts(referentialString), referentialObject);
  }
);

itShould("export Logic auto texts in array", () => {
  const generatedArrays = {
    options: getArrayOfOptions(referentialString),
    standardEquipement: getArrayOfAvailableEquiments(referentialString),
    notStandardEquipement: getArrayOfNotAvailableEquiments(referentialString),
  };
  const referentialObject = {
    options: [
      "Peinture métallisée 550 €",
      'Jantes alliage 17" Viva Stella [RDIF21] 300 €',
      "Chargeur sans fil 250 €",
      "Roue de secours tôle [RSEC01] 150 €",
    ],
    standardEquipement: [
      "Sellerie Zen (Au lieu de Sellerie mixte similicuir Velours)",
      "Aide au démarrage en côte",
      "Aide au freinage actif d'urgence avec détection piétons",
      "Airbag passager déconnectable",
      "Allumage automatique des feux et des essuie-glaces",
      "Assistance au freinage d'urgence (A.F.U.)",
      'Carte Renault "Mains libres"',
      "Climatisation automatique",
      "Commutation automatique des feux de route/croisement",
      'Compteur Numérique 7"',
      "Feux de jour à LED. Feux de stop à LED",
      "Pare-soleil avec miroir de courtoisie éclairé",
      "Projecteurs antibrouillard",
      "Régulateur limiteur de vitesse",
      "Rétroviseurs extérieur dégivrant, réglables et rabattables électriquement",
      "Siège conducteur réglable en hauteur",
      "Vitres AR surteintées",
      "Volant cuir",
      "Eclairage avant et arrière Full LED Pure Vision",
      "Frein de parking assisté automatique avec Auto hold",
      "Accoudoir central avec rangement",
    ],
    notStandardEquipement: [
      "Navigation [NA40A] ",
      "Alerte de survitesse avec reconnaissance des panneaux de signalisation [AVOSP1] ",
      "Canule Chromée ",
      "Renault Multi-Sense (choix de modes de conduite) ",
    ],
  };
  assertEquals(generatedArrays, referentialObject);
});
