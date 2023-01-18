interface List {
  id?: number;
  name: string;
  position: number;
  board_id: number;
}

interface ListRequestMethods {
  getLists: () => void;
  getList: (listId: number) => void;
  addList: (data: List) => void;
  editList: (listId: number, data: List) => void;
  removeList: (listId: number) => void;
}
