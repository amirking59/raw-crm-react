import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

//hooks
import useResponsive from '../../hooks/useResponsive.js';
import useAuth from '../../hooks/useAuth.js';

const RootStyle = styled('div')(({ theme }) => ({
  padding: '0 18px',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 440,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(2, 0, 2, 2),
}));

const FormControlStyled = styled(FormControl)(() => ({
  width: '100%',
}));

function Login() {
  const mdUp = useResponsive('up', 'md');
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  function onSubmit() {
    login();
  }

  return (
    <RootStyle>
      {mdUp && (
        <SectionStyle>
          <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          {/*<img alt="login" src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_login.png" />*/}
        </SectionStyle>
      )}
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack alignItems="center" direction="row" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h4">
                Sign in to Minimal
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>
          </Stack>
          <FormControlStyled>
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput id="outlined-adornment-email" label="Email" sx={{ marginBottom: 3 }} variant="outlined" />
          </FormControlStyled>
          <FormControlStyled>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
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
              id="outlined-adornment-password"
              label="Password"
              sx={{ marginBottom: 4 }}
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
            />
          </FormControlStyled>
          <LoadingButton onClick={onSubmit}>Submit</LoadingButton>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default Login;
