import { IPluginConstructorParams } from '../types/IPluginConstructorParams';
/**
 * Plugin class
 */
declare class TranslationMarkupPlugin {
    private readonly globPath;
    private readonly outputDirectory;
    private readonly options;
    constructor(pluginOptions?: IPluginConstructorParams);
    apply(compiler: any): void;
    private compileTranslationFiles;
}
export default TranslationMarkupPlugin;
