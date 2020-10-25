import {
  Test,
  assertEquals,
  getReferentialAssets,
  relativeToAbsolutePath,
} from "./testUtils.ts";
import { emptyDir } from "../deps.ts";
import pdfToText from "../pdfToText.ts";

const itShould = Test("pdfToText");

itShould("write the same text file as referential.txt", async () => {
  await emptyDir("./tmp");
  const { referentialString } = await getReferentialAssets();
  const referentialPdfPath = relativeToAbsolutePath("/assets/referential.pdf");

  const generatedTextFileDestPath = relativeToAbsolutePath(
    "/tmp/generatedTextFile.txt"
  );

  await pdfToText(referentialPdfPath, generatedTextFileDestPath);

  const generatedTextFile = await Deno.readTextFile(generatedTextFileDestPath);
  assertEquals(generatedTextFile, referentialString);
  await emptyDir("./tmp");
});
