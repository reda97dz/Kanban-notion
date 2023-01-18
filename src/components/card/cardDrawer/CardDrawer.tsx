import {
  Divider,
  Drawer,
  Flex,
  Input,
  Loader,
  Text,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import { useStyles } from "./CardDrawer.styles";
import { useDidUpdate } from "@mantine/hooks";

interface CardDrawerProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  cardId: number | undefined;
  cardName: string;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
  cardDesc: string;
  setCardDesc: React.Dispatch<React.SetStateAction<string>>;
  error: any;
  loading: boolean;
}

export default function CardDrawer(props: CardDrawerProps) {
  const {
    opened,
    setOpened,
    cardId,
    cardName,
    setCardName,
    cardDesc,
    setCardDesc,
    loading,
    error,
  } = props;
  const { classes } = useStyles();

  const [cardNameValue, setCardNameValue] = useState(cardName);
  const [cardDescValue, setCardDescValue] = useState(cardDesc);

  useDidUpdate(() => {
    setCardNameValue(cardName)
  }, [cardName])

  return (
    <Drawer
      opened={opened}
      position="right"
      onClose={() => setOpened(false)}
      overlayColor="transparent"
      padding="xl"
      size="xl"
      shadow="xl"
      classNames={{
        body: classes.drawerBody,
      }}
    >
      {loading ||
        (error && (
          <div className={classes.feedback}>
            {loading ? (
              <Flex align="center" direction="row">
                <Loader color="gray" size={10} />
                <Text ml={10} color="gray" size={12}>
                  saving...
                </Text>
              </Flex>
            ) : (
              <Text size={10} color="red">
                error saving, try again
              </Text>
            )}
          </div>
        ))}
      <Input
        variant="unstyled"
        value={cardNameValue}
        placeholder="Untitled"
        onChange={(e) => {
          setCardName(e.target.value);
          setCardNameValue(e.target.value);
        }}
        classNames={{
          input: classes.titleInput,
        }}
      />

      <Divider mt="sm" size={1} color="gray.1" />

      <Textarea
        value={cardDescValue}
        onChange={(e) => {
          setCardDesc(e.target.value);
          setCardDescValue(e.target.value);
        }}
        classNames={{
          root: classes.textAreaRoot,
          wrapper: classes.textAreaWapper,
          input: classes.textAreaInput,
        }}
        variant="unstyled"
        placeholder="Description here"
      />
    </Drawer>
  );
}
