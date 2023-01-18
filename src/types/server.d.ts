interface RequestData {
  data: any;
  loading: boolean;
  error: Error | null | unknown;
}

interface RequestMethods {
  get: (url: string) => void;
  remove: (url: string) => void;
  post: (url: string, data: any) => void;
  put: (url: string, data: any) => void;
}
