import * as React from "react";
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
  TextField,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import Stack from '@mui/material/Stack';

export const CustomTable = ({ columns, data, onAdd, onEdit, onDelete }) => {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(null);
  const [formData, setFormData] = React.useState(null);

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
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
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
        anchor="right" 
        open={!!drawerOpen} 
        onClose={handleDrawerClose}
        sx={{ minWidth: '350px' }}
      >
        <form onSubmit={handleFormSubmit}>
          {formData && (
            <Stack direction="column" spacing={2} sx={{ padding: '35px' }}>
              {columns.map((column) => (
                <TextField
                  key={column.field}
                  label={column.headerName}
                  name={column.field}
                  value={drawerOpen === 'edit' ? formData[column.field] : null}
                  onChange={handleFormChange}
                />
              ))}
              <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ paddingTop: '20px' }}>
                <Button color="primary" variant="outlined" onClick={handleDrawerClose}>Cancel</Button>
                <Button type="submit" color="primary" variant="contained">Save</Button>
              </Stack>
            </Stack>
          )}
        </form>
      </Drawer>
    </>
  );
};
