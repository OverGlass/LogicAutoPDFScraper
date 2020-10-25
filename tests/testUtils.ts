export * from "https://deno.land/std@0.67.0/testing/asserts.ts";

export const Test = function (description: string) {
  return (x: string, fn: () => void) =>
    Deno.test(`${description} | Should ${x}`, fn);
};

export async function getReferentialAssets() {
  const referentialPdfPath = relativeToAbsolutePath("/assets/referential.pdf");
  const referentialTextPath = relativeToAbsolutePath("/assets/referential.txt");

  return {
    referentialPdfBinary: await Deno.readFile(referentialPdfPath),
    referentialString: await Deno.readTextFile(referentialTextPath),
  };
}

export function relativeToAbsolutePath(relativePath: string) {
  return Deno.cwd() + relativePath;
}
