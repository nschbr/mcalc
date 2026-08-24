export interface Entity {
    key: string;
    name: string;
    mark: boolean;
    value: {
        default: number;
        return: number;
    }
}