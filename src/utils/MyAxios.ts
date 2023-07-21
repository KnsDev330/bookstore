/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios, { AxiosRequestConfig } from "axios";
import { SERVER_URL } from "../config";
import { IServerResponse } from "../redux/features/interfaces";

const MyAxios = {
   get: async (url: string, headers: null | string)
      : Promise<IServerResponse | null> => await MyAxios.getData('GET', url, headers, ""),

   delete: async (url: string, headers: null | string)
      : Promise<IServerResponse | null> => await MyAxios.getData('DELETE', url, headers, ""),

   post: async (url: string, headers: null | string, body: any = null)
      : Promise<IServerResponse | null> => await MyAxios.getData('POST', url, headers, body),

   patch: async (url: string, headers: null | string, body: any = null)
      : Promise<IServerResponse | null> => await MyAxios.getData('PATCH', url, headers, body),

   getData: async (
      method: string,
      url: string,
      headers: null | string,
      body: any
   ): Promise<IServerResponse | null> => {
      try {
         const jwt = localStorage.getItem("jwt");
         const config: AxiosRequestConfig = { url: SERVER_URL + url, method };
         headers = `${jwt ? `authorization:${jwt}` : ``};${headers === null ? `` : headers}`;
         const headsArray = headers.split(';').map(head => head.split(':'));
         config.headers = headsArray.reduce((obj: { [key: string]: string }, [key, value]) => {
            obj[key] = value;
            return obj;
         }, {});
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         if (method !== 'GET' && method !== 'DELETE' && body) config.data = body;
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         return (await axios(config)).data;
      }
      catch (e: any) {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
         if (e?.response) return e.response;
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         return e;
      }
   }
}

export default MyAxios;