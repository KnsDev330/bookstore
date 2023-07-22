import { IServerResponse } from "../redux/features/interfaces";

export const sleep = (ms: number) => new Promise(r => setTimeout(() => r(''), ms));
export const TextEllipse = (text: string, maxLength: number): string => text.length < maxLength ? text : text.substring(0, maxLength) + '...';

export const getErrors = (r: IServerResponse): string => {
   let mErrors = `myError$$$${r.text}$$$`;
   r.errors.map((e, i) => mErrors += `${i === 0 ? `` : `::`}${e.path === 'any' ? e.message : `${e.path} - ${e.message}`}`);
   return mErrors;
}