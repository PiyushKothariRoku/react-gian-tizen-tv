import HtmlWebpackPlugin = require("html-webpack-plugin");
export const mode: string;
export const target: string;
export const entry: string;
export namespace module {
    const rules: ({
        test: RegExp;
        exclude: RegExp;
        use: {
            loader: string;
            options: {
                presets: string[];
            };
        };
        loader?: undefined;
    } | {
        test: RegExp;
        loader: string;
        exclude: RegExp;
        use?: undefined;
    })[];
}
export namespace resolve {
    const extensions: string[];
}
export namespace output {
    const filename: string;
    const path: string;
    const globalObject: string;
}
export const plugins: HtmlWebpackPlugin[];
