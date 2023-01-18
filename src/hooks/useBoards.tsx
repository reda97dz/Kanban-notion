import useServer from "./useServer";

const useBoards = (): [RequestData, BoardRequestMethods] => {
  const [{ data, loading, error }, { get, post, put, remove }] = useServer();

  function getBoards(): void {
    get("/api/boards");
  }

  async function getBoard(boardId: number): Promise<void> {
    get(`/api/boards/${boardId}`);
  }

  function addBoard(data: Board): void {
    post("/api/boards", data);
  }

  function editBoard(boardId: number, data: Board): void {
    put(`/api/boards/${boardId}`, data);
  }

  function removeBoard(boardId: number): void {
    remove(`/api/boards/${boardId}`);
  }

  return [
    { data, loading, error },
    { getBoards, getBoard, addBoard, editBoard, removeBoard },
  ];
};

export default useBoards;
