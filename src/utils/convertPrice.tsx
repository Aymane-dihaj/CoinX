export const convertPrice = (price: number): string => {
    if (price >= 1_000_000_000) {
        return (price / 1_000_000_000).toFixed(1) + 'B';
    } else if (price >= 1_000_000) {
        return (price / 1_000_000).toFixed(1) + 'M';
    } else if (price >= 1_000) {
        return (price / 1_000).toFixed(1) + 'K';
    } else {
        return price.toFixed(2).toString();
    }
};