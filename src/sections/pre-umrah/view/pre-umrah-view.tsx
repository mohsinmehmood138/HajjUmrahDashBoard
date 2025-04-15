import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableHead } from '../user-table-head';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { UMRAH_CHECKLIST_DATA } from 'src/utils/constant'; // Import checklist
import type { UserProps } from '../../pre-umrah/user-table-row'; // Or create a new type

// Example row component, update as needed
import { UserTableRow } from '../../pre-umrah/user-table-row';
import { useTable } from 'src/sections/dua-collection/view';

export function PreUmrahView() {
  const table = useTable();
  const [checklist, setChecklist] = useState(UMRAH_CHECKLIST_DATA);
  const [filterName, setFilterName] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);

  const dataFiltered: UserProps[] = applyFilter({
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
              <Table sx={{ minWidth: 800 }}>
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
                    { id: 'Id', label: 'ID' },
                    { id: 'label', label: 'Label' },
                    { id: 'expand', label: 'Expand' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
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
    </DashboardContent>
  );
}
