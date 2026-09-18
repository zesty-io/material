import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Section, Stacked } from "./StorySection";

/**
 * M3 restyles the track and thumb — `surfaceVariant` track, `outline` thumb,
 * and `primary` when checked. Flip the Theme control to compare against the
 * legacy switch.
 */
const meta: Meta<typeof Switch> = {
  title: "MUI/Inputs/Switch",
  component: Switch,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { defaultChecked: true } };

export const States: Story = {
  render: () => (
    <Section title="States">
      <FormControlLabel control={<Switch defaultChecked />} label="Checked" />
      <FormControlLabel control={<Switch />} label="Unchecked" />
      <FormControlLabel control={<Switch disabled defaultChecked />} label="Disabled checked" />
      <FormControlLabel control={<Switch disabled />} label="Disabled" />
    </Section>
  ),
};

export const SizesAndColors: Story = {
  render: () => (
    <>
      <Section title="Sizes">
        {(["small", "medium"] as const).map((size) => (
          <Stack key={size} spacing={1} alignItems="center">
            <Switch size={size} defaultChecked />
            <Typography variant="caption">{size}</Typography>
          </Stack>
        ))}
      </Section>

      <Section title="Colors">
        {(["primary", "secondary", "success", "error", "warning", "info", "default"] as const).map(
          (color) => (
            <Stack key={color} spacing={1} alignItems="center" sx={{ minWidth: 76 }}>
              <Switch color={color} defaultChecked />
              <Typography variant="caption">{color}</Typography>
            </Stack>
          )
        )}
      </Section>
    </>
  ),
};

export const LabelPlacement: Story = {
  render: () => (
    <Section title="labelPlacement">
      {(["end", "start", "top", "bottom"] as const).map((labelPlacement) => (
        <FormControlLabel
          key={labelPlacement}
          control={<Switch defaultChecked />}
          label={labelPlacement}
          labelPlacement={labelPlacement}
        />
      ))}
    </Section>
  ),
};

const SettingsGroup = () => {
  const [state, setState] = useState({ notifications: true, digest: false, beta: false });
  const toggle = (key: keyof typeof state) => () =>
    setState((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Notifications</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.notifications} onChange={toggle("notifications")} />}
          label="Email notifications"
        />
        <FormControlLabel
          control={<Switch checked={state.digest} onChange={toggle("digest")} />}
          label="Weekly digest"
        />
        <FormControlLabel
          control={<Switch checked={state.beta} onChange={toggle("beta")} />}
          label="Beta features"
        />
      </FormGroup>
      <FormHelperText>Changes save immediately</FormHelperText>
    </FormControl>
  );
};

/** The common shapes: a settings group, and switches as list secondary actions. */
export const InContext: Story = {
  render: () => (
    <Stack direction="row" spacing={5} sx={{ flexWrap: "wrap", rowGap: 4 }}>
      <Stacked title="FormGroup">
        <SettingsGroup />
      </Stacked>

      <Stacked title="As a list secondaryAction">
        <Paper variant="outlined" sx={{ width: 320 }}>
          <List>
            <ListItem secondaryAction={<Switch edge="end" defaultChecked />}>
              <ListItemText primary="Wi-Fi" secondary="Connected" />
            </ListItem>
            <ListItem secondaryAction={<Switch edge="end" />}>
              <ListItemText primary="Bluetooth" />
            </ListItem>
            <ListItem secondaryAction={<Switch edge="end" disabled />}>
              <ListItemText primary="Airplane mode" secondary="Unavailable" />
            </ListItem>
          </List>
        </Paper>
      </Stacked>
    </Stack>
  ),
};
