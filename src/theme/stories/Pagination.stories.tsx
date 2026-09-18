import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/**
 * Unthemed by both families — selected pages take `primary.main`, so this is
 * another read on the brand colour at small sizes.
 */
const meta: Meta<typeof Pagination> = {
  title: "MUI/Navigation/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const Controlled = () => {
      const [page, setPage] = useState(1);
      return (
        <Stack spacing={1}>
          <Pagination count={10} page={page} onChange={(_e, next) => setPage(next)} />
          <Typography variant="caption" color="text.secondary">
            page {page} of 10
          </Typography>
        </Stack>
      );
    };
    return (
      <Stacked title="Controlled">
        <Controlled />
      </Stacked>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Stacked title="variant and shape">
      <Stack spacing={2}>
        <Pagination count={10} defaultPage={3} />
        <Pagination count={10} defaultPage={3} variant="outlined" />
        <Pagination count={10} defaultPage={3} shape="rounded" />
        <Pagination count={10} defaultPage={3} variant="outlined" shape="rounded" />
      </Stack>
    </Stacked>
  ),
};

export const SizesAndColors: Story = {
  render: () => (
    <Stacked title="size and color">
      <Stack spacing={2}>
        {(["small", "medium", "large"] as const).map((size) => (
          <Pagination key={size} count={10} defaultPage={3} size={size} />
        ))}
        {(["primary", "secondary", "standard"] as const).map((color) => (
          <Pagination key={color} count={10} defaultPage={3} color={color} />
        ))}
      </Stack>
    </Stacked>
  ),
};

/** `siblingCount` and `boundaryCount` control how much of the range stays visible. */
export const Ranges: Story = {
  render: () => (
    <Stacked title="siblingCount / boundaryCount">
      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            default
          </Typography>
          <Pagination count={20} defaultPage={10} />
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            siblingCount=0
          </Typography>
          <Pagination count={20} defaultPage={10} siblingCount={0} />
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            boundaryCount=2
          </Typography>
          <Pagination count={20} defaultPage={10} boundaryCount={2} />
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            showFirstButton / showLastButton
          </Typography>
          <Pagination count={20} defaultPage={10} showFirstButton showLastButton />
        </Stack>
      </Stack>
    </Stacked>
  ),
};

export const CustomItems: Story = {
  render: () => (
    <Stacked title="renderItem" description="Swap the previous/next glyphs or wrap items in links.">
      <Pagination
        count={10}
        defaultPage={4}
        renderItem={(item) => (
          <PaginationItem slots={{ previous: ArrowBack, next: ArrowForward }} {...item} />
        )}
      />
    </Stacked>
  ),
};
