import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconPencil, IconTrashX } from "@tabler/icons";
import { SetStateAction } from "react";

interface CardActionsProps {
  setIsNewCard: (value: SetStateAction<boolean>) => void;
  deleteCard: Function;
}

export default function CardActions(props: CardActionsProps) {
  const { setIsNewCard, deleteCard } = props;

  return (
    <Flex
      direction="row"
      align="center"
      justify="flex-start"
      style={{ position: "absolute", top: 9, right: 13 }}
      gap={4}
    >
      <Tooltip label="Edit">
        <ActionIcon
          size="md"
          color="gray.5"
          variant="outline"
          style={{ background: "white" }}
          styles={{
            root: {
              background: "white",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsNewCard(true);
          }}
        >
          <IconPencil size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete" color="red">
        <ActionIcon
          size="md"
          color="red.5"
          variant="outline"
          style={{ background: "white" }}
          styles={{
            root: {
              background: "white",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            deleteCard()
          }}
        >
          <IconTrashX size={16} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
}
