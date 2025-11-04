import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  TextField,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import { RootState } from '@/store/store';
import {
  updateRow,
  deleteRow,
  setSortColumn,
  setCurrentPage,
  setRowsPerPage,
  setEditingRowId,
  TableRow as TableRowType,
} from '@/store/tableSlice';

export const DataTable = () => {
  const dispatch = useDispatch();
  const {
    data,
    columns,
    columnVisibility,
    columnOrder,
    searchQuery,
    sortColumn,
    sortDirection,
    currentPage,
    rowsPerPage,
    editingRowId,
  } = useSelector((state: RootState) => state.table);

  const [editedRow, setEditedRow] = useState<TableRowType | null>(null);

  const visibleColumns = columnOrder
    .map(colId => columns.find(col => col.id === colId))
    .filter(col => col && columnVisibility[col.id]);

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue === bValue) return 0;
    
    const comparison = aValue > bValue ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const paginatedData = sortedData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleSort = (columnId: string) => {
    dispatch(setSortColumn(columnId));
  };

  const handleEdit = (row: TableRowType) => {
    dispatch(setEditingRowId(row.id));
    setEditedRow({ ...row });
  };

  const handleSave = () => {
    if (editedRow) {
      dispatch(updateRow(editedRow));
      dispatch(setEditingRowId(null));
      setEditedRow(null);
    }
  };

  const handleCancel = () => {
    dispatch(setEditingRowId(null));
    setEditedRow(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      dispatch(deleteRow(id));
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    if (editedRow) {
      setEditedRow({
        ...editedRow,
        [field]: field === 'age' ? parseInt(value) || 0 : value,
      });
    }
  };

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: 'hsl(var(--table-header))' }}>
            <TableRow>
              {visibleColumns.map(column => (
                <TableCell
                  key={column!.id}
                  sx={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: column!.sortable ? 'pointer' : 'default',
                      userSelect: 'none',
                    }}
                    onClick={() => column!.sortable && handleSort(column!.id)}
                  >
                    {column!.label}
                    {sortColumn === column!.id && (
                      <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                        {sortDirection === 'asc' ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(row => {
              const isEditing = editingRowId === row.id;
              const displayRow = isEditing && editedRow ? editedRow : row;

              return (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:hover': { bgcolor: 'hsl(var(--table-hover))' },
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  {visibleColumns.map(column => (
                    <TableCell key={column!.id}>
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={displayRow[column!.id] || ''}
                          onChange={(e) => handleFieldChange(column!.id, e.target.value)}
                          type={column!.id === 'age' ? 'number' : 'text'}
                          fullWidth
                        />
                      ) : (
                        displayRow[column!.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {isEditing ? (
                        <>
                          <Tooltip title="Save">
                            <IconButton
                              size="small"
                              onClick={handleSave}
                              sx={{ color: 'hsl(var(--success))' }}
                            >
                              <SaveIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton size="small" onClick={handleCancel}>
                              <CancelIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(row)}
                              sx={{ color: 'hsl(var(--primary))' }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(row.id)}
                              sx={{ color: 'hsl(var(--destructive))' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedData.length}
        page={currentPage}
        onPageChange={(_, newPage) => dispatch(setCurrentPage(newPage))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => dispatch(setRowsPerPage(parseInt(e.target.value, 10)))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};
