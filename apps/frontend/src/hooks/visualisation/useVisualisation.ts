
import { useEffect, useState } from "react";
import type { VisualizationConfig } from "./types";
export function useVisualization<S, O, D>(
    config: VisualizationConfig<S, O, D>
) {
    const [selection, setSelection] =
        useState<S>(config.initialSelection);

    const [options, setOptions] =
        useState<O | null>(null);

    const [data, setData] =
        useState<D | null>(null);


    function updateSelection(
        updater: (current: S) => S
    ) {
        setSelection(updater);
    }

    function updateOptions(
        updater: (current: O) => O
    ) {
        setOptions(current => {
            if (current === null) {
                return current;
            }

            return updater(current);
        });
    }

    function updateData(
        updater: (current: D) => D
    ) {
        setData(current => {
            if (current === null) {
                return current;
            }

            return updater(current);
        });
    }

    useEffect(() => {
        config.getOptions(selection)
            .then(setOptions);
    }, [selection]);


    useEffect(() => {
        config.getData(selection)
            .then(setData);
    }, [selection]);


    return {
        selection,
        options,
        data,
        updateSelection,
        updateOptions,
        updateData
    };
}