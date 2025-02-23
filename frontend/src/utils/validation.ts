export const validateTitle = (title: string): string | undefined => {
  if (!title.trim()) return "Title is required!";
  if (title.length < 3) return "Title should be at least 3 characters long!";
  if (title.length > 40) return "Title should not exceed 40 characters!";
  if (!/^[a-zA-Z0-9\s]+$/.test(title))
    return "Title can only contain alphanumeric characters and spaces!";
  if (/^\d+$/.test(title)) return "Title cannot be purely numeric!";
  if (title.includes("  ")) return "Title cannot contain consecutive spaces!";
  return undefined;
};

export const validateDescription = (
  description: string
): string | undefined => {
  if (!description.trim()) return "Description is required!";
  if (description.length < 10)
    return "Title should be at least 10 characters long!";
  if (description.length > 100)
    return "Description should be at least not exceed 100 characters!";
  if (/^\s+|\s+$/g.test(description))
    return "Description cannot start or end with spaces!";
  if (description.includes("<") || description.includes(">"))
    return "Description cannot contain HTML tags!";
  if (!/[a-zA-Z0-9]/.test(description))
    return "Description must contain at least one alphanumeric character!";
  return undefined;
};
