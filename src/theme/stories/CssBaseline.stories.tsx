import type { Meta, StoryObj } from "@storybook/react-vite";
import { CssBaseline, Paper, Stack, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * The global element reset. `CssBaseline` is already mounted by the Storybook
 * preview decorator, so what you see below is it doing its job — no MUI
 * components, just bare HTML.
 */
const meta: Meta<typeof CssBaseline> = {
  title: "MUI/Baseline/CssBaseline",
  component: CssBaseline,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof CssBaseline>;

export const BareElements: Story = {
  render: () => (
    <Stacked
      title="Bare HTML elements"
      description="Every style here comes from the MuiCssBaseline overrides and the theme's typography defaults."
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <h1>h1 — heading element</h1>
        <h2>h2 — heading element</h2>
        <h3>h3 — heading element</h3>
        <p>
          A paragraph of body copy, with an <a href="#">anchor element</a>, some{" "}
          <strong>bold text</strong> and some <em>emphasised text</em>.
        </p>
        <ul>
          <li>An unordered list item</li>
          <li>A second item</li>
        </ul>
        <blockquote>A blockquote element.</blockquote>
        <pre>
          <code>const code = "a pre &gt; code block";</code>
        </pre>
        <hr />
        <small>Small text</small>
      </Paper>
    </Stacked>
  ),
};

export const FontStack: Story = {
  render: () => (
    <Stacked title="Font stack">
      <Typography variant="body2" color="text.secondary">
        Both themes set Mulish. `preview-head.html` loads it from Google Fonts — if this renders
        as a system sans-serif, that stylesheet failed.
      </Typography>
      <Typography sx={{ fontSize: 24 }}>
        Mulish — ABCDEFGHIJKLM abcdefghijklm 0123456789
      </Typography>
      <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", rowGap: 1 }}>
        {[300, 400, 500, 600, 700, 800].map((weight) => (
          <Typography key={weight} sx={{ fontWeight: weight }}>
            {weight}
          </Typography>
        ))}
      </Stack>
    </Stacked>
  ),
};
