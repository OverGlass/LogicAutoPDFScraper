import { Test, assertThrowsAsync, assert } from "./testUtils.ts";
import errorsMessages from "../errorsMessages.ts";

import fetchLogicAutoPdf from "../fetchLogicAutoPdf.ts";

const itShould = Test("Get LogicAuto PDF");

itShould("throw an error ref is not good length", async () => {
  await assertThrowsAsync(
    () => fetchLogicAutoPdf("ME033aaaaa"),
    Error,
    errorsMessages.wrongRefSize
  );
});

itShould("return file binary if succeed", async () => {
  const file = await fetchLogicAutoPdf("RE136A"); //2020 MEC
  assert(file instanceof Uint8Array);
});

itShould("decrement year until return file binary succeed", async () => {
  const file = await fetchLogicAutoPdf("ME033a"); //2019 MEC
  assert(file instanceof Uint8Array);
});

itShould(
  "throw an error pdf not found if decrement exeed 5 times || ref not good",
  async () => {
    await assertThrowsAsync(
      () => fetchLogicAutoPdf("xxxxx"), //wrong ref
      Error,
      errorsMessages.notFound
    );
  }
);
