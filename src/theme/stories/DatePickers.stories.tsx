import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Paper, Stack, Typography } from "@mui/material";
import {
  DateCalendar,
  DatePicker,
  DateRangePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { Stacked } from "./StorySection";

/**
 * `MuiPickersDay` is the themed slot — selected, today and disabled day states
 * all come from it. The Pro pickers show a licence watermark in development.
 */
const meta: Meta<typeof DatePicker> = {
  title: "MUI/MUI X/Date Pickers",
  component: DatePicker,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const Demo = () => {
  const [value, setValue] = useState<Date | null>(new Date(2026, 7, 26));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", rowGap: 4 }}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            DateCalendar — shows MuiPickersDay directly
          </Typography>
          <Paper variant="outlined">
            <DateCalendar value={value} onChange={setValue} />
          </Paper>
        </Stack>

        <Stack spacing={2} sx={{ minWidth: 260 }}>
          <Typography variant="body2" color="text.secondary">
            In a popover
          </Typography>
          <DatePicker label="Date" value={value} onChange={setValue} />
          <DateRangePicker localeText={{ start: "From", end: "To" }} />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export const Default: Story = {
  render: () => (
    <Stacked title="PickersDay" description="Open the popover to compare against the inline calendar.">
      <Demo />
    </Stacked>
  ),
};
