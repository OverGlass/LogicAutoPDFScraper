import errorsMessages from "./errorsMessages.ts";
import { _ } from "./deps.ts";

export default async function fetchHttpFile(httpUrl: string) {
  if (!isHttpUrlValid(httpUrl)) throw new Error(errorsMessages.isHttpUrl);

  const res = await fetch(httpUrl);
  if (!isHttpResponseStatusOk(res)) throwHttpResponseError(res);

  return await _.pipe(
    getHttpResponseResolveInArrayBuffer,
    transformArrayBufferToUint8Array
  )(res);
}

function isHttpUrlValid(url: string) {
  const regexCheckHttpUrl = RegExp(/^(http|https):\/\//, "i");
  return regexCheckHttpUrl.test(url);
}

function isHttpResponseStatusOk(res: Response) {
  return res.ok;
}

function throwHttpResponseError(res: Response) {
  if (res.body) res.body.cancel();
  throw new Error(res.statusText);
}

async function getHttpResponseResolveInArrayBuffer(res: Response) {
  return await res.arrayBuffer();
}

async function transformArrayBufferToUint8Array(
  arrayBuffer: Promise<ArrayBuffer>
) {
  return new Uint8Array(await arrayBuffer);
}
