interface Card {
  id?: number;
  list_id: number;
  name: string;
  description: string;
  position: number;
  due_date: string;
}

interface CardRequestMethods {
  getCards: () => void;
  getCard: (cardId: number) => void;
  addCard: (data: Card) => void;
  editCard: (cardId: number, data: Card) => void;
  removeCard: (cardId: number) => void;
}
