interface Board {
  id?: number;
  name: string;
  description: string;
}

interface BoardRequestMethods {
  getBoards: () => void;
  getBoard: (boardId: number) => void;
  addBoard: (data: Board) => void;
  editBoard: (boardId: number, data: Board) => void;
  removeBoard: (boardId: number) => void;
}
