import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { RootState } from '@/store/store';
import { toggleColumnVisibility, addColumn } from '@/store/tableSlice';

interface ColumnManagerProps {
  open: boolean;
  onClose: () => void;
}

export const ColumnManager = ({ open, onClose }: ColumnManagerProps) => {
  const dispatch = useDispatch();
  const { columns, columnVisibility } = useSelector((state: RootState) => state.table);
  
  const [newColumnId, setNewColumnId] = useState('');
  const [newColumnLabel, setNewColumnLabel] = useState('');

  const handleToggle = (columnId: string) => {
    dispatch(toggleColumnVisibility(columnId));
  };

  const handleAddColumn = () => {
    if (newColumnId && newColumnLabel) {
      const columnExists = columns.some(col => col.id === newColumnId);
      
      if (columnExists) {
        alert('Column with this ID already exists');
        return;
      }

      dispatch(addColumn({
        id: newColumnId,
        label: newColumnLabel,
        visible: true,
        sortable: true,
      }));

      setNewColumnId('');
      setNewColumnLabel('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Column Visibility
          </Typography>
          <FormGroup>
            {columns.map(column => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    checked={columnVisibility[column.id]}
                    onChange={() => handleToggle(column.id)}
                  />
                }
                label={column.label}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Add New Column
          </Typography>
          <TextField
            label="Column ID"
            placeholder="e.g., department"
            value={newColumnId}
            onChange={(e) => setNewColumnId(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Column Label"
            placeholder="e.g., Department"
            value={newColumnLabel}
            onChange={(e) => setNewColumnLabel(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddColumn}
            disabled={!newColumnId || !newColumnLabel}
            fullWidth
          >
            Add Column
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
