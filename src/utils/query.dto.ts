export class QueryDto {
    page: number;

    limit: number;
}

export const calcSkip = function(page, limit) {
    return page  === 1 ? 0 : (Number(page) - 1) * +limit
}