/* eslint-disable @typescript-eslint/no-explicit-any */

import { MyFetchInterface } from "../../interfaces/MyFetchInterface";

export const callFetch = async (
  url: string,
  requestOptions: unknown
): Promise<MyFetchInterface> => {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    fetch(url, requestOptions)
      .then(async (response) => {
        const text = await response.text();
        if (!text.trim()) {
          if (!response.ok) {
            return { __empty: true, statusCode: response.status };
          }
          return null;
        }
        try {
          return JSON.parse(text);
        } catch {
          return { __parseError: true, statusCode: response.status };
        }
      })
      .then((result) => {
        if (result?.__parseError || result?.__empty) {
          resolve({
            res: null,
            err: result?.statusCode || "Invalid response",
          });
          return;
        }
        if (result === null) {
          resolve({ res: null, err: "Not found" });
          return;
        }

        if (result?.statusCode >= 400) {
          resolve({
            res: null,
            err: result.message || 400,
          });
        } else {
          resolve({
            res: result,
            err: null,
          });
        }
      })
      .catch((error) => {
        // callback(null, error)
        resolve({
          res: null,
          err: error,
        });
      });
  });
};
