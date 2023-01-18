import useServer from "./useServer";

const useCards = (): [RequestData, CardRequestMethods] => {
  const [{ data, loading, error }, { get, post, put, remove }] = useServer();

  function getCards(): void {
    get("/api/cards");
  }

  function getCard(cardId: number): void {
    get(`/api/cards/${cardId}`);
  }

  function addCard(data: Card): void {
    post("/api/cards", data);
  }

  function editCard(cardId: number, data: Card): void {
    put(`/api/cards/${cardId}`, data);
  }

  function removeCard(cardId: number): void {
    remove(`/api/cards/${cardId}`);
  }

  return [
    { data, loading, error },
    { getCards, getCard, addCard, editCard, removeCard },
  ];
};

export default useCards;
