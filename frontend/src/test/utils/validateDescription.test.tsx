import { validateDescription } from "../../utils/validation";

describe("validateDescription", () => {
  it("should return an error for empty description", () => {
    expect(validateDescription("")).toBe("Description is required!");
  });

  it("should return an error for description less than 10 characters", () => {
    expect(validateDescription("Short")).toBe(
      "Title should be at least 10 characters long!"
    );
  });

  it("should return an error for description longer than 100 characters", () => {
    expect(validateDescription("A".repeat(101))).toBe(
      "Description should be at least not exceed 100 characters!"
    );
  });

  it("should return an error if description starts with spaces", () => {
    expect(validateDescription("  DescriptionTrimMe")).toBe(
      "Description cannot start or end with spaces!"
    );
  });

  it("should return an error for HTML tags", () => {
    expect(validateDescription("Hello <b>World</b>")).toBe(
      "Description cannot contain HTML tags!"
    );
  });

  it("should return undefined for valid descriptions", () => {
    expect(validateDescription("This is a valid description!")).toBeUndefined();
  });
});
