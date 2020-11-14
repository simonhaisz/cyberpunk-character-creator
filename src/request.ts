export function createPublicUrl(relativeUrl: string): string {
    return `${process.env.PUBLIC_URL}/${relativeUrl}`;
}