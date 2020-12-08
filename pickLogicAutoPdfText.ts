import { _ } from "./deps.ts";

export const pickedTexts = (t: string) => {
  return {
    reference: pickReferenceFromText(t),
    model: pickModelFromText(t),
    emission: pickEmissionFromText(t),
    allOptions: pickAllOptionsFromText(t),
  };
};

export const pickReferenceFromText = (text: string) =>
  getRegexMatch(/(?<=Référence )(.*)(?=\n)/g, text);

export const pickModelFromText = (text: string) =>
  getRegexMatch(/(?<=S[.]L[.]U[.]\n)([\S\s]*?)(?=Emission)/, text);

export const pickEmissionFromText = (text: string) =>
  getRegexMatch(/(?=Emission)([\S\s]*?)(?=\*)/, text);

export function pickAllOptionsFromText(text: string) {
  const noiseTextsRegex = /(Référence|Référence)([\S\s]*?)(S[.]L[.]U[.]\n)/g;
  const textPrepation = text.replace(noiseTextsRegex, "").replace(/’/g, "'");
  return getRegexMatch(/OPTIONS([\S\s]*?)(?=Powered)/g, textPrepation);
}

export function getRegexMatch(regex: RegExp, text: string) {
  const regexMatch = text.match(regex);
  return regexMatch ? regexMatch[0].replace(/\n$/, "") : null;
}

export function getArrayOfOptions(text: string) {
  const process = _.pipe(pickAllOptionsFromText, matchOptions)(text);
  return process ? process.split("\n") : null;
}

export function getArrayOfAvailableEquiments(text: string): Array<string> {
  return _.pipe(
    pickAllOptionsFromText,
    unWrapNotAvailableEquipments,
    replaceOptions,
    replaceNotAvailableEquipements,
    (x) =>
      x.replace(
        /(OPTIONS\n|INTÉRIEUR\n|INTERIEUR\n|EQUIPEMENTS DE SERIE\n|MULTIMÉDIA\n|SÉCURITÉ\n|LIGNE EXTÉRIEURE ET INTÉRIEURE\n|CONFORT\n|NON DISPONIBLE\n)/gm,
        ""
      ),
    (x) => x.split("\n").filter((x: string) => x.length > 0)
  )(text);
}

export function getArrayOfNotAvailableEquiments(
  text: string
): Array<string> | null {
  const process = _.pipe(
    pickAllOptionsFromText,
    unWrapNotAvailableEquipments,
    matchNotAvailableEquipements
  )(text);
  return process
    ? process.map((x: string) => x.replace(/\(NON DISPONIBLE\)/gm, ""))
    : null;
}

export const unWrapNotAvailableEquipments = (optionsText: string) => {
  const regex = /(^.*[^\(NON DISPONIBLE\)\n])([\S\s])^(?=[^A-Z]).*(?<=\(NON DISPONIBLE\))/gm;
  return optionsText.replace(regex, (x) => x.split("\n").join(" "));
};

const regexOptions = /(?<=OPTIONS\n)([\S\s]*?)(?=INTERIEUR|INTÉRIEUR|EQUIPEMENTS DE SERIE)/;
const regexNotAvailableEquipments = /^.*(?<=\(NON DISPONIBLE\))/gm;

export const replaceNotAvailableEquipements = (
  equipements: string,
  replacement: string = ""
) => equipements.replace(regexNotAvailableEquipments, replacement);

export const replaceOptions = (equipements: string, replacement: string = "") =>
  equipements.replace(regexOptions, replacement);

export const matchNotAvailableEquipements = (equipements: string) =>
  equipements.match(regexNotAvailableEquipments);

export const matchOptions = (equipements: string) => {
  return getRegexMatch(regexOptions, equipements);
};
