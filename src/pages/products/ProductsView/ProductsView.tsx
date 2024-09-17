import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { getProducts } from '../../../shared/store/slices/productsSlice/epics/getProductsEpic';
import { useAppDispatch, useAppSelector } from '../../../shared/store/store';
import { ProductsList } from './components/ProductsList';
import { ProductsTable } from './components/ProductsTable';
import { initCustomProductsFromSessionStorage } from '../../../shared/store/slices/productsSlice/epics/initCustomProductsFromSessionStorageEpic';

const TABS_HEIGHT = 50;
const FILTER_BUTTONS_HEIGHT = 50;

export function ProductsView() {
  const dispatch = useAppDispatch();

  const [maxCount, setMaxCount] = useState(8);
  const [selectedTab, setSelectedTab] = useState(0);
  const [onlyPublished, setOnlyPublished] = useState(false);

  useEffect(() => {
    dispatch(initCustomProductsFromSessionStorage());
    dispatch(getProducts());
  }, []);

  const products = useAppSelector((store) => store.products.products);

  const { displayedProducts, displayedCustomProducts } = useMemo(() => {
    const customProducts = products.filter((p) => p.creationDate);
    return {
      displayedProducts: products.filter((p) => !p.creationDate).slice(0, maxCount),
      displayedCustomProducts: customProducts.filter((p) => (onlyPublished ? p.published : true)).slice(0, maxCount),
    };
  }, [products, maxCount, onlyPublished]);

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
        sx={{
          width: '100%',
          '& .MuiTabs-flexContainer': {
            height: `${TABS_HEIGHT}px`,
            justifyContent: 'center',
          },
        }}
      >
        <Tab sx={{ minWidth: '340px' }} label='Продукты полученные по API' value={0} />
        <Tab sx={{ minWidth: '340px' }} label='Продукты добавленные через форму' value={1} />
      </Tabs>

      <Box sx={{ width: '100%', height: `calc(100% - ${TABS_HEIGHT}px)` }}>
        <Stack direction={'row'} sx={{ height: `${FILTER_BUTTONS_HEIGHT}px`, pl: '16px', gap: '16px' }}>
          <Button onClick={() => setMaxCount(8)} variant='outlined' color='secondary'>
            <Typography>{'8 товаров'}</Typography>
          </Button>
          <Button onClick={() => setMaxCount(16)} variant='outlined' color='secondary'>
            <Typography>{'16 товаров'}</Typography>
          </Button>
          <Button onClick={() => setMaxCount(20)} variant='outlined' color='secondary'>
            <Typography>{'Все товары'}</Typography>
          </Button>
        </Stack>

        <Box sx={{ width: '100%', height: `calc(100% - ${FILTER_BUTTONS_HEIGHT}px)` }}>
          {selectedTab === 0 && <ProductsList products={displayedProducts} />}
          {selectedTab === 1 && (
            <ProductsTable customProducts={displayedCustomProducts} onlyPublished={onlyPublished} setOnlyPublished={setOnlyPublished} />
          )}
        </Box>
      </Box>
    </>
  );
}
