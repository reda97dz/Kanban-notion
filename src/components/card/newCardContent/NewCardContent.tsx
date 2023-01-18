import { Input } from "@mantine/core";
import React, { useState } from "react";

import { useStyles } from "./NewCardContent.styles";
import useCards from "../../../hooks/useCards";

interface NewCardProps {
  cardName: string;
  setCardName: React.Dispatch<React.SetStateAction<string>> | Function;
  setIsNewCard: React.Dispatch<React.SetStateAction<boolean>> | Function;
}

export default function NewCardContent(props: NewCardProps) {
  const { cardName, setCardName, setIsNewCard } = props;
  const [cardNameValue, setCardNameValue] = useState(cardName);

  const { classes } = useStyles();
  return (
    <Input
      autoFocus
      variant="unstyled"
      size="md"
      p={0}
      onKeyDown={(e) => {
        if (e.key === " ") {
          e.preventDefault();
          setCardNameValue((p) => p + " ");
        }
        if (e.key === "Enter") {
          e.preventDefault();
          setCardName(cardNameValue);
          setCardNameValue(e.currentTarget.value);
        }
      }}
      onClick={(e) => e.stopPropagation()}
      m={0}
      classNames={{
        input: classes.input,
      }}
      value={cardNameValue}
      onChange={(e) => {
        setCardName(e.target.value);
        setCardNameValue(e.target.value);
      }}
    />
  );
}
