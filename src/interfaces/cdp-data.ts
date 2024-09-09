export interface CdpData {
    id: number;
    collateral: bigint | string;
    debt: bigint | string;
    owner: string;
    ilk: string;
    urn: string;
    userAddr: string;
}

export interface SearchResult {
    data: CdpData[];
    notFound: boolean;
}