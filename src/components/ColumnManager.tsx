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
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
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
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-xl)',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontWeight: 700,
          fontSize: '1.5rem',
          color: 'hsl(var(--foreground))',
          pb: 2,
        }}
      >
        Manage Columns
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Paper
          elevation={0}
          sx={{ 
            p: 3,
            mb: 3,
            bgcolor: 'hsl(var(--muted))',
            borderRadius: 'var(--radius)',
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: 'hsl(var(--foreground))',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
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
                    sx={{
                      color: 'hsl(var(--primary))',
                      '&.Mui-checked': {
                        color: 'hsl(var(--primary))',
                      }
                    }}
                  />
                }
                label={column.label}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    color: 'hsl(var(--foreground))',
                  }
                }}
              />
            ))}
          </FormGroup>
        </Paper>

        <Paper
          elevation={0}
          sx={{ 
            p: 3,
            bgcolor: 'hsl(var(--muted))',
            borderRadius: 'var(--radius)',
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2.5, 
              fontWeight: 600,
              color: 'hsl(var(--foreground))',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Add New Column
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Column ID"
              placeholder="e.g., department"
              value={newColumnId}
              onChange={(e) => setNewColumnId(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
              fullWidth
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 'var(--radius)',
                  bgcolor: 'hsl(var(--card))',
                }
              }}
            />
            <TextField
              label="Column Label"
              placeholder="e.g., Department"
              value={newColumnLabel}
              onChange={(e) => setNewColumnLabel(e.target.value)}
              fullWidth
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 'var(--radius)',
                  bgcolor: 'hsl(var(--card))',
                }
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddColumn}
              disabled={!newColumnId || !newColumnLabel}
              fullWidth
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 'var(--radius)',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-md)',
                '&:hover': {
                  boxShadow: 'var(--shadow-lg)',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: 'hsl(var(--muted))',
                  color: 'hsl(var(--muted-foreground))',
                }
              }}
            >
              Add Column
            </Button>
          </Box>
        </Paper>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 'var(--radius)',
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            borderColor: 'hsl(var(--border))',
            '&:hover': {
              borderColor: 'hsl(var(--primary))',
              bgcolor: 'hsl(var(--primary) / 0.05)',
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
