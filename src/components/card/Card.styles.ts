import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  cardButton: {
    width: "100%",
    textAlign: "left",
    padding: "10px 8px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },

  cardButtonOpened: {
    border: `3px solid ${theme.colors.blue[1]}`,
    backgroundColor: theme.colors.blue[0] + "3b",
    padding: "8px 6px",
  },
}));
