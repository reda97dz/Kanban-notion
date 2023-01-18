import { createContext, useEffect, useState } from "react";
import useBoards from "./hooks/useBoards";
import { useDidUpdate } from "@mantine/hooks";
import Board from "./components/board/Board";
import { Switch } from "@mantine/core";

export const CardNotesContext = createContext<{
  show: boolean;
  toggle: Function;
}>({
  show: false,
  toggle: () => {},
});

export default function App() {
  const [show, setShow] = useState<boolean>(false);
  const [{ data }, { getBoard }] = useBoards();

  const [board, setBoard] = useState<
    Board & { lists: (List & { cards: Card[] })[] }
  >(data);

  useEffect(() => {
    getBoard(1);
  }, []);

  useDidUpdate(() => {
    setBoard(data);
  }, [getBoard, data]);

  return (
    <CardNotesContext.Provider
      value={{
        show: show,
        toggle: setShow,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Switch
          label="Show all notes"
          checked={show}
          onChange={() => setShow((s) => !s)}
          size="xs"
        />

        {board && <Board board={board} lists={board.lists} />}
      </div>
    </CardNotesContext.Provider>
  );
}
