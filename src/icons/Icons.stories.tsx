import { useMemo, useState, type ComponentType } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  type SvgIconProps,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import * as Icons from "./index";

/**
 * Every icon exported from `@zesty-io/material`. They are plain MUI `SvgIcon`
 * wrappers, so `fontSize` and `color` work exactly as they do on MUI icons.
 * Click a tile to copy its import name.
 */
const meta = {
  title: "Icons",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const iconEntries = Object.entries(Icons) as Array<
  [string, ComponentType<SvgIconProps>]
>;

const IconGrid = () => {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return iconEntries;
    return iconEntries.filter(([name]) => name.toLowerCase().includes(q));
  }, [query]);

  const copy = (name: string) => {
    void navigator.clipboard?.writeText(name);
    setCopied(name);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <Stack spacing={2}>
      <TextField
        size="small"
        placeholder={`Search ${iconEntries.length} icons...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ maxWidth: 320 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))",
          gap: 1.5,
        }}
      >
        {visible.map(([name, Icon]) => (
          <Tooltip key={name} title={copied === name ? "Copied!" : "Click to copy"}>
            <Paper
              variant="outlined"
              onClick={() => copy(name)}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                transition: "border-color 120ms ease, transform 120ms ease",
                "&:hover": { borderColor: "primary.main", transform: "translateY(-2px)" },
              }}
            >
              <Icon sx={{ fontSize: 36 }} />
              <Typography
                variant="caption"
                sx={{ textAlign: "center", wordBreak: "break-word" }}
              >
                {name}
              </Typography>
            </Paper>
          </Tooltip>
        ))}
      </Box>

      {visible.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No icons match &ldquo;{query}&rdquo;.
        </Typography>
      )}
    </Stack>
  );
};

export const AllIcons: Story = {
  render: () => <IconGrid />,
};

/** The same icon at each MUI `fontSize`, to check optical alignment. */
export const Sizes: Story = {
  render: () => {
    const [name, Icon] = iconEntries[0];
    return (
      <Stack direction="row" spacing={4} alignItems="flex-end">
        {(["small", "medium", "large"] as const).map((fontSize) => (
          <Stack key={fontSize} spacing={1} alignItems="center">
            <Icon fontSize={fontSize} />
            <Typography variant="caption">{fontSize}</Typography>
          </Stack>
        ))}
        <Typography variant="caption" color="text.secondary">
          ({name})
        </Typography>
      </Stack>
    );
  },
};
