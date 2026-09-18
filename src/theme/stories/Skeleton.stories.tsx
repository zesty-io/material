import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Section, Stacked } from "./StorySection";

/**
 * Skeleton is unthemed by both families — it derives its colour from
 * `text.primary` at low alpha, so it follows the palette without an override.
 * That means it should stay legible in dark mode on both themes; worth
 * checking with the Mode control.
 */
const meta: Meta<typeof Skeleton> = {
  title: "MUI/Feedback/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Variants: Story = {
  render: () => (
    <Stacked title="variant" description="`text` takes its height from the current type scale.">
      <Stack spacing={2} sx={{ maxWidth: 420 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            text
          </Typography>
          <Skeleton variant="text" />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            circular
          </Typography>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            rectangular
          </Typography>
          <Skeleton variant="rectangular" height={80} />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            rounded
          </Typography>
          <Skeleton variant="rounded" height={80} />
        </Box>
      </Stack>
    </Stacked>
  ),
};

export const Animations: Story = {
  render: () => (
    <Section title="animation">
      {([["pulse", "pulse"], ["wave", "wave"], ["none", false]] as const).map(
        ([label, animation]) => (
          <Stack key={label} spacing={1} sx={{ width: 200 }}>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
            <Skeleton variant="rounded" height={64} animation={animation} />
          </Stack>
        )
      )}
    </Section>
  ),
};

/**
 * Sizing a `text` skeleton by wrapping it in the Typography variant it stands
 * in for keeps the placeholder the same height as the real content, so nothing
 * jumps when the data arrives.
 */
export const FromTypography: Story = {
  render: () => (
    <Stacked title="Inferred from typography">
      <Stack spacing={1} sx={{ maxWidth: 420 }}>
        {(["h3", "h5", "body1", "body2", "caption"] as const).map((variant) => (
          <Typography key={variant} variant={variant}>
            <Skeleton />
          </Typography>
        ))}
      </Stack>
    </Stacked>
  ),
};

/** The shape most loading states actually need. */
export const CardPlaceholder: Story = {
  render: () => (
    <Stacked title="Composed placeholder" description="Loading and loaded, side by side.">
      <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", rowGap: 3 }}>
        <Card sx={{ width: 320 }}>
          <CardHeader
            avatar={<Skeleton variant="circular" width={40} height={40} />}
            title={<Skeleton variant="text" width="60%" />}
            subheader={<Skeleton variant="text" width="40%" />}
          />
          <Skeleton variant="rectangular" height={140} />
          <CardContent>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </CardContent>
        </Card>

        <Card sx={{ width: 320 }}>
          <CardHeader
            avatar={
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  display: "grid",
                  placeItems: "center",
                  color: "primary.contrastText",
                }}
              >
                Z
              </Box>
            }
            title="Loaded state"
            subheader="For comparison"
          />
          <Box sx={{ height: 140, bgcolor: "action.hover" }} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              The real content the skeleton above stands in for. Compare the heights — a good
              placeholder does not shift the layout when it resolves.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stacked>
  ),
};

/** List loading is the other common case. */
export const ListPlaceholder: Story = {
  render: () => (
    <Stacked title="List placeholder">
      <Stack spacing={2} sx={{ maxWidth: 420 }}>
        {Array.from({ length: 4 }, (_, i) => (
          <Stack key={i} direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={32} height={32} />
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Skeleton variant="text" width={`${70 - i * 8}%`} />
              <Skeleton variant="text" width={`${45 - i * 5}%`} />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stacked>
  ),
};
