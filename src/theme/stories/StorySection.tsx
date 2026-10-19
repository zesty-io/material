import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

/**
 * Shared layout for the themed-MUI reference pages. Not exported from the
 * package — `src/theme/stories/` is excluded from the `es/` build.
 */
export const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) => (
  <Stack spacing={1.5} sx={{ mb: 5 }}>
    <Box>
      <Typography variant="h6">{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ flexWrap: "wrap", rowGap: 2 }}
    >
      {children}
    </Stack>
  </Stack>
);

/** Vertical variant, for things that shouldn't sit on one row. */
export const Stacked = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) => (
  <Stack spacing={1.5} sx={{ mb: 5 }}>
    <Box>
      <Typography variant="h6">{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
    <Stack spacing={2} sx={{ maxWidth: 560 }}>
      {children}
    </Stack>
  </Stack>
);
