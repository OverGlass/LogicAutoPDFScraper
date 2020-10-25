import writeTmpFileUntilCallback from "./writeTmpFileUntilCallback.ts";
import pdfToText from "./pdfToText.ts";

export default async function getPdfTextFromBinary(
  pdfName: string,
  binary: Uint8Array
): Promise<string> {
  return await writeTmpFileUntilCallback(
    `${pdfName}.pdf`,
    binary,
    async (path: string) => {
      const absolutePath = Deno.cwd() + path.slice(1, path.length);
      const textFilePath = absolutePath.slice(0, -4) + ".txt";
      await pdfToText(absolutePath, textFilePath);
      return await Deno.readTextFile(textFilePath);
    }
  );
}
