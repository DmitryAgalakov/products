import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

interface Props {}

export const HEADER_HEIGHT = 60;

export function Header(props: Props) {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        width: '100wh',
        height: `${HEADER_HEIGHT}px`,
        borderBottom: '2px solid gray',
        justifyContent: 'flex-start',
        alignItems: 'center',
        pl: '32px',
        gap: '16px',
      }}
    >
      <Button onClick={() => navigate('/products')}>Главная</Button>
      <Button onClick={() => navigate('/products/create')}>Создать продукт</Button>
    </Stack>
  );
}
