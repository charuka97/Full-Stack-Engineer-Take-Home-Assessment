import { validateTitle } from "../../utils/validation";

describe("validateTitle", () => {
  it("should return an error for empty title", () => {
    expect(validateTitle("")).toBe("Title is required!");
  });

  it("should return an error for title less than 3 characters", () => {
    expect(validateTitle("Hi")).toBe(
      "Title should be at least 3 characters long!"
    );
  });

  it("should return an error for title longer than 40 characters", () => {
    expect(validateTitle("A".repeat(41))).toBe(
      "Title should not exceed 40 characters!"
    );
  });

  it("should return an error for non-alphanumeric characters", () => {
    expect(validateTitle("Hello@World!")).toBe(
      "Title can only contain alphanumeric characters and spaces!"
    );
  });

  it("should return an error for purely numeric title", () => {
    expect(validateTitle("123456")).toBe("Title cannot be purely numeric!");
  });

  it("should return an error for consecutive spaces", () => {
    expect(validateTitle("Hello  World")).toBe(
      "Title cannot contain consecutive spaces!"
    );
  });

  it("should return undefined for valid titles", () => {
    expect(validateTitle("Valid Title")).toBeUndefined();
  });
});
