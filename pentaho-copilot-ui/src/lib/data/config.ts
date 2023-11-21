import baseUseSWR, { Key, SWRConfiguration } from "swr";

export const base = "/api/v1";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

// overload the useSWR function to set the fetcher and add suspense by default
export default function useSWR<Data, Error = unknown>(
  key: Key,
  options?: SWRConfiguration<Data, Error>
) {
  return baseUseSWR<Data, Error>(`${base}${key}`, fetcher, {
    suspense: true,
    ...options
  });
}
