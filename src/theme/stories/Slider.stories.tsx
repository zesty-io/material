import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider, Stack, Typography } from "@mui/material";

/** M3 thickens the rail and grows the thumb's focus halo to a state layer. */
const meta: Meta<typeof Slider> = {
  title: "MUI/Inputs/Slider",
  component: Slider,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <Stack spacing={5} sx={{ maxWidth: 420, pt: 2 }}>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Default
        </Typography>
        <Slider defaultValue={40} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Range, with marks and always-visible label
        </Typography>
        <Slider
          defaultValue={[20, 70]}
          valueLabelDisplay="on"
          marks={[
            { value: 0, label: "0" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Small / disabled
        </Typography>
        <Slider size="small" defaultValue={30} />
        <Slider defaultValue={30} disabled />
      </Stack>
    </Stack>
  ),
};

export const Stepped: Story = {
  render: () => (
    <Stack spacing={5} sx={{ maxWidth: 420, pt: 2 }}>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          step=10, marks
        </Typography>
        <Slider defaultValue={30} step={10} marks min={0} max={100} />
      </Stack>
      <Stack spacing={1} sx={{ height: 200 }}>
        <Typography variant="body2" color="text.secondary">
          Vertical
        </Typography>
        <Slider orientation="vertical" defaultValue={40} />
      </Stack>
    </Stack>
  ),
};
