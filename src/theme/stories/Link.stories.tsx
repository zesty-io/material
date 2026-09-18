import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link, Typography } from "@mui/material";
import { Section, Stacked } from "./StorySection";

/** M3 colours links with `primary` and inherits the underline colour. */
const meta: Meta<typeof Link> = {
  title: "MUI/Navigation/Link",
  component: Link,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = { args: { href: "#", children: "A link" } };

export const Underline: Story = {
  render: () => (
    <Section title="underline">
      {(["always", "hover", "none"] as const).map((underline) => (
        <Link key={underline} href="#" underline={underline}>
          underline=&ldquo;{underline}&rdquo;
        </Link>
      ))}
    </Section>
  ),
};

export const Colors: Story = {
  render: () => (
    <Section title="Colors">
      <Link href="#">Default</Link>
      <Link href="#" color="secondary">
        Secondary
      </Link>
      <Link href="#" color="error">
        Error
      </Link>
      <Link href="#" color="inherit">
        Inherit
      </Link>
    </Section>
  ),
};

export const Inline: Story = {
  render: () => (
    <Stacked title="Inline in body copy">
      <Typography variant="body1">
        Links inherit the surrounding type scale, so a <Link href="#">link in body1</Link> sits
        on the same baseline as its paragraph.
      </Typography>
      <Typography variant="body2">
        The same <Link href="#">link in body2</Link>, one step down.
      </Typography>
    </Stacked>
  ),
};
