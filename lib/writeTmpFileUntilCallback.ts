import { emptyDir } from "./deps.ts";

export default async function writeTmpFileUntilCallback(
  filenameWithExtention: string,
  binary: Uint8Array,
  f: Function
) {
  await emptyDir("./tmp");
  const tmpPathFile = `./tmp/${filenameWithExtention}`;
  await Deno.writeFile(tmpPathFile, binary);
  const fPayload = await f(tmpPathFile);
  await emptyDir("./tmp");
  return fPayload;
}
