import { _ } from "./deps.ts";

export interface isRightLengthOptions {
  minLength?: Number;
  maxLength?: Number;
}

type hasPrototypeLengthProp = Array<any> | String | Uint8Array;

export default function isRightLength(
  hasLengthProp: hasPrototypeLengthProp,
  options: isRightLengthOptions = {}
) {
  return options.minLength && options.maxLength
    ? isLengthBetween(hasLengthProp, [options.minLength, options.maxLength])
    : options.minLength
    ? isLengthSuperiorTo(hasLengthProp, options.minLength)
    : options.maxLength
    ? isLengthInferiorTo(hasLengthProp, options.maxLength)
    : true;
}

function isLengthBetween(x: hasPrototypeLengthProp, [min, max]: Number[]) {
  return x.length >= min && x.length <= max;
}

function isLengthSuperiorTo(x: hasPrototypeLengthProp, min: Number) {
  return x.length >= min;
}

function isLengthInferiorTo(x: hasPrototypeLengthProp, max: Number) {
  return x.length <= max;
}
