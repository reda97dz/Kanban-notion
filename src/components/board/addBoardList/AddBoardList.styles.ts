import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  dropdown: {
    padding: "10px",
    maxWidth: "150px",
  },
  actionIcon: {
    width: "10px"
  },

  inputWrapper: {
    maxWidth: "100%",
  },

  inputStyle: {
    background: theme.colors.gray[0],
  },
}));
