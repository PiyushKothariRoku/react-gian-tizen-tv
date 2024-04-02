export const mode: string;
export const entry: string;
export const target: string[];
export namespace module {
    const rules: {
        test: RegExp;
        use: string;
        exclude: RegExp;
    }[];
}
export namespace resolve {
    const extensions: string[];
}
export const externals: (string | RegExp)[];
export namespace output {
    const filename: string;
    const path: string;
    const libraryTarget: string;
    const clean: boolean;
    const globalObject: string;
}
