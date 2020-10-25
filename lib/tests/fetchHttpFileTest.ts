import { Test, assertThrowsAsync, assert } from "./testUtils.ts";
import errorsMessages from "../errorsMessages.ts";
import fetchHttpFile from "../fetchHttpFile.ts";
import staticServ from "./testServer/staticServ.ts";

const itShould = Test("fetchFile");

itShould("throw as error if url do not begin by http", async () => {
  await assertThrowsAsync(
    () => fetchHttpFile("httppp://dd.com"),
    Error,
    errorsMessages.isHttpUrl
  );
});

itShould("throw an error if url can't be fetch", async () => {
  await assertThrowsAsync(
    () => fetchHttpFile("http://localhost:8080/serverIsNotUp"),
    Error
  );
});

itShould("throw an error if httpStatus is not ok", async () => {
  staticServ();
  await assertThrowsAsync(
    () => fetchHttpFile("http://localhost:8080/fail"),
    Error
  );
});

itShould("return file binary if succeed", async () => {
  staticServ();
  const file: any = await fetchHttpFile("http://localhost:8080/testFile.pdf");
  assert(file instanceof Uint8Array);
});
