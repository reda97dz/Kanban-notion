import useServer from "./useServer";

const useLists = (): [RequestData, ListRequestMethods] => {
  const [{ data, loading, error }, { get, post, put, remove }] = useServer();

  function getLists(): void {
    get("/api/lists");
  }

  function getList(listId: number): void {
    get(`/api/lists/${listId}`);
  }

  function addList(data: List): void {
    post("/api/lists", data);
  }

  function editList(listId: number, data: List): void {
    put(`/api/lists/${listId}`, data);
  }

  function removeList(listId: number): void {
    remove(`/api/lists/${listId}`);
  }

  return [
    { data, loading, error },
    { getLists, getList, addList, editList, removeList },
  ];
};

export default useLists;
