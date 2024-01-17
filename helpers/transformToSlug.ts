export const toSlug = (data: string) => {
    const slug = data.toLowerCase().replace(/\s+/g, '_')
    return slug;
}