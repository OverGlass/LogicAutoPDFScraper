import { Test, assertEquals } from "./testUtils.ts";
import isRightLength from "../isRightLength.ts";

const itShould = Test("isRightLength");

itShould("return true if string is empty witShouldhout option", () => {
  assertEquals(isRightLength(""), true);
});

itShould("return true witShouldhout option", () => {
  const myString = "123456789";
  assertEquals(isRightLength(myString), true);
});

itShould("return false if isRightLength length(4) >= 5", () => {
  const testString = isRightLength("1234", { minLength: 5 });
  assertEquals(testString, false);
});

itShould("return true if isRightLength length(5) >= 5", () => {
  const myString = "12345";
  const testString = isRightLength(myString, { minLength: 5 });
  assertEquals(testString, true);
});

itShould("return false if isStringLength length(8) <= 7", () => {
  const testString = isRightLength("12345678", { maxLength: 7 });
  assertEquals(testString, false);
});

itShould("return true if isStringLength length(8) <= 7", () => {
  const myString = "1234567";
  const testString = isRightLength(myString, { maxLength: 7 });
  assertEquals(testString, true);
});

itShould("return false if isStringLength length(9) <= 5 && >= 7", () => {
  const testString = isRightLength("12345678910", {
    minLength: 5,
    maxLength: 7,
  });
  assertEquals(testString, false);
});
itShould("return false if isStringLength length(4) <= 5 && >= 7", () => {
  const testString = isRightLength("1234", {
    minLength: 5,
    maxLength: 7,
  });
  assertEquals(testString, false);
});

itShould("return true isStringLength length(6) <= 5 && >= 7", () => {
  const myString = "123456";
  const testString = isRightLength(myString, {
    minLength: 5,
    maxLength: 7,
  });
  assertEquals(testString, true);
});
