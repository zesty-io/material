import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, Paper, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * MUI v7's Grid is the rewritten one — sizing goes through the `size` prop
 * (`size={{ xs: 12, md: 6 }}`), not the old `xs` / `md` props, and there is no
 * separate `Grid2` export any more.
 */
const meta: Meta<typeof Grid> = {
  title: "MUI/Layout/Grid",
  component: Grid,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children: ReactNode }) => (
  <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
    <Typography variant="body2">{children}</Typography>
  </Paper>
);

export const Basic: Story = {
  render: () => (
    <Stacked title="size" description="A 12-column grid; size is the span.">
      <Grid container spacing={2}>
        {[12, 6, 6, 4, 4, 4, 3, 3, 3, 3].map((size, i) => (
          <Grid key={i} size={size}>
            <Cell>size={size}</Cell>
          </Grid>
        ))}
      </Grid>
    </Stacked>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Stacked
      title="Responsive size"
      description="Full width on xs, halves on sm, thirds from md up. Resize the canvas."
    >
      <Grid container spacing={2}>
        {Array.from({ length: 6 }, (_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Cell>{i + 1}</Cell>
          </Grid>
        ))}
      </Grid>
    </Stacked>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Stacked title="spacing" description="Row and column spacing can differ.">
      <Grid container spacing={{ xs: 1, md: 4 }} rowSpacing={2}>
        {Array.from({ length: 6 }, (_, i) => (
          <Grid key={i} size={4}>
            <Cell>{i + 1}</Cell>
          </Grid>
        ))}
      </Grid>
    </Stacked>
  ),
};

/** `"grow"` and `"auto"` size from content instead of the column count. */
export const AutoLayout: Story = {
  render: () => (
    <Stacked title="grow and auto">
      <Grid container spacing={2}>
        <Grid size="grow">
          <Cell>grow</Cell>
        </Grid>
        <Grid size={6}>
          <Cell>size=6</Cell>
        </Grid>
        <Grid size="grow">
          <Cell>grow</Cell>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size="auto">
          <Cell>auto — sized to content</Cell>
        </Grid>
        <Grid size="grow">
          <Cell>grow — takes the rest</Cell>
        </Grid>
      </Grid>
    </Stacked>
  ),
};

/** `offset` pushes a cell right without an empty spacer element. */
export const Offset: Story = {
  render: () => (
    <Stacked title="offset">
      <Grid container spacing={2}>
        <Grid size={4}>
          <Cell>size=4</Cell>
        </Grid>
        <Grid size={4} offset={4}>
          <Cell>size=4 offset=4</Cell>
        </Grid>
        <Grid size={6} offset={{ xs: 0, md: 3 }}>
          <Cell>responsive offset</Cell>
        </Grid>
      </Grid>
    </Stacked>
  ),
};

/** The column count is configurable when 12 does not divide cleanly. */
export const CustomColumns: Story = {
  render: () => (
    <Stacked
      title="columns"
      description="A 10-column grid instead of the default 12."
    >
      <Grid container spacing={2} columns={10}>
        {Array.from({ length: 5 }, (_, i) => (
          <Grid key={i} size={2}>
            <Cell>2 / 10</Cell>
          </Grid>
        ))}
      </Grid>
    </Stacked>
  ),
};

/** Grids nest; the inner container restarts the column count. */
export const Nested: Story = {
  render: () => (
    <Stacked title="Nested">
      <Grid container spacing={2}>
        <Grid size={6}>
          <Cell>outer 6</Cell>
        </Grid>
        <Grid container size={6} spacing={1}>
          <Grid size={6}>
            <Cell>inner 6</Cell>
          </Grid>
          <Grid size={6}>
            <Cell>inner 6</Cell>
          </Grid>
        </Grid>
      </Grid>
    </Stacked>
  ),
};
