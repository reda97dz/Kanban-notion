import { ActionIcon, Flex, Input, Menu } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons";

interface ListTitleProps {
  listName: string;
  setListName: (value: React.SetStateAction<string>) => void;
  length: number;
  removeListFromBoard: () => void
}

export default function ListTitle(props: ListTitleProps) {
  const { listName, setListName, length, removeListFromBoard } = props;
  return (
    <Flex align="center" gap="xs" justify="space-between">
      <Input
        styles={{ input: { width: "fit-content" } }}
        variant="unstyled"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      {/* {response.loading && <Loader color="gray" size={10} />} */}
      <Flex align="center" gap="xs" justify='flex-end'>
        <span style={{ color: "gray" }}>{length}</span>
        <Menu
            shadow="lg"
            offset={1}
        >
            <Menu.Target>
            <ActionIcon
                size="md"
                color="gray.6"
                variant="subtle"
            >
                <IconDots size={20} />
            </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
            <Menu.Item onClick={() => removeListFromBoard()} color="red" icon={<IconTrash size={14} />}>
                Remove List
            </Menu.Item>
            </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  );
}
