export type Quality = {
    name: string;
    cost: string;
};

export type Qualities = {
    positive: Quality[];
    negative: Quality[];
}

export function getQualitiesCost(qualities: Quality[]): number {
    return qualities.map(q => parseInt(q.cost)).reduce((p, c) => p + c, 0);
}