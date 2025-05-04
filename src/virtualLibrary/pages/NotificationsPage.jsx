import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Box, Tabs, Tab, Alert } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification, getNotifications } from '../../store/thunks/notificationThunks';

const columns = [
  { field: 'senderName', headerName: 'Emisor', width: 100 },
  { field: 'title', headerName: 'Título', width: 300 },
  { field: 'message', headerName: 'Mensaje', width: 600 },
];

const paginationModel = { page: 0, pageSize: 5 };

export const NotificationsPage = () => {

  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);
  const { userData } = useSelector(state => state.user);
  const selectedRowsRef = useRef([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(getNotifications(userData.id));
  }, [])


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const roomNotifications = notifications.filter(n => n.notificationType === 'Room');
  const friendNotifications = notifications.filter(n => n.notificationType === 'Friend');
  const displayedNotifications = tabValue === 0 ? roomNotifications : friendNotifications;
  const currentType = tabValue === 0 ? "Room" : "Friend";

  const onDelete = () => {
    selectedRowsRef.current.forEach(rowId => dispatch(deleteNotification(rowId, false, currentType)));
  };

  const onAccept = () => {
    selectedRowsRef.current.forEach(rowId => dispatch(deleteNotification(rowId, true, currentType)));
  };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      {error && <Alert sx={{ marginTop: 1 }} severity="error">{error}</Alert>}

      <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs">
        <Tab label="Salas" />
        <Tab label="Amigos" />
      </Tabs>

      <Box marginTop={1}>
        <Button color="success" startIcon={<CheckIcon />} sx={{ mb: 2 }} onClick={onAccept} />
        <Button
          color="error"
          onClick={onDelete}
          disabled={selectedRowsRef.length === 0}
          sx={{ mb: 2 }}
          startIcon={<DeleteIcon />}
        />
      </Box>
      <DataGrid
        rows={displayedNotifications}
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



