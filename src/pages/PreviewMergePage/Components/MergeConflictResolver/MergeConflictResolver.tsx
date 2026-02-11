import React, { useState } from "react";
import { MergeConflictItem } from "./MergeConflictItem";
import type { MergeConflict, MergeConflicts } from "../../../../api/types/merge.types";
import type { ConflictSelection, MergeResolution } from "./types";

interface MergeConflictResolverProps {
    data: MergeConflicts;
    onSubmit: (resolved: MergeResolution[]) => void;
    isSubmitting?: boolean;
}

export const MergeConflictResolver: React.FC<
    MergeConflictResolverProps
> = ({ data, onSubmit, isSubmitting = false }) => {
    const [selections, setSelections] = useState<
        Record<string, ConflictSelection>
    >({});

    const handleConflictChange = (
        field: string,
        selection: ConflictSelection
    ) => {
        setSelections((prev) => ({
            ...prev,
            [field]: selection,
        }));
    };

    const handleSubmit = () => {
        const resolved: MergeResolution[] = data.conflicts.map(
            (conflict: MergeConflict) => {
                const selection = selections[conflict.field];

                if (!selection || selection.option === "target") {
                    return {
                        field: conflict.field,
                        resolution: "target" as const,
                        value: conflict.targetValue,
                    };
                }
                if (selection.option === "duplicate") {
                    return {
                        field: conflict.field,
                        resolution: "duplicate" as const,
                        value: conflict.duplicateValue,
                    };
                }
                return {
                    field: conflict.field,
                    resolution: "override" as const,
                    value: selection.customValue,
                };
            }
        );

        onSubmit(resolved);
    };

    return (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Resolve merge conflicts
                </h2>
                <p className="mt-0.5 text-sm text-slate-500">
                    Choose which value to keep for each conflicting field.
                </p>
            </div>

            <div className="divide-y divide-slate-100">
                {data.conflicts.map((conflict) => (
                    <MergeConflictItem
                        key={conflict.field}
                        conflict={conflict}
                        selection={selections[conflict.field]}
                        onChange={(selection) =>
                            handleConflictChange(
                                conflict.field,
                                selection
                            )
                        }
                    />
                ))}
            </div>

            <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Submitting…" : "Submit resolutions"}
                </button>
            </div>
        </div>
    );
};