import PropTypes from 'prop-types';
import { useField } from 'formik';

import { InputLabel, OutlinedInput, FormControl, FormHelperText } from '@mui/material';

function TextInput({ name, label, ...other }) {
  const [field, meta] = useField(name);

  return (
    <FormControl style={{ width: '100%' }} {...other}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput error={!!(meta.touched && meta.error)} {...field} id={name} label={label} variant="outlined" />
      <FormHelperText sx={{ height: 20 }} error={true}>
        {meta.touched && meta.error ? meta.error : ''}
      </FormHelperText>
    </FormControl>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
