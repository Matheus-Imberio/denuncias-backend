export function assignClone<O1 extends object, O2 extends object>(
  o1: O1,
  o2: O2,
): O1 & O2 {
  return Object.assign(structuredClone(o1), o2);
}
