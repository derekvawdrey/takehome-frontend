export type ResolutionOption = "target" | "duplicate" | "custom";

export interface ConflictSelection {
    option: ResolutionOption;
    customValue?: any;
}

export type MergeResolution = {
    field: string;
    resolution: "target" | "duplicate" | "override";
    value: any;
};