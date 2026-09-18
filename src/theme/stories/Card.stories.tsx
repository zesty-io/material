import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

/**
 * Covers `MuiCardHeader` and `MuiCardContent`, which the theme pads
 * independently — hence the three arrangements below.
 */
const meta: Meta<typeof Card> = {
  title: "MUI/Surfaces/Card",
  component: Card,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", rowGap: 3 }}>
      <Card sx={{ width: 320 }}>
        <CardHeader
          avatar={<Avatar>Z</Avatar>}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title="CardHeader title"
          subheader="With avatar, action and subheader"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            CardContent carries the body. Header and content are padded separately, so this
            story shows them together.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Action</Button>
          <Button size="small">Another</Button>
        </CardActions>
      </Card>

      <Card sx={{ width: 320 }} variant="outlined">
        <CardHeader title="Outlined variant" subheader="No avatar or action" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            The same card as an outlined surface.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: 320 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Content only
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No CardHeader, to check CardContent's padding on its own.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};
