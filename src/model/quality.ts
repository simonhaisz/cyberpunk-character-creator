export type Quality = {
    Name: string;
    Cost: string;
};

export type Qualities = {
    positive: Quality[];
    negative: Quality[];
}

export function getQualitiesCost(selectedQualities: string[], allQualities: Quality[]): number {
    let cost = 0;
    for (const selected of selectedQualities) {
        const quality = allQualities.find(q => q.Name === selected);
        if (!quality) {
            throw new Error(`Could not find quality with name '${selected}' in list '${JSON.stringify(allQualities)}'`);
        }
        cost += parseInt(quality.Cost);
    }
    return cost;
}

export function getAllQualitiesCost(selectedQualities: { positive: string[], negative: string[] }, allQualities: Qualities): number {
    let cost = 0;
    cost += getQualitiesCost(selectedQualities.positive, allQualities.positive);
    cost += getQualitiesCost(selectedQualities.negative, allQualities.negative);
    return cost;
}