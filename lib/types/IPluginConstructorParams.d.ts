import { ICompileOptions } from '@shiftcode/translation-markup/lib/src/interfaces/ICompileOptions';
export interface IPluginConstructorParams {
    globPath?: string;
    outputDirectory?: string;
    options?: ICompileOptions;
    test?: string;
}
