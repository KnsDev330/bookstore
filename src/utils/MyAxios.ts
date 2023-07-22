/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios, { AxiosRequestConfig } from "axios";
import { SERVER_URL } from "../config";

const MyAxios = {
   get: async <ResponseDataType>(url: string, headers: null | string)
      : Promise<ResponseDataType | null> => await MyAxios.getData('GET', url, headers, ""),

   delete: async <ResponseDataType>(url: string, headers: null | string)
      : Promise<ResponseDataType | null> => await MyAxios.getData('DELETE', url, headers, ""),

   post: async <ResponseDataType>(url: string, headers: null | string, body: any = null)
      : Promise<ResponseDataType | null> => await MyAxios.getData('POST', url, headers, body),

   patch: async <ResponseDataType>(url: string, headers: null | string, body: any = null)
      : Promise<ResponseDataType | null> => await MyAxios.getData('PATCH', url, headers, body),

   getData: async <ResponseDataType>(
      method: string,
      url: string,
      headers: null | string,
      body: any
   ): Promise<ResponseDataType | null> => {
      try {
         const jwt = localStorage.getItem("jwt");
         const config: AxiosRequestConfig = { url: SERVER_URL + url, method };

         if (!headers) headers = '';
         if (jwt) headers += `;authorization:${jwt}`;
         const headsArray = headers.split(';').map(head => head.split(':')).filter(el => typeof el === 'object' && el.length === 2);
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
         console.log(e);

         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
         if (e?.response?.data) return e.response.data;
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         return e;
      }
   }
}

export default MyAxios;