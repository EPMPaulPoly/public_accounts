export interface VisualizationConfig<S, O, D> {
    initialSelection: S;

    getOptions(
        selection: S
    ): Promise<O>;

    getData(
        selection: S
    ): Promise<D>;

    normalizeSelection?(
        selection: S,
        options: O
    ): S;
}