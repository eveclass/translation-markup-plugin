import { IPluginConstructorParams } from '../types/IPluginConstructorParams';
/**
 * Plugin class
 */
declare class TranslationMarkupPlugin {
    private readonly globPath;
    private readonly outputDirectory;
    private readonly options;
    private readonly test;
    constructor(params?: IPluginConstructorParams);
    apply(compiler: any): void;
}
export default TranslationMarkupPlugin;
