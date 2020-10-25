import { Test, assertEquals, getReferentialAssets } from "./testUtils.ts";
import getPdfTextFromBinary from "../getPdfTextFromBinary.ts";

const itShould = Test("getPdfTextFromBinary");

itShould("be the same text test file as expeted", async () => {
  const {
    referentialPdfBinary,
    referentialString,
  } = await getReferentialAssets();

  const generatedStringToTest = await getPdfTextFromBinary(
    "FileName",
    referentialPdfBinary
  );

  assertEquals(referentialString, generatedStringToTest);
});
