import { NextApiResponse, NextApiRequest } from "next";

export default function middleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  // console.log(req)
  // const isProductsPage = req.headers.referer;
  // console.log(isProductsPage)
  // res.setHeader("X-Custom-Header", "Hello, world!");
  // next();
}

// const req = {
//   cookies: RequestCookies {"USER_SLUG":{"name":"USER_SLUG","value":"saul_06-14d6zM"},"ACCESS_TOKEN":{"name":"ACCESS_TOKEN","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE4MzkyNDM0NGYzNjI1YWRkMDgwZDciLCJlbWFpbCI6ImdlbnNoaW5pbXBhY3Q2MjUxQGdtYWlsLmNvbSIsImlhdCI6MTY3OTMxMjE3NSwiZXhwIjoxMjQ3OTMxMjE3NX0.iLj56QgCo_t1N4bzS9NO1PrCbsdi_qkDCvGEE7uXjkA"}},
//   geo: {},
//   ip: undefined,
//   nextUrl: {
//   href: 'http://localhost:3000/favicon.ico',
//   origin: 'http://localhost:3000',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'localhost:3000',
//   hostname: 'localhost',
//   port: '3000',
//   pathname: '/favicon.ico',
//   search: '',
//   searchParams: URLSearchParams {  },
//   hash: ''
// },
//   url: 'http://localhost:3000/favicon.ico',
//   bodyUsed: false,
//   cache: 'default',
//   credentials: 'same-origin',
//   destination: '',
//   headers: {
//   accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
//   accept-encoding: 'gzip, deflate, br',
//   accept-language: 'en-GB,en-US;q=0.9,en;q=0.8,bn;q=0.7',
//   connection: 'keep-alive',
//   cookie: 'USER_SLUG=saul_06-14d6zM; ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE4MzkyNDM0NGYzNjI1YWRkMDgwZDciLCJlbWFpbCI6ImdlbnNoaW5pbXBhY3Q2MjUxQGdtYWlsLmNvbSIsImlhdCI6MTY3OTMxMjE3NSwiZXhwIjoxMjQ3OTMxMjE3NX0.iLj56QgCo_t1N4bzS9NO1PrCbsdi_qkDCvGEE7uXjkA',
//   dnt: '1',
//   host: 'localhost:3000',
//   if-modified-since: 'Wed, 11 Jan 2023 05:47:37 GMT',
//   if-none-match: 'W/"654b-1859f5ea1d1"',
//   referer: 'http://localhost:3000/sellers',
//   sec-ch-ua: '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//   sec-ch-ua-mobile: '?0',
//   sec-ch-ua-platform: '"Windows"',
//   sec-fetch-dest: 'image',
//   sec-fetch-mode: 'no-cors',
//   sec-fetch-site: 'same-origin',
//   user-agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'     
// },
//   integrity: '',
//   keepalive: false,
//   method: 'GET',
//   mode: 'cors',
//   redirect: 'follow',
//   referrer: 'about:client',
//   referrerPolicy: '',
//   signal: AbortSignal {
//   [Symbol(kAborted)]: false,
//   [Symbol(kReason)]: undefined,
//   [Symbol(kOnabort)]: undefined,
//   [Symbol(realm)]: { settingsObject: { baseUrl: undefined } }
// }
// }








// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/',
// }