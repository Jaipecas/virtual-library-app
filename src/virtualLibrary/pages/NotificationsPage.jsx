import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Box } from '@mui/material';
import { useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const columns = [
  { field: 'notificationName', headerName: 'Nombre', width: 300 },
  { field: 'notificationDescription', headerName: 'Descripción', width: 600 },
];

let rows = [
  { id: 1, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 1' },
  { id: 2, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 2' },
  { id: 3, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
  { id: 4, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 1' },
  { id: 5, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 2' },
  { id: 6, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
  { id: 7, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 1' },
  { id: 8, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 2' },
  { id: 9, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
  { id: 10, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
  { id: 11, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 1' },
  { id: 12, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 2' },
  { id: 13, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
  { id: 14, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 1' },
  { id: 15, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 2' },
  { id: 16, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
  { id: 17, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 1' },
  { id: 18, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 2' },
  { id: 19, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
  { id: 20, notificationDescription: 'Sala para estudiar XXXXXXXX', notificationName: 'Invitación sala 3' },
];

const paginationModel = { page: 0, pageSize: 5 };

export const NotificationsPage = () => {

  const apiRef = useGridApiRef();
  const selectedRowsRef = useRef([]);
  const rowsRef = useRef(rows);

  const onHandleDelete = () => {
    //TODO elimide BD
    updateGrid();
  };

  const onHandleAccept = () => {
    //TODO update roomUser y delete
    updateGrid();
  };

  const updateGrid = () => {
    rowsRef.current = rowsRef.current.filter(row => !selectedRowsRef.current.includes(row.id));

    apiRef.current.setRows(rowsRef.current);

    selectedRowsRef.current = [];
  }

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Box>
        <Button color="success" startIcon={<CheckIcon />} sx={{ mb: 2 }} onClick={onHandleAccept} />
        <Button
          color="error"
          onClick={onHandleDelete}
          disabled={selectedRowsRef.length === 0}
          sx={{ mb: 2 }}
          startIcon={<DeleteIcon />}
        />
      </Box>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => { selectedRowsRef.current = ids; }}
      />
    </Paper>);
};



