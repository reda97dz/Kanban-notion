import { useState } from "react";

const useServer = (): [RequestData, RequestMethods] => {
  const [data, setData] = useState<RequestData>({
    data: null,
    loading: false,
    error: null,
  });

  const get = async (url: string) => {
    setData({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData({ data: json, loading: false, error: null });
    } catch (err) {
      setData({ data: null, loading: false, error: err });
    }
  };

  const put = async (url: string, body: any) => {
    setData({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setData({ data: json, loading: false, error: null });
    } catch (err) {
      setData({ data: null, loading: false, error: err });
    }
  };

  const post = async (url: string, body: any) => {
    setData({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setData({ data: json, loading: false, error: null });
    } catch (err) {
      setData({ data: null, loading: false, error: err });
    }
  };

  const remove = async (url: string) => {
    setData({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      setData({ data: json, loading: false, error: null });
    } catch (err) {
      setData({ data: null, loading: false, error: err });
    }
  };

  return [data, { get, post, put, remove }];
};

export default useServer;
