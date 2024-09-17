import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Product } from '../../../../shared/store/slices/productsSlice/models';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Dispatch, SetStateAction } from 'react';
import Switch from '@mui/material/Switch';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../../shared/store/store';
import { removeProduct } from '../../../../shared/store/slices/productsSlice/productsSlice';

interface Props {
  customProducts: Product[];
  onlyPublished: boolean;
  setOnlyPublished: Dispatch<SetStateAction<boolean>>;
}

export function ProductsTable(props: Props) {
  const { customProducts, onlyPublished, setOnlyPublished } = props;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <Stack sx={{ width: '100%', height: '100%', p: '32px' }}>
      <FormControlLabel
        sx={{ ml: '8px' }}
        control={<Switch checked={onlyPublished} onChange={(_, v) => setOnlyPublished(v)} />}
        label='Только опубликованные'
      />

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell sx={{ width: '100px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {customProducts.map((product) => (
              <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Stack direction={'row'}>
                    <IconButton onClick={() => navigate(`/products/edit/${product.id}`)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(removeProduct(product.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
