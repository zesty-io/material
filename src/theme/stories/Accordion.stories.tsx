import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/** M3 rounds the panel to 12px and suppresses MUI's default seam rule. */
const meta: Meta<typeof Accordion> = {
  title: "MUI/Surfaces/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Stacked title="Accordion" description="Consecutive panels share a seam — check it under both themes.">
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Expanded by default</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              AccordionDetails holds the panel body.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Collapsed, with actions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              A second panel, to show the seam between them.
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button size="small">Cancel</Button>
            <Button size="small" variant="contained">
              Save
            </Button>
          </AccordionActions>
        </Accordion>

        <Accordion disabled>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Disabled</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </Stacked>
  ),
};
