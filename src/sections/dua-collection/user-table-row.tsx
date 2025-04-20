import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import { Iconify } from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import DeleteModal from 'src/components/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { deleteDocument } from 'src/services/firestoreService';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

// ----------------------------------------------------------------------

export type UserProps = {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  description: string;
  additionalInfo: string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: any;
  onSelectRow: () => void;
  onPressEdit: (row: UserProps) => void;
  setFetchData: any;
};

export function UserTableRow({
  row,
  selected,
  onSelectRow,
  onPressEdit,
  setFetchData,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, [row]);

  const handleEdit = () => {
    onPressEdit(row);
    setOpenPopover(null);
  };

  const handleDeleteItem = async () => {
    const result = await deleteDocument('dua_collection', row.id.toString());

    if (result.success) {
      setDeleteModal(false);
      toast.success('Dua Delete Successfully !', {
        position: 'top-center',
        theme: 'colored',
      });
      setDeleteModal(false);
      setFetchData(true);
    } else {
      toast.error('Unknown Error!', {
        position: 'top-right',
        theme: 'colored',
      });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {row.title}
          </Box>
        </TableCell>

        <TableCell>{row.arabic}</TableCell>

        <TableCell>{row.translation}</TableCell>

        <TableCell align="center">{row.transliteration}</TableCell>

        <TableCell>{row.description}</TableCell>
        <TableCell>{row.additionalInfo}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <ToastContainer position="bottom-left" />

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={openDeleteModal} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={handleDeleteItem}
      />
    </>
  );
}
