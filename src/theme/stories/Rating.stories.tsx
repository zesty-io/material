import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating, Stack, Typography } from "@mui/material";
import { Favorite, FavoriteBorder, Star, StarBorder } from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/**
 * Rating is not restyled by either theme — it takes `warning.main` from the
 * palette for the filled state, so it is a quick read on whether that role is
 * sensible. Under M3, `warning` is a generated custom colour.
 */
const meta: Meta<typeof Rating> = {
  title: "MUI/Inputs/Rating",
  component: Rating,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Rating>;

const Controlled = (props: Record<string, unknown>) => {
  const [value, setValue] = useState<number | null>(3);
  return <Rating {...props} value={value} onChange={(_e, next) => setValue(next)} />;
};

export const Default: Story = {
  render: () => (
    <Stacked title="Controlled">
      <Controlled />
    </Stacked>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      {(["small", "medium", "large"] as const).map((size) => (
        <Stack key={size} spacing={1} alignItems="center">
          <Rating defaultValue={3} size={size} />
          <Typography variant="caption">{size}</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

export const Precision: Story = {
  render: () => (
    <Stacked title="precision" description="Half-star ratings and a 10-point scale.">
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          precision=0.5
        </Typography>
        <Rating defaultValue={2.5} precision={0.5} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          max=10
        </Typography>
        <Rating defaultValue={7} max={10} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          highlightSelectedOnly
        </Typography>
        <Rating defaultValue={3} highlightSelectedOnly />
      </Stack>
    </Stacked>
  ),
};

export const States: Story = {
  render: () => (
    <Stacked title="States">
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          readOnly
        </Typography>
        <Rating value={4} readOnly />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          disabled
        </Typography>
        <Rating value={2} disabled />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          null value — nothing selected
        </Typography>
        <Rating value={null} />
      </Stack>
    </Stacked>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <Stacked title="icon / emptyIcon">
      <Rating
        defaultValue={3}
        icon={<Favorite fontSize="inherit" color="error" />}
        emptyIcon={<FavoriteBorder fontSize="inherit" />}
      />
      <Rating
        defaultValue={4}
        icon={<Star fontSize="inherit" color="primary" />}
        emptyIcon={<StarBorder fontSize="inherit" />}
      />
    </Stacked>
  ),
};
