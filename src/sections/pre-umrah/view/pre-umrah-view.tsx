import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableHead } from '../user-table-head';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import { UMRAH_CHECKLIST_DATA } from 'src/utils/constant';
import { useTable } from 'src/sections/dua-collection/view';

export function PreUmrahView() {
  const table = useTable();
  const [checklist, setChecklist] = useState(UMRAH_CHECKLIST_DATA);
  const [filterName, setFilterName] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuRowId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuRowId(null);
  };

  const dataFiltered = applyFilter({
    inputData: checklist,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const handleAddChecklistItem = (newItem: any) => {
    const newItemWithId = {
      id: Math.random().toString(36).substring(2, 9),
      ...newItem,
    };
    setChecklist((prev) => [newItemWithId, ...prev]);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleDeleteSubItem = (categoryId: string, itemId: string) => {
    setChecklist((prev) =>
      prev.map((category) => {
        if (category.id.toString() === categoryId) {
          return {
            ...category,
            items: category.items.filter((item) => item.id !== itemId)
          };
        }
        return category;
      })
    );
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        {showAddItem && (
          <Button color="inherit" sx={{ mr: 1 }} onClick={() => setShowAddItem(false)}>
            <KeyboardBackspaceIcon />
          </Button>
        )}
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Umrah Checklist
        </Typography>
        {!showAddItem && (
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => setShowAddItem(true)}
          >
            Add Checklist Item
          </Button>
        )}
      </Box>

      {showAddItem ? (
        <div>Add Checklist Form here</div>
      ) : (
        <Card>
          <UserTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800, tableLayout: 'fixed' }}>
                <UserTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={checklist.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      checklist.map((item: any) => item.id)
                    )
                  }
                  headLabel={[
                    { id: 'checkbox', label: '' },
                    { id: 'Id', label: 'ID' },
                    { id: 'label', label: 'Label' },
                    { id: 'action', label: 'Action', align: 'right' },
                  ]}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any) => (
                      <React.Fragment key={row.id}>
                        <TableRow
                          hover
                          selected={table.selected.includes(row.id)}
                          onClick={() => table.onSelectRow(row.id)}
                        >
                          <TableCell padding="checkbox" sx={{ width: '20%' }}>
                            <Checkbox
                              checked={table.selected.includes(row.id)}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => table.onSelectRow(row.id)}
                            />
                          </TableCell>
                          <TableCell padding="checkbox" sx={{ width: '5%' }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleExpand(row.id.toString());
                              }}
                            >
                              {expandedRow === row.id.toString() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ width: '30%' }}>{row.id}</TableCell>
                          <TableCell sx={{ width: '30%' }}>{row.label}</TableCell>
                          <TableCell align="right" sx={{ width: '30%' }}>
                            <IconButton onClick={(e) => {
                              e.stopPropagation();
                              handleMenuOpen(e, row.id.toString());
                            }}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>

                        {/* Expanded Content */}
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                            <Collapse in={expandedRow === row.id.toString()} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>#</TableCell>
                                      <TableCell>Item</TableCell>
                                      <TableCell>Description</TableCell>
                                      <TableCell>Status</TableCell>
                                      <TableCell>Action</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {row.items && row.items.map((item: any, index: number) => (
                                      <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.text}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>
                                          <Checkbox
                                            checked={item.selected}
                                            onChange={(e) => {
                                              const newChecklist = checklist.map((cat) => {
                                                if (cat.id === row.id) {
                                                  return {
                                                    ...cat,
                                                    items: cat.items.map((subItem) =>
                                                      subItem.id === item.id
                                                        ? { ...subItem, selected: e.target.checked }
                                                        : subItem
                                                    )
                                                  };
                                                }
                                                return cat;
                                              });
                                              setChecklist(newChecklist);
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Button
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeleteSubItem(row.id.toString(), item.id)}
                                          >
                                            Delete
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                    {(!row.items || row.items.length === 0) && (
                                      <TableRow>
                                        <TableCell colSpan={5} align="center">
                                          No items in this checklist
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, checklist.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={checklist.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      )}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>
    </DashboardContent>
  );
}
