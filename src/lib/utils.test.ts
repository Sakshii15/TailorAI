import { cn } from "@/lib/utils";

describe("cn", () => {
  it("should return a string", () => {
    const result = cn("class1", "class2");
    expect(typeof result).toBe("string");
  });
});