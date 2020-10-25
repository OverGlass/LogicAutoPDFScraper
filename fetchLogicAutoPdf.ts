import errorsMessages from "./errorsMessages.ts";
import { isRightLength, fetchHttpFile } from "./deps.ts";

const logicAutoConstantes = {
  CDN: "https://cdn.okrentacar.es/ficha.php?action=get",
  emptyPDFLength: 493409,
};

export default async function fetchLogicAutoPdf(
  ref: string,
  forceYear?: number
): Promise<Uint8Array> {
  const currentYear = getCurrentYear();
  const year = forceYear || currentYear;
  const CdnUrl = fillLogicAutoCdnParameters(ref, year);
  const PDF = await fetchHttpFile(CdnUrl);
  if (isLogicAutoPdfEmpty(PDF)) {
    if (currentYear - 5 === forceYear) throw new Error(errorsMessages.notFound);
    return await fetchLogicAutoPdf(ref, year - 1);
  }
  return PDF;
}

function fillLogicAutoCdnParameters(ref: string, year: number) {
  if (!isLogicAutoRefLengthRight(ref))
    throw new Error(errorsMessages.wrongRefSize);

  return logicAutoConstantes.CDN + `&refName=${ref}&refYear=${year}&refLang=FR`;
}

function isLogicAutoRefLengthRight(ref: string) {
  return isRightLength(ref, { minLength: 5, maxLength: 7 });
}

function isLogicAutoPdfEmpty(binary: Uint8Array) {
  return isRightLength(binary, {
    maxLength: logicAutoConstantes.emptyPDFLength,
  });
}

function getCurrentYear() {
  const d = new Date();
  return d.getFullYear();
}
