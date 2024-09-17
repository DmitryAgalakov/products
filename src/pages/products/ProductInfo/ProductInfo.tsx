import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../shared/store/store';
import { Parameter } from './Parameter';

export function ProductInfo() {
  const { productId } = useParams<{ productId: string }>();

  const products = useAppSelector((store) => store.products.products);

  const product = productId ? products.find((p) => p.id === +productId) : undefined;

  return (
    <>
      {product ? (
        <Stack
          sx={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            pt: '150px',
            gap: '100px',
          }}
        >
          <Stack sx={{ width: '40%', height: '100%', flexDirection: 'row-reverse' }}>
            <img src={product.image} style={{ maxWidth: '220px', maxHeight: '300px' }} />
          </Stack>
          <Stack sx={{ width: '60%', height: '100%' }}>
            <Parameter title={'Название'} label={product.title} />
            <Parameter title={'Категория'} label={product.category || ''} />
            <Parameter title={'Рейтинг'} label={`${product.rating?.rate.toString() || ''} / ${product.rating?.count.toString() || ''}`} />
            <Parameter title={'Описание'} label={product.description} />
            <Parameter title={'Цена'} label={product.price.toString()} />
          </Stack>
        </Stack>
      ) : (
        <Typography sx={{ minWidth: '200px', color: '#888897' }}>Продукт не найден</Typography>
      )}
    </>
  );
}
