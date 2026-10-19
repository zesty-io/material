import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { theme as legacyLight, darkTheme as legacyDark } from "../theme";
import { m3Theme, m3DarkTheme } from ".";
import { m3DarkScheme, m3LightScheme, m3Palettes, M3_SEED } from "./tokens";
import { m3Shape } from "./shape";
import { m3TypeScale } from "./typography";

/**
 * Material 3, generated from the Zesty brand seed. These pages always render
 * under the M3 theme regardless of the **Theme** toolbar control — otherwise a
 * page about M3 roles would be blank under Legacy. The **Mode** control still
 * applies.
 */
const meta: Meta = {
  title: "M3",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const getMode = (context: { globals: Record<string, unknown> }) =>
  context.globals.mode === "dark" ? "dark" : "light";

const M3Frame = ({
  mode,
  children,
}: {
  mode: "light" | "dark";
  children: ReactNode;
}) => (
  <ThemeProvider theme={mode === "dark" ? m3DarkTheme : m3Theme}>
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        minHeight: "100%",
      }}
    >
      {children}
    </Box>
  </ThemeProvider>
);

const RoleSwatch = ({
  role,
  value,
  on,
}: {
  role: string;
  value: string;
  on?: string;
}) => (
  <Box
    sx={{
      bgcolor: value,
      color: on ?? "inherit",
      p: 1.5,
      minWidth: 168,
      minHeight: 72,
      borderRadius: 1,
      border: 1,
      borderColor: "divider",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="labelMedium">{role}</Typography>
    <Typography variant="labelSmall" sx={{ opacity: 0.75 }}>
      {value}
    </Typography>
  </Box>
);

const ROLE_GROUPS: Array<{ title: string; pairs: Array<[string, string?]> }> = [
  {
    title: "Primary",
    pairs: [
      ["primary", "onPrimary"],
      ["onPrimary", "primary"],
      ["primaryContainer", "onPrimaryContainer"],
      ["onPrimaryContainer", "primaryContainer"],
    ],
  },
  {
    title: "Secondary",
    pairs: [
      ["secondary", "onSecondary"],
      ["onSecondary", "secondary"],
      ["secondaryContainer", "onSecondaryContainer"],
      ["onSecondaryContainer", "secondaryContainer"],
    ],
  },
  {
    title: "Tertiary",
    pairs: [
      ["tertiary", "onTertiary"],
      ["onTertiary", "tertiary"],
      ["tertiaryContainer", "onTertiaryContainer"],
      ["onTertiaryContainer", "tertiaryContainer"],
    ],
  },
  {
    title: "Error",
    pairs: [
      ["error", "onError"],
      ["onError", "error"],
      ["errorContainer", "onErrorContainer"],
      ["onErrorContainer", "errorContainer"],
    ],
  },
  {
    title: "Surfaces",
    pairs: [
      ["surfaceDim", "onSurface"],
      ["surface", "onSurface"],
      ["surfaceBright", "onSurface"],
      ["surfaceContainerLowest", "onSurface"],
      ["surfaceContainerLow", "onSurface"],
      ["surfaceContainer", "onSurface"],
      ["surfaceContainerHigh", "onSurface"],
      ["surfaceContainerHighest", "onSurface"],
      ["surfaceVariant", "onSurfaceVariant"],
      ["onSurfaceVariant", "surfaceVariant"],
    ],
  },
  {
    title: "Semantic (custom colours, harmonised to the seed)",
    pairs: [
      ["success", "onSuccess"],
      ["successContainer", "onSuccessContainer"],
      ["warning", "onWarning"],
      ["warningContainer", "onWarningContainer"],
      ["info", "onInfo"],
      ["infoContainer", "onInfoContainer"],
    ],
  },
  {
    title: "Outline & inverse",
    pairs: [
      ["outline"],
      ["outlineVariant"],
      ["inverseSurface", "inverseOnSurface"],
      ["inverseOnSurface", "inverseSurface"],
      ["inversePrimary"],
      ["scrim"],
    ],
  },
];

/** The full M3 colour-role set, in the scheme for the current mode. */
export const ColorRoles: Story = {
  render: (_args, context) => {
    const mode = getMode(context);
    const scheme = (mode === "dark" ? m3DarkScheme : m3LightScheme) as Record<
      string,
      string
    >;

    return (
      <M3Frame mode={mode}>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="headlineSmall">Colour roles</Typography>
          <Typography variant="bodyMedium" color="text.secondary">
            Generated from seed {M3_SEED} with Google&rsquo;s
            material-color-utilities. Regenerate with{" "}
            <code>npm run gen:m3</code> after changing the seed.
          </Typography>
        </Stack>

        <Stack spacing={4}>
          {ROLE_GROUPS.map((group) => (
            <Stack key={group.title} spacing={1.5}>
              <Typography variant="titleMedium">{group.title}</Typography>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ flexWrap: "wrap", rowGap: 1.5 }}
              >
                {group.pairs.map(([role, on]) => (
                  <RoleSwatch
                    key={role}
                    role={role}
                    value={scheme[role]}
                    on={on ? scheme[on] : undefined}
                  />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </M3Frame>
    );
  },
};

/** The six tonal palettes every role above is sampled from. */
export const TonalPalettes: Story = {
  render: (_args, context) => {
    const mode = getMode(context);

    return (
      <M3Frame mode={mode}>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="headlineSmall">Tonal palettes</Typography>
          <Typography variant="bodyMedium" color="text.secondary">
            Tone 0 is black, 100 is white. Light schemes read roles from the
            high tones, dark schemes from the low ones.
          </Typography>
        </Stack>

        <Stack spacing={3}>
          {Object.entries(m3Palettes).map(([name, tones]) => (
            <Stack key={name} spacing={1}>
              <Typography variant="titleSmall">{name}</Typography>
              <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                {Object.entries(tones as Record<string, string>).map(
                  ([toneKey, hex]) => (
                    <Box
                      key={toneKey}
                      sx={{
                        bgcolor: hex,
                        width: 56,
                        height: 56,
                        display: "grid",
                        placeItems: "center",
                        color: Number(toneKey) > 55 ? "#000" : "#fff",
                      }}
                    >
                      <Typography variant="labelSmall">{toneKey}</Typography>
                    </Box>
                  ),
                )}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </M3Frame>
    );
  },
};

/** The M3 type scale — five roles at three sizes each. */
export const TypeScale: Story = {
  render: (_args, context) => {
    const mode = getMode(context);

    return (
      <M3Frame mode={mode}>
        <Typography variant="headlineSmall" sx={{ mb: 3 }}>
          Type scale
        </Typography>
        <Stack spacing={3} divider={<Divider flexItem />}>
          {(Object.keys(m3TypeScale) as Array<keyof typeof m3TypeScale>).map(
            (key) => {
              const style = m3TypeScale[key];
              return (
                <Stack key={key} spacing={0.5}>
                  <Typography variant="labelSmall" color="text.secondary">
                    {key} — {style.fontSize} / {style.lineHeight} /{" "}
                    {style.fontWeight}
                  </Typography>
                  <Typography variant={key}>The quick brown fox</Typography>
                </Stack>
              );
            },
          )}
        </Stack>
      </M3Frame>
    );
  },
};

/** The corner-radius scale, and which components use each step. */
export const ShapeScale: Story = {
  render: (_args, context) => {
    const mode = getMode(context);
    const USED_BY: Record<string, string> = {
      none: "Full-bleed surfaces",
      extraSmall: "Text fields, menus, tooltips",
      small: "Chips",
      medium: "Cards, alerts, accordions",
      large: "FAB",
      extraLarge: "Dialogs",
      full: "Buttons, icon buttons, list items",
    };

    return (
      <M3Frame mode={mode}>
        <Typography variant="headlineSmall" sx={{ mb: 3 }}>
          Shape scale
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", rowGap: 2 }}>
          {Object.entries(m3Shape).map(([name, radius]) => (
            <Stack
              key={name}
              spacing={1}
              alignItems="center"
              sx={{ width: 148 }}
            >
              <Box
                sx={{
                  width: 96,
                  height: 96,
                  bgcolor: "primary.main",
                  borderRadius: `${Math.min(radius, 48)}px`,
                }}
              />
              <Typography variant="labelLarge">{name}</Typography>
              <Typography variant="labelSmall" color="text.secondary">
                {radius === m3Shape.full ? "pill" : `${radius}px`}
              </Typography>
              <Typography
                variant="labelSmall"
                color="text.secondary"
                align="center"
              >
                {USED_BY[name]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </M3Frame>
    );
  },
};

/** All five M3 button styles, including the two added to MUI's set. */
export const Buttons: Story = {
  render: (_args, context) => {
    const mode = getMode(context);

    return (
      <M3Frame mode={mode}>
        <Typography variant="headlineSmall" sx={{ mb: 1 }}>
          Buttons
        </Typography>
        <Typography variant="bodyMedium" color="text.secondary" sx={{ mb: 3 }}>
          `tonal` and `elevated` are registered on ButtonPropsVariantOverrides,
          so they are typed like any built-in variant.
        </Typography>

        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexWrap: "wrap", rowGap: 2 }}
          >
            <Button variant="contained">Filled</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexWrap: "wrap", rowGap: 2 }}
          >
            <Button variant="contained" disabled>
              Filled
            </Button>
            <Button variant="tonal" disabled>
              Tonal
            </Button>
            <Button variant="elevated" disabled>
              Elevated
            </Button>
            <Button variant="outlined" disabled>
              Outlined
            </Button>
            <Button variant="text" disabled>
              Text
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ flexWrap: "wrap", rowGap: 2 }}
          >
            <Button variant="contained" size="small">
              Small
            </Button>
            <Button variant="contained">Medium</Button>
            <Button variant="contained" size="large">
              Large
            </Button>
          </Stack>
        </Stack>
      </M3Frame>
    );
  },
};

const Sampler = () => (
  <Stack spacing={2.5}>
    <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", rowGap: 1.5 }}>
      <Button variant="contained">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
      <Chip label="Chip" />
      <Chip label="Filled" variant="filled" />
      <Tooltip title="Tooltip" open placement="top">
        <Chip label="tooltip" />
      </Tooltip>
    </Stack>
    <TextField
      label="Text field"
      placeholder="Placeholder"
      helperText="Helper text"
    />
    <Stack direction="row" spacing={2} alignItems="center">
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Checkbox"
      />
      <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
    </Stack>
    <Alert severity="info">An informational alert.</Alert>
    <Card>
      <CardHeader title="Card title" subheader="Subheader" />
      <CardContent>
        <Typography variant="body2">Card body copy sits here.</Typography>
      </CardContent>
    </Card>
  </Stack>
);

/**
 * The same components under both families, side by side. This is the view to
 * use when deciding whether a component is ready to port.
 */
export const VersusLegacy: Story = {
  name: "M3 vs Legacy",
  render: (_args, context) => {
    const mode = getMode(context);
    const legacy = mode === "dark" ? legacyDark : legacyLight;
    const m3 = mode === "dark" ? m3DarkTheme : m3Theme;

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: "100%",
        }}
      >
        {(
          [
            ["Legacy", legacy],
            ["M3", m3],
          ] as const
        ).map(([label, activeTheme]) => (
          <ThemeProvider key={label} theme={activeTheme}>
            <Box
              sx={{
                bgcolor: "background.default",
                color: "text.primary",
                p: 3,
              }}
            >
              <Paper
                variant="outlined"
                sx={{ p: 1, mb: 3, display: "inline-block" }}
              >
                <Typography variant="overline">{label}</Typography>
              </Paper>
              <Sampler />
            </Box>
          </ThemeProvider>
        ))}
      </Box>
    );
  },
};
