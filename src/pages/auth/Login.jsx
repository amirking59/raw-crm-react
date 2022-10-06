import { useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Stack, Box, Typography, Container, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { Formik, Form, useFormikContext } from 'formik';

//hooks
import useResponsive from '../../hooks/useResponsive.js';
import useAuth from '../../hooks/useAuth.js';

// components
import TextInput from '../../components/form/TextInput.jsx';
import PasswordInput from '../../components/form/PasswordInput.jsx';

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

function LoginFormFields() {
  const { setFieldError } = useFormikContext();

  useEffect(() => {
    setFieldError('email', 'test');
  }, []);

  return (
    <Form>
      <Grid spacing={2} container>
        <Grid md={6} xs={12}>
          <TextInput name="email" label="Email" />
        </Grid>
        <Grid md={6} xs={12}>
          <PasswordInput name="password" label="Password" />
        </Grid>
        <Grid textAlign="center" justifyContent="center" xs={12}>
          <LoadingButton type="submit">Submit</LoadingButton>
        </Grid>
      </Grid>
    </Form>
  );
}

function LoginForm() {
  const { login } = useAuth();

  function onSubmit() {
    login();
  }

  return (
    <Formik initialValues={{ email: '', password: '1' }} onSubmit={onSubmit}>
      <LoginFormFields />
    </Formik>
  );
}

function Login() {
  const mdUp = useResponsive('up', 'md');

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
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default Login;
