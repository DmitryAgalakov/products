import Stack from '@mui/material/Stack';
import { ProductCard } from './ProductCard';
import { Product } from '../../../../shared/store/slices/productsSlice/models';

interface Props {
  products: Product[];
}

export function ProductsList(props: Props) {
  const { products } = props;

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        p: '32px',
      }}
    >
      <Stack direction={'row'} sx={{ height: '100%', flexWrap: 'wrap', gap: '16px', width: '80%', alignContent: 'flex-start' }}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Stack>
    </Stack>
  );
}
