

export const firstStringUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const parseInput = (input: string, tags: string[]): string[] => {
    const newTags = input.split(",").filter((tag: string) => tag !== "");
    const uniqueTags = newTags.filter((tag: string) => !tags.includes(tag));

    const uniqueTagSet = new Set([...tags, ...uniqueTags]);

    return Array.from(uniqueTagSet);
}
