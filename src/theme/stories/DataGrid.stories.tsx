import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Chip } from "@mui/material";
import { DataGridPro, type GridColDef } from "@mui/x-data-grid-pro";
import { Stacked } from "./StorySection";

/**
 * Header, cell, row-hover and footer styling all come from the `MuiDataGrid`
 * overrides in the theme.
 *
 * **Note:** DataGrid Pro renders a "MUI X Missing license key" watermark in
 * development. That is expected and is not a theme bug.
 */
const meta: Meta<typeof DataGridPro> = {
  title: "MUI/MUI X/DataGrid",
  component: DataGridPro,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof DataGridPro>;

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
  { field: "model", headerName: "Model", width: 140 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <Chip
        size="small"
        label={String(params.value)}
        color={params.value === "Published" ? "success" : "warning"}
      />
    ),
  },
  { field: "version", headerName: "Version", type: "number", width: 100 },
  { field: "updated", headerName: "Updated", width: 140 },
];

const rows = [
  { id: 1, name: "Homepage", model: "page", status: "Published", version: 12, updated: "2 hours ago" },
  { id: 2, name: "About us", model: "page", status: "Draft", version: 3, updated: "Yesterday" },
  { id: 3, name: "Pricing", model: "page", status: "Published", version: 8, updated: "3 days ago" },
  { id: 4, name: "Blog index", model: "listing", status: "Published", version: 21, updated: "Last week" },
  { id: 5, name: "Contact", model: "page", status: "Draft", version: 1, updated: "Last week" },
  { id: 6, name: "Careers", model: "page", status: "Published", version: 5, updated: "2 weeks ago" },
];

export const Default: Story = {
  render: () => (
    <Stacked title="DataGridPro" description="Checkbox selection and pagination enabled.">
      <Box sx={{ height: 420, width: "100%", maxWidth: 900 }}>
        <DataGridPro
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          pagination
        />
      </Box>
    </Stacked>
  ),
};

export const Density: Story = {
  render: () => (
    <Stacked title="Compact density" description="Worth checking against M3's larger type scale.">
      <Box sx={{ height: 320, width: "100%", maxWidth: 900 }}>
        <DataGridPro rows={rows} columns={columns} density="compact" hideFooter />
      </Box>
    </Stacked>
  ),
};
