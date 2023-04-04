import React, { useState } from "react";
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
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import { ManageCampingForm } from '../ManageCampingForm'

export const CustomTable = ({ 
  columns, 
  data, 
  onAdd, 
  onEdit, 
  onDelete, 
  formData, 
  setFormData, 
  selectedRow, 
  setSelectedRow 
}) => {
  const [drawerOpen, setDrawerOpen] = useState(null);

  const handleAdd = () => {
    setDrawerOpen('add');
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setFormData(row);
    setDrawerOpen('edit');
  };

  const handleDelete = (row) => {
    onDelete(row);
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

  return (
    <>
     <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ paddingBottom: '10px' }}>
        <Button color="primary" variant="contained" onClick={handleAdd}>
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
                  <IconButton onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
