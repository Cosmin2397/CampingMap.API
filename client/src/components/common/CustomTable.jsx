import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material"
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs'
import { Link as ReactRouterLink } from 'react-router-dom';

import '../../style/Common.scss';

export const CustomTable = ({ 
  columns, 
  data, 
  onDelete, 
  setFormData, 
  selectedRow, 
  setSelectedRow,

}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)


  const handleEdit = (row) => {
    setSelectedRow(row);
    setFormData(row);
  };

  const handleDelete = (row) => {
    onDelete(row);
    setOpenDeleteModal(false)
  };


  const handleSelectDelete = (row) => {
    setSelectedRow(row);
    setOpenDeleteModal(true)
  }

  return (
    <>
     <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ paddingBottom: '10px' }}>
        <Button 
          color="primary" 
          variant="contained" 
          component={ReactRouterLink}
          to="/dashboard/add-camping"
        >
          <AddIcon />Add Camping
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns?.slice(0, 5)?.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id}>
                {columns?.slice(0, 5)?.map((column) => (
                  column?.field !== 'openingHours' ? 
                  <TableCell key={column.field}>{row[column.field]}</TableCell>
                  :
                  <TableCell key={column.field}>
                    {`${dayjs(row[column.field]?.split('-')[0]).locale('en').format('h:mm A')} - ${dayjs(row[column.field]?.split('-')[1]).locale('en').format('h:mm A')}`}
                    </TableCell>
                ))}
                <TableCell>
                <Link onClick={() => handleEdit(row)} href={`/dashboard/edit-camping/${selectedRow?.id}`} variant="body2">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  </Link>
                  <IconButton onClick={() => handleSelectDelete(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete item modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="default-modal">
          <Typography id="modal-modal-title" variant="h6" component="h5">
            Are you sure you want to delete camping <b>{selectedRow?.name}</b>?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ paddingTop: '20px' }}>
            <Button color="primary" onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
            <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
