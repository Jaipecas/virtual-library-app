import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification, getNotifications } from '../../store/thunks/notificationThunks';

const columns = [
  { field: 'title', headerName: 'Título', width: 300 },
  { field: 'message', headerName: 'Mensaje', width: 600 },
];

const paginationModel = { page: 0, pageSize: 5 };

export const NotificationsPage = () => {

  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);
  const { userData } = useSelector(state => state.user);
  const selectedRowsRef = useRef([]);

  useEffect(() => {
    dispatch(getNotifications(userData.id));
  }, [])


  const onHandleDelete = () => {
    //TODO cambiar a una lista de ids en el backend
    selectedRowsRef.current.forEach(rowId => dispatch(deleteNotification(rowId, false, "Room")));
  };

  const onHandleAccept = () => {
    selectedRowsRef.current.forEach(rowId => dispatch(deleteNotification(rowId, true, "Room")));
  };


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
        rows={notifications}
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



