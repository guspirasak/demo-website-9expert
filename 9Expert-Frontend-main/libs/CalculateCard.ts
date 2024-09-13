export function calculateCards(windowWidth: number,): number {
    const totalMargin = 30 * Math.floor(windowWidth / (340 + 30));
    const availableWidth = windowWidth - totalMargin;
    const numCards = Math.floor(availableWidth / 340);
    return numCards;
}