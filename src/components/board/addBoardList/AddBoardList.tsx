import { ActionIcon, Menu, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useStyles } from "./AddBoardList.styles";

interface AddBoardListProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  newListName: string;
  setNewListName: React.Dispatch<React.SetStateAction<string>>;
  onAddList: () => void;
}

export default function AddBoardList(props: AddBoardListProps) {
  const { opened, setOpened, newListName, setNewListName, onAddList } = props;
  const {classes} = useStyles()
  return (
    <Menu
      shadow="lg"
      opened={opened}
      onChange={setOpened}
      offset={1}
      classNames={{
        dropdown: classes.dropdown
      }}
    >
      <Menu.Target>
        <ActionIcon
          size="md"
          color="gray.6"
          variant="subtle"
          classNames={{
            root: classes.actionIcon
          }}
        >
          <IconPlus size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="List name"
          classNames={{
            wrapper: classes.inputWrapper,
            input: classes.inputStyle
          }}
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              onAddList();
              setOpened(false);
            }
          }}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
