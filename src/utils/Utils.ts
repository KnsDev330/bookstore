/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { IServerResponse } from "../interfaces/ServerResponse";
import { SerializedError } from "@reduxjs/toolkit";

export const sleep = (ms: number) => new Promise(r => setTimeout(() => r(''), ms));
export const TextEllipse = (text: string, maxLength: number): string => text.length < maxLength ? text : text.substring(0, maxLength) + '...';
export const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getErrors = (r: IServerResponse | FetchBaseQueryError | SerializedError): string => {

   r = r as IServerResponse;
   if (r?.data?.text && r?.data?.errors) {
      const data = r.data as IServerResponse;
      let mErrors = `myError$$$${data.text}$$$`;
      data.errors.map((e, i) => mErrors += `${i === 0 ? `` : `::`}${e.path === 'any' ? e.message : `${e.path} - ${e.message}`}`);
      return mErrors;
   }

   r = (r as any) as SerializedError;
   if (r?.message && r?.name)
      return `myError$$$${r.name}$$$${r.message}`;

   const x = (r as any);
   if (x.error && x.status)
      return `myError$$$${x.status as string}$$$${x.error as string}`;


   if (x?.text && x?.errors) {
      const data = x as IServerResponse;
      let mErrors = `myError$$$${data.text}$$$`;
      data.errors.map((e, i) => mErrors += `${i === 0 ? `` : `::`}${e.path === 'any' ? e.message : `${e.path} - ${e.message}`}`);
      return mErrors;
   }

   return `Unknown error`;
}