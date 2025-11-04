import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  ViewColumn as ViewColumnIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { RootState } from '@/store/store';
import { setSearchQuery, setData } from '@/store/tableSlice';
import { importCSV, exportCSV } from '@/utils/csvUtils';
import { useTheme } from '@/components/ThemeProvider';

interface TableToolbarProps {
  onManageColumns: () => void;
}

export const TableToolbar = ({ onManageColumns }: TableToolbarProps) => {
  const dispatch = useDispatch();
  const { mode, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data, columns, columnVisibility, searchQuery } = useSelector(
    (state: RootState) => state.table
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const importedData = await importCSV(file);
        dispatch(setData(importedData));
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to import CSV');
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExport = () => {
    exportCSV(data, columns, columnVisibility);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        mb: 4,
        alignItems: { xs: 'stretch', md: 'center' },
      }}
    >
      <TextField
        placeholder="Search all fields..."
        value={searchQuery}
        onChange={handleSearchChange}
        size="medium"
        sx={{ 
          flex: 1, 
          minWidth: { md: '320px' },
          '& .MuiOutlinedInput-root': {
            borderRadius: 'var(--radius)',
            bgcolor: 'hsl(var(--card))',
            transition: 'var(--transition-smooth)',
            '&:hover': {
              boxShadow: 'var(--shadow-sm)',
            },
            '&.Mui-focused': {
              boxShadow: 'var(--shadow-md)',
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'hsl(var(--muted-foreground))' }} />
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleImport}
          style={{ display: 'none' }}
        />
        
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            borderRadius: 'var(--radius)',
            textTransform: 'none',
            fontWeight: 600,
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--foreground))',
            px: 3,
            '&:hover': {
              borderColor: 'hsl(var(--primary))',
              bgcolor: 'hsl(var(--primary) / 0.05)',
              boxShadow: 'var(--shadow-sm)',
            }
          }}
        >
          Import CSV
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
          sx={{
            borderRadius: 'var(--radius)',
            textTransform: 'none',
            fontWeight: 600,
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--foreground))',
            px: 3,
            '&:hover': {
              borderColor: 'hsl(var(--accent))',
              bgcolor: 'hsl(var(--accent) / 0.05)',
              boxShadow: 'var(--shadow-sm)',
            }
          }}
        >
          Export CSV
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<ViewColumnIcon />}
          onClick={onManageColumns}
          sx={{
            borderRadius: 'var(--radius)',
            textTransform: 'none',
            fontWeight: 600,
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--foreground))',
            px: 3,
            '&:hover': {
              borderColor: 'hsl(var(--primary))',
              bgcolor: 'hsl(var(--primary) / 0.05)',
              boxShadow: 'var(--shadow-sm)',
            }
          }}
        >
          Columns
        </Button>

        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton 
            onClick={toggleTheme}
            sx={{
              borderRadius: 'var(--radius)',
              border: '1px solid hsl(var(--border))',
              bgcolor: 'hsl(var(--card))',
              color: 'hsl(var(--primary))',
              '&:hover': {
                bgcolor: 'hsl(var(--primary) / 0.1)',
                borderColor: 'hsl(var(--primary))',
                boxShadow: 'var(--shadow-sm)',
              }
            }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
