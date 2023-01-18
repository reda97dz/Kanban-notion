import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  drawerBody: {
    height: "100%",
    position: "relative",
  },

  titleInput: {
    fontSize: 30,
    fontWeight: "bold",
    "::placeholder": {
        color: theme.colors.gray[3]
    }
  },

  textAreaRoot: {
    display: "flex",
    height: "calc(100% - 100px)",
    flexDirection: "column",
  },

  textAreaWapper: {
    flex: 1,
  },

  textAreaInput: {
    height: "100%",
  },

  feedback: {
    position: "absolute",
    top: "-38px",
    left: 5,
  },
}));
