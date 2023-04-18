import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import '../../style/Common.scss'

export function Loader() {
  return (
    <Box className="default-loader">
      <CircularProgress />
    </Box>
  );
}