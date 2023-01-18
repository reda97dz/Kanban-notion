import { Paper, Text, Collapse, Divider, Space } from "@mantine/core";
import { useContext, useState } from "react";

import { useStyles } from "./Card.styles";
import {
  useClickOutside,
  useDebouncedValue,
  useDidUpdate,
  useHover,
  useMergedRef,
} from "@mantine/hooks";
import CardDrawer from "./cardDrawer/CardDrawer";
import useCards from "../../hooks/useCards";
import NewCardContent from "./newCardContent/NewCardContent";
import CardActions from "./cardActions/CardActions";
import { CardNotesContext } from "../../App";

export interface CardProps {
  card: Card;
  newCard?: boolean;
  addCardToList?: (card: Card) => void;
  removeCardFromList?: (cardId: number) => void;
}

export default function Card(props: CardProps) {
  const { card, newCard, addCardToList, removeCardFromList } = props;
  const { classes } = useStyles();
  const [{ loading, error }, { editCard }] = useCards();
  const [opened, setOpened] = useState(false);
  const [isNewCard, setIsNewCard] = useState<boolean>(!!newCard);
  const [cardName, setCardName] = useState(card.name);
  const [cardDesc, setCardDesc] = useState(card.description);

  const [cardNameInput] = useDebouncedValue(cardName, isNewCard ? 800 : 500);
  const [cardDescInput] = useDebouncedValue(cardDesc, 500);

  useDidUpdate(() => {
    if (card.id) {
      editCard(card.id, {
        ...card,
        name: cardName,
        description: cardDescInput,
      });
      setIsNewCard(false);
    } else {
      if (isNewCard && addCardToList) {
        addCardToList({ ...card, name: cardName });
      }
    }
  }, [cardNameInput, cardDescInput]);

  const clickOutsideRef = useClickOutside(() => {
    setIsNewCard(false);
  });

  const { hovered, ref } = useHover();

  const mergedRef = useMergedRef(ref, clickOutsideRef);

  const { show } = useContext(CardNotesContext);

  return (
    <>
      <CardDrawer
        opened={opened}
        setOpened={setOpened}
        cardId={card.id}
        cardName={cardName}
        setCardName={setCardName}
        cardDesc={cardDesc}
        setCardDesc={setCardDesc}
        error={error}
        loading={loading}
      />
      <Paper
        className={`${classes.cardButton} ${
          opened && classes.cardButtonOpened
        }`}
        // component="button"
        shadow="xs"
        withBorder
        radius="sm"
        onClick={() => setOpened((o) => !o)}
        ref={mergedRef}
        style={{
          position: "relative",
        }}
      >
        {isNewCard ? (
          <NewCardContent
            cardName={cardName}
            setCardName={setCardName}
            setIsNewCard={setIsNewCard}
          />
        ) : (
          <>
            <Text color={cardName ? "dark" : "gray.5"} size="md">
              {cardName ? cardName : "Untitled"}
            </Text>
            {hovered && (
              <CardActions
                setIsNewCard={setIsNewCard}
                deleteCard={() => {
                  if (removeCardFromList)
                    removeCardFromList(card.id ? card.id : 0);
                }}
              />
            )}
          </>
        )}
        <Collapse
          in={show}
          transitionDuration={500}
          transitionTimingFunction="linear"
        >
          {card.description.length > 0 && <Divider my={5} />}
          <Text>{card.description}</Text>
        </Collapse>
      </Paper>
    </>
  );
}
