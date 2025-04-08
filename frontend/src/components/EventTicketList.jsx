import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

const EventTicketList = ({ initialRows = [] }) => {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3, },
    {
      field: 'eventName',
      headerName: 'Event name',
      flex: 1,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 0.3,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      flex: 0.3,
      editable: true,
    },
    {
      field: 'status', 
      headerName: 'Status', 
      flex: 0.3,
      editable: false,
      renderCell: (params) => {
        const status = params.value;
        let backgroundColor = '';
        let color = '';
        
        if (status === 'Upcoming') {
          backgroundColor = '#e6f7e6';  // light green background
          color = '#2e8b57';           // green text
        } else if (status === 'Closed') {
          backgroundColor = '#ffe6e6';  // light red background
          color = '#cc0000';           // red text
        } else if (status === 'Happening') {
          backgroundColor = '#f2e6ff';  // light purple background
          color = '#6a0dad';           // purple text
        }
        
        return (
          <div style={{ 
            backgroundColor, 
            textAlign: 'center', 
            color, 
            fontWeight: 'bold',
            padding: '4px 8px',
            width: '90%',
          }}>
            {status}
          </div>
        );
      }, 
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4]}
        rowHeight={70}
      />
    </Box>
  );
};

export default EventTicketList;