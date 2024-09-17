import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Field } from 'formik';

interface Props {
  valueKey: string;
  label: string;
  error: string;
  type?: string;
}

export function FormikInput(props: Props) {
  const { valueKey, label, error, type = 'text' } = props;

  return (
    <Stack>
      <Field
        id={valueKey}
        name={valueKey}
        placeholder={label}
        type={type}
        style={{ height: '40px', paddingLeft: '8px' }}
        autoComplete='off'
      />
      {error ? <Typography sx={{ color: 'red' }}>{error}</Typography> : false}
    </Stack>
  );
}
