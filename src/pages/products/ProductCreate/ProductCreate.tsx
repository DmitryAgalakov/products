import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { useAppDispatch } from '../../../shared/store/store';
import { Product } from '../../../shared/store/slices/productsSlice/models';
import { createProduct } from '../../../shared/store/slices/productsSlice/epics/createProductEpic';
import { FormikInput } from '../../../shared/ui/FormikInput';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов').required('Обязательное поле'),
  price: Yup.string().min(2, 'Слишком короткое имя').max(50, 'Слишком длинное имя').required('Обязательное поле'),
  description: Yup.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 150 символов').required('Обязательное поле'),
});

interface FormState {
  title: string;
  price: number;
  description: string;
  published: boolean;
}

const initialValues: FormState = {
  title: '',
  price: 0,
  description: '',
  published: true,
};

export function ProductCreate() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submit = (values: FormState) => {
    const product: Omit<Product, 'id'> = {
      ...values,
      creationDate: new Date(Date.now()).toLocaleString(),
    };
    dispatch(createProduct({ product }));
    navigate('/products');
  };

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        pt: '150px',
        alignItems: 'center',
      }}
    >
      <Formik<FormState> initialValues={initialValues} onSubmit={(values) => submit(values)} validationSchema={validationSchema}>
        {({ errors, touched }) => (
          <Form>
            <h2>{'Создание продукта'}</h2>
            <Stack gap={2} sx={{ width: '500px' }}>
              <FormikInput valueKey='title' label='Название' error={errors.title && touched.title ? errors.title : ''} />

              <FormikInput valueKey='price' label='Цена' type='number' error={errors.price && touched.price ? errors.price : ''} />

              <FormikInput
                valueKey='description'
                label='Описание'
                error={errors.description && touched.description ? errors.description : ''}
              />

              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Field id='published' name='published' type='checkbox' autoComplete='off' style={{ width: '20px' }} />
                <Typography>Опубликован</Typography>
              </Stack>

              <Button variant='outlined' color='secondary' type='submit'>
                Сохранить
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
