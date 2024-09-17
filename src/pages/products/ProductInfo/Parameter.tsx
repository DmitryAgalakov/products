import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Props {
  title: string;
  label: string;
}

export function Parameter(props: Props) {
  const { title, label } = props;

  return (
    <Stack sx={{ maxWidth: '700px', flexDirection: 'row', pt: '16px' }}>
      <Typography sx={{ minWidth: '200px', color: '#888897' }}>{title}</Typography>
      <Typography>{label}</Typography>
    </Stack>
  );
}
