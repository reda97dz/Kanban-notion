import { ThemeContext } from "@emotion/react";
import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  listContainer: {
    position: "relative",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    overflowX: "scroll",
    paddingBottom: 10,
    minWidth: 600,
    maxWidth: 1200,
    width: "fit-content",
    "> button": {
      maxWidth: 10,
    },
    "> div": {
      width: 300,
      minWidth: 300,
    },
    "::-webkit-scrollbar": {
      width: 2,
      height: 2,
    },

    "::-webkit-scrollbar-thumb": {
      borderRadius: "2em",
      outline: "none",
      backgroundColor: theme.colors.gray[2],
    },

    "::-webkit-scrollbar-track-piece": {
      margin: "2em 0",
      borderRadius: "2em",
    },
  },
}));
