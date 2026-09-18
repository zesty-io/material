import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Transfer List is a *pattern*, not a component — MUI documents it but exports
 * nothing called TransferList. It is composed from Card, List, Checkbox and
 * Button, so it inherits whatever those are themed to.
 *
 * Under M3 the list items pick up the pill hover shape and 56px minimum height,
 * which makes the lists noticeably taller than under the legacy theme.
 */
const meta: Meta<typeof Card> = {
  title: "MUI/Inputs/Transfer List",
  component: Card,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Card>;

type Item = string;

const not = (a: Item[], b: Item[]) => a.filter((v) => !b.includes(v));
const intersection = (a: Item[], b: Item[]) => a.filter((v) => b.includes(v));
const union = (a: Item[], b: Item[]) => [...a, ...not(b, a)];

const LEFT: Item[] = ["Title", "Slug", "Description", "Hero image"];
const RIGHT: Item[] = ["Author", "Published at", "Tags"];

/** Shared list body. `header` is what distinguishes the simple/enhanced forms. */
const ItemList = ({
  items,
  checked,
  onToggle,
  header,
}: {
  items: Item[];
  checked: Item[];
  onToggle: (item: Item) => void;
  header?: ReactNode;
}) => (
  <Card variant="outlined" sx={{ width: 240 }}>
    {header}
    {header && <Divider />}
    <List dense component="div" role="list" sx={{ height: 230, overflow: "auto" }}>
      {items.map((item) => {
        const labelId = `transfer-item-${item.replace(/\s+/g, "-")}`;
        return (
          <ListItemButton key={item} role="listitem" onClick={() => onToggle(item)}>
            <ListItemIcon>
              <Checkbox
                checked={checked.includes(item)}
                tabIndex={-1}
                disableRipple
                slotProps={{ input: { "aria-labelledby": labelId } }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={item} />
          </ListItemButton>
        );
      })}
    </List>
  </Card>
);

const Simple = () => {
  const [checked, setChecked] = useState<Item[]>([]);
  const [left, setLeft] = useState<Item[]>(LEFT);
  const [right, setRight] = useState<Item[]>(RIGHT);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const toggle = (item: Item) =>
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );

  const moveRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const moveLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: "wrap", rowGap: 2 }}>
      <ItemList items={left} checked={checked} onToggle={toggle} />
      <Stack spacing={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={moveRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={moveLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
      </Stack>
      <ItemList items={right} checked={checked} onToggle={toggle} />
    </Stack>
  );
};

export const Default: Story = {
  render: () => (
    <Stacked title="Simple" description="Select items on either side, then move them across.">
      <Simple />
    </Stacked>
  ),
};

const Enhanced = () => {
  const [checked, setChecked] = useState<Item[]>([]);
  const [left, setLeft] = useState<Item[]>(LEFT);
  const [right, setRight] = useState<Item[]>(RIGHT);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const toggle = (item: Item) =>
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );

  const toggleAll = (items: Item[]) => () => {
    if (intersection(checked, items).length === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const header = (title: string, items: Item[]) => (
    <CardHeader
      sx={{ px: 2, py: 1 }}
      avatar={
        <Checkbox
          onClick={toggleAll(items)}
          checked={intersection(checked, items).length === items.length && items.length !== 0}
          indeterminate={
            intersection(checked, items).length !== items.length &&
            intersection(checked, items).length !== 0
          }
          disabled={items.length === 0}
          slotProps={{ input: { "aria-label": `select all ${title}` } }}
        />
      }
      title={title}
      subheader={`${intersection(checked, items).length}/${items.length} selected`}
    />
  );

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: "wrap", rowGap: 2 }}>
      <ItemList
        items={left}
        checked={checked}
        onToggle={toggle}
        header={header("Available", left)}
      />
      <Stack spacing={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setRight(right.concat(left));
            setLeft([]);
          }}
          disabled={left.length === 0}
          aria-label="move all right"
        >
          ≫
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setRight(right.concat(leftChecked));
            setLeft(not(left, leftChecked));
            setChecked(not(checked, leftChecked));
          }}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setLeft(left.concat(rightChecked));
            setRight(not(right, rightChecked));
            setChecked(not(checked, rightChecked));
          }}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setLeft(left.concat(right));
            setRight([]);
          }}
          disabled={right.length === 0}
          aria-label="move all left"
        >
          ≪
        </Button>
      </Stack>
      <ItemList
        items={right}
        checked={checked}
        onToggle={toggle}
        header={header("Selected", right)}
      />
    </Stack>
  );
};

/** Adds select-all headers and move-all controls. */
export const Enhanced_: Story = {
  name: "Enhanced",
  render: () => (
    <Stacked
      title="Enhanced"
      description="Header checkboxes select all / none per side, with an indeterminate middle state."
    >
      <Enhanced />
    </Stacked>
  ),
};

/** Empty and full states — the move-all buttons should disable correctly. */
export const EdgeStates: Story = {
  render: () => (
    <Stacked title="Empty side" description="Move everything across to check the disabled states.">
      <Box>
        <Enhanced />
      </Box>
    </Stacked>
  ),
};
