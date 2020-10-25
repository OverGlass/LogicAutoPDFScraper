export default async function (
  pdfPath: string,
  textOutputPath: string,
  options: Array<string> = ["-raw", "-enc", "UTF-8"]
) {
  const pdfToTextProcessus = Deno.run({
    cmd: ["pdftotext", ...options, pdfPath, textOutputPath],
  });
  await pdfToTextProcessus.status();
  pdfToTextProcessus.close();
}
