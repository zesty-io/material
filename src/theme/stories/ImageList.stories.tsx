import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/**
 * Unthemed by both families.
 *
 * The tiles are inline SVG data URIs rather than remote images, so this page
 * renders identically offline and in CI — no network, no broken-image states
 * that look like theme bugs.
 */
const meta: Meta<typeof ImageList> = {
  title: "MUI/Layout/Image List",
  component: ImageList,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ImageList>;

/** A flat-colour SVG tile, encoded inline. */
const tile = (hue: number, w = 400, h = 400) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<rect width="100%" height="100%" fill="hsl(${hue} 55% 62%)"/>` +
      `<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) / 5}" fill="hsl(${hue} 60% 40%)"/>` +
      `</svg>`
  )}`;

const ITEMS = [
  { title: "Homepage hero", author: "bobby" },
  { title: "Product shot", author: "alex" },
  { title: "Team photo", author: "kim" },
  { title: "Diagram", author: "ravi" },
  { title: "Illustration", author: "jo" },
  { title: "Screenshot", author: "sam" },
].map((item, i) => ({ ...item, img: tile(i * 47 + 200), hue: i * 47 + 200 }));

export const Standard: Story = {
  render: () => (
    <Stacked title="Standard" description="Uniform tiles in a fixed column count.">
      <ImageList sx={{ width: 480, maxWidth: "100%", height: 380 }} cols={3} rowHeight={150}>
        {ITEMS.map((item) => (
          <ImageListItem key={item.title}>
            <img src={item.img} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Stacked>
  ),
};

export const WithTitleBar: Story = {
  render: () => (
    <Stacked title="ImageListItemBar" description="Bars can sit at the top or the bottom.">
      <ImageList sx={{ width: 480, maxWidth: "100%" }} cols={2} rowHeight={180}>
        {ITEMS.slice(0, 4).map((item, i) => (
          <ImageListItem key={item.title}>
            <img src={item.img} alt={item.title} loading="lazy" />
            <ImageListItemBar
              title={item.title}
              subtitle={`by ${item.author}`}
              position={i < 2 ? "bottom" : "top"}
              actionIcon={
                <IconButton sx={{ color: "rgba(255,255,255,0.85)" }} aria-label={`about ${item.title}`}>
                  <Info />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Stacked>
  ),
};

/** `cols` and `rows` on an item make it span more of the grid. */
export const Quilted: Story = {
  render: () => (
    <Stacked title="Quilted" description="Items span multiple cells via cols/rows.">
      <ImageList
        sx={{ width: 480, maxWidth: "100%", height: 360 }}
        variant="quilted"
        cols={4}
        rowHeight={120}
      >
        {ITEMS.map((item, i) => {
          const cols = i === 0 ? 2 : i === 3 ? 2 : 1;
          const rows = i === 0 ? 2 : 1;
          return (
            <ImageListItem key={item.title} cols={cols} rows={rows}>
              <img src={tile(item.hue, 250 * cols, 200 * rows)} alt={item.title} loading="lazy" />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Stacked>
  ),
};

/** Masonry keeps each tile's own aspect ratio and packs columns. */
export const Masonry: Story = {
  render: () => (
    <Stacked title="Masonry" description="Variable heights, no cropping.">
      <ImageList sx={{ width: 480, maxWidth: "100%" }} variant="masonry" cols={3} gap={8}>
        {ITEMS.map((item, i) => (
          <ImageListItem key={item.title}>
            <img src={tile(item.hue, 300, 200 + (i % 3) * 90)} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Stacked>
  ),
};

/** Woven alternates tile sizes on a fixed rhythm. */
export const Woven: Story = {
  render: () => (
    <Stacked title="Woven">
      <ImageList sx={{ width: 480, maxWidth: "100%", height: 340 }} variant="woven" cols={3} gap={8}>
        {ITEMS.map((item) => (
          <ImageListItem key={item.title}>
            <img src={item.img} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Stacked>
  ),
};

/** A full-width subheader is an item with `cols` spanning the grid. */
export const WithSubheader: Story = {
  render: () => (
    <Stacked title="Subheader">
      <ImageList sx={{ width: 480, maxWidth: "100%", height: 340 }} cols={3} rowHeight={140}>
        <ImageListItem key="subheader" cols={3} sx={{ height: "auto !important" }}>
          <ListSubheader component="div">Recently uploaded</ListSubheader>
        </ImageListItem>
        {ITEMS.map((item) => (
          <ImageListItem key={item.title}>
            <img src={item.img} alt={item.title} loading="lazy" />
            <ImageListItemBar title={item.title} subtitle={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </Stacked>
  ),
};
