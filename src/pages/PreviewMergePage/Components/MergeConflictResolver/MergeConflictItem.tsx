import React from "react";
import { CustomInput } from "./CustomInput";
import type { MergeConflict } from "../../../../api/types/merge.types";
import type { ConflictSelection, ResolutionOption } from "./types";

interface MergeConflictItemProps {
    conflict: MergeConflict;
    selection?: ConflictSelection;
    onChange: (selection: ConflictSelection) => void;
}

export const MergeConflictItem: React.FC<
    MergeConflictItemProps
> = ({ conflict, selection, onChange }) => {
    const selectedOption = selection?.option ?? "target";

    const handleOptionChange = (option: ResolutionOption) => {
        onChange({
            ...selection,
            option,
        });
    };

    return (
        <div className="px-6 py-5">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">
                {conflict.field}
            </p>

            <div className="space-y-3">
                <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                        selectedOption === "target"
                            ? "border-slate-300 bg-slate-50 ring-1 ring-slate-300"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                >
                    <input
                        type="radio"
                        name={conflict.field}
                        checked={selectedOption === "target"}
                        onChange={() => handleOptionChange("target")}
                        className="mt-0.5 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-500"
                    />
                    <span className="flex-1">
                        <span className="text-sm font-medium text-slate-700">
                            Keep target
                        </span>
                        <pre className="mt-1.5 overflow-x-auto rounded bg-slate-100 px-2.5 py-1.5 text-xs text-slate-700">
                            {JSON.stringify(conflict.targetValue)}
                        </pre>
                    </span>
                </label>

                <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                        selectedOption === "duplicate"
                            ? "border-slate-300 bg-slate-50 ring-1 ring-slate-300"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                >
                    <input
                        type="radio"
                        name={conflict.field}
                        checked={selectedOption === "duplicate"}
                        onChange={() => handleOptionChange("duplicate")}
                        className="mt-0.5 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-500"
                    />
                    <span className="flex-1">
                        <span className="text-sm font-medium text-slate-700">
                            Keep duplicate
                        </span>
                        <pre className="mt-1.5 overflow-x-auto rounded bg-slate-100 px-2.5 py-1.5 text-xs text-slate-700">
                            {JSON.stringify(conflict.duplicateValue)}
                        </pre>
                    </span>
                </label>

                <div
                    className={`rounded-lg border p-3 transition ${
                        selectedOption === "custom"
                            ? "border-slate-300 bg-slate-50 ring-1 ring-slate-300"
                            : "border-slate-200 bg-white"
                    }`}
                >
                    <label className="flex cursor-pointer items-start gap-3">
                        <input
                            type="radio"
                            name={conflict.field}
                            checked={selectedOption === "custom"}
                            onChange={() => handleOptionChange("custom")}
                            className="mt-0.5 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-500"
                        />
                        <span className="text-sm font-medium text-slate-700">
                            Custom value
                        </span>
                    </label>

                    {selectedOption === "custom" && (
                        <div className="mt-3 pl-7">
                            <CustomInput
                                conflict={conflict}
                                value={selection?.customValue}
                                onChange={(value) =>
                                    onChange({
                                        option: "custom",
                                        customValue: value,
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};