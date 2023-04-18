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
  Drawer,
  Button,
} from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material"
import Stack from '@mui/material/Stack';
import { ManageCampingForm } from '../ManageCampingForm'
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import '../../style/Common.scss';

export const CustomTable = ({ 
  columns, 
  data, 
  onAdd, 
  onEdit, 
  onDelete, 
  formData, 
  setFormData, 
  selectedRow, 
  setSelectedRow,
  openingHours,
  setOpeningHours,
  location,
  setLocation,
  campingFacilities,
  setCampingFacilities
}) => {
  const [drawerOpen, setDrawerOpen] = useState(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)


  const handleEdit = (row) => {
    setSelectedRow(row);
    setFormData(row);
  };

  const handleDelete = (row) => {
    onDelete(row);
    setOpenDeleteModal(false)
  };

  const handleDrawerClose = () => {
    setDrawerOpen(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    onEdit(formData);
    handleDrawerClose();
  };

  const handleSelectDelete = (row) => {
    setSelectedRow(row);
    setOpenDeleteModal(true)
  }

  return (
    <>
     <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ paddingBottom: '10px' }}>
        <Button color="primary" variant="contained" href="/dashboard/add-camping">
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
                  <TableCell key={column.field}>{row[column.field]}</TableCell>
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
      <Drawer 
        anchor="bottom" 
        open={!!drawerOpen} 
        onClose={handleDrawerClose}
      >
        <form>
          {formData && (
            <Stack direction="column" spacing={2} sx={{ padding: '35px' }}>
              <ManageCampingForm 
                columns={columns} 
                drawerOpen={drawerOpen}
                formData={formData}
                openingHours={openingHours}
                setOpeningHours={setOpeningHours}
                location={location}
                setLocation={setLocation}
                campingFacilities={campingFacilities}
                setCampingFacilities={setCampingFacilities}
                handleFormChange={handleFormChange}
              />
              <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ paddingTop: '20px' }}>
                <Button color="primary" variant="outlined" onClick={handleDrawerClose}>Cancel</Button>
                <Button color="primary" variant="contained" onClick={handleFormSubmit}>Save</Button>
              </Stack>
            </Stack>
          )}
        </form>
      </Drawer>
    </>
  );
};
