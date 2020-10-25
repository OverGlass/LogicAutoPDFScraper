import { Test, assert, getReferentialAssets } from "./testUtils.ts";
import writeTmpFileUntilCallback from "../writeTmpFileUntilCallback.ts";

const itShould = Test("writeTmpFileUntilCallback");

itShould("write pdf in tmp file", async () => {
  const { referentialPdfBinary } = await getReferentialAssets();
  await writeTmpFileUntilCallback(
    "test.pdf",
    referentialPdfBinary,
    async (path: string) => {
      const newTmpPdfFile = await Deno.readFile(path);
      assert(newTmpPdfFile);
    }
  );
});
