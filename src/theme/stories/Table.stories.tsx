import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Table is unthemed by both families. For tabular *data* the codebase reaches
 * for DataGrid Pro (see MUI/MUI X/DataGrid) — Table is for static or lightly
 * interactive content where the grid would be overkill.
 */
const meta: Meta<typeof Table> = {
  title: "MUI/Data Display/Table",
  component: Table,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Table>;

type Row = { name: string; model: string; status: string; version: number };

const rows: Row[] = [
  { name: "Homepage", model: "page", status: "Published", version: 12 },
  { name: "About us", model: "page", status: "Draft", version: 3 },
  { name: "Pricing", model: "page", status: "Published", version: 8 },
  { name: "Blog index", model: "listing", status: "Published", version: 21 },
  { name: "Contact", model: "page", status: "Draft", version: 1 },
  { name: "Careers", model: "page", status: "Published", version: 5 },
];

const StatusChip = ({ status }: { status: string }) => (
  <Chip
    size="small"
    label={status}
    color={status === "Published" ? "success" : "warning"}
  />
);

export const Default: Story = {
  render: () => (
    <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>
                <StatusChip status={row.status} />
              </TableCell>
              <TableCell align="right">{row.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

/** `size="small"` is the dense variant — worth checking against M3's larger type. */
export const Dense: Story = {
  render: () => (
    <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 720 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell align="right">Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell align="right">{row.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

const SortableTable = () => {
  const [orderBy, setOrderBy] = useState<keyof Row>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const sorted = [...rows].sort((a, b) => {
    const dir = order === "asc" ? 1 : -1;
    return a[orderBy] > b[orderBy] ? dir : a[orderBy] < b[orderBy] ? -dir : 0;
  });

  const sortBy = (key: keyof Row) => {
    if (orderBy === key) setOrder(order === "asc" ? "desc" : "asc");
    else {
      setOrderBy(key);
      setOrder("asc");
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            {(["name", "model", "version"] as const).map((key) => (
              <TableCell key={key} sortDirection={orderBy === key ? order : false}>
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : "asc"}
                  onClick={() => sortBy(key)}
                >
                  {key}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Sortable: Story = {
  render: () => (
    <Stacked title="TableSortLabel" description="Click a header to toggle direction.">
      <SortableTable />
    </Stacked>
  ),
};

const PaginatedTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell align="right">Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell align="right">{row.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={rows.length}
              page={page}
              onPageChange={(_e, next) => setPage(next)}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[3, 6]}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(0);
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export const Paginated: Story = {
  render: () => (
    <Stacked title="TablePagination" description="Rendered inside a TableFooter.">
      <PaginatedTable />
    </Stacked>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <Stacked title="stickyHeader" description="Scroll the container to pin the head row.">
      <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 720, maxHeight: 240 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 24 }, (_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography variant="body2">Row {i + 1}</Typography>
                </TableCell>
                <TableCell align="right">{i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stacked>
  ),
};
