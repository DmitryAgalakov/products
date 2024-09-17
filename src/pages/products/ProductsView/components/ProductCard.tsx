import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../../shared/store/slices/productsSlice/models';
import { TypographyWithTooltip } from '../../../../shared/ui/TypographyWithTooltip';

interface Props {
  product: Product;
}

export function ProductCard(props: Props) {
  const { product } = props;

  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        borderRadius: '4px',
        border: '2px solid gray',
        maxWidth: '250px',
        minWidth: '250px',
        maxHeight: '400px',
        overflow: 'hidden',
        padding: '16px',
      }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
        <img src={product.image} style={{ maxWidth: '220px', maxHeight: '300px', backgroundPosition: 'center' }} />
      </Box>
      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{product.price}</Typography>
      <TypographyWithTooltip label={product.title} sx={{ fontSize: '13px' }} />
    </Stack>
  );
}
