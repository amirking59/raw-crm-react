import { useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import { IconButton, InputAdornment, InputLabel, OutlinedInput, FormControl, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function PasswordInput({ name, label, ...other }) {
  const [showPassword, setShowPassword] = useState(false);
  // init field
  const [field, meta] = useField(name);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  return (
    <FormControl style={{ width: '100%' }} {...other}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        error={!!(meta.touched && meta.error)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        id={name}
        label={label}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
      />
      <FormHelperText sx={{ height: 20 }} error={true}>
        {meta.touched && meta.error ? meta.error : ''}
      </FormHelperText>
    </FormControl>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default PasswordInput;
