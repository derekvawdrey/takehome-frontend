import React from "react";
import type { MergeConflict } from "../../../../api/types/merge.types";

interface CustomInputProps {
    conflict: MergeConflict;
    value: any;
    onChange: (value: any) => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
    conflict,
    value,
    onChange,
}) => {
    const inputBase =
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500";

    switch (conflict.valueType) {
        case "number":
            return (
                <input
                    type="number"
                    value={value ?? ""}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={inputBase}
                />
            );

        case "boolean":
            return (
                <select
                    value={String(value ?? true)}
                    onChange={(e) =>
                        onChange(e.target.value === "true")
                    }
                    className={inputBase}
                >
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            );

        case "object":
        case "array":
            return (
                <textarea
                    rows={4}
                    value={
                        typeof value === "string"
                            ? value
                            : JSON.stringify(value ?? {}, null, 2)
                    }
                    onChange={(e) => onChange(e.target.value)}
                    className={`${inputBase} font-mono text-xs`}
                />
            );

        default:
            return (
                <input
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputBase}
                />
            );
    }
};