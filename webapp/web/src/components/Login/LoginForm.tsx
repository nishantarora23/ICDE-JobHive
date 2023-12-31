import { useState } from "react";

import { injectIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Auth } from "../../types";
import { login } from "../../services/authService";
import { setUserInfo, setIsLoggedIn } from "../../services/userInfoService";
import "./LoginForm.scss";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import AppSnackbar from "../AppSnackbar/AppSnackbar";
// Define the props interface for the component
type Props = {
  intl: any;
  formData: Auth;
  setFormData: React.Dispatch<Auth>;
};
// Define the LoginForm component
const LoginForm = ({ formData, setFormData, intl }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isLoginError, setLoginError] = useState(false);
  const { control, handleSubmit } = useForm({
    reValidateMode: "onBlur",
  });
  const navigate = useNavigate();
  // Handle form submission
  const onSubmit = (data: any) => {
    const doLogin = async () => {
      await setLoginError(false);
      await setLoading(true);
      await setFormData({ ...formData, ...data });
      // Call the login service to authenticate the user
      await login(data)
        .then((response: any) => {
          debugger;
          if (response.status === 200) {
            setUserInfo(response?.data);
            if(response.data === null){setLoginError(true)}
            else{
              setIsLoggedIn(true);
              navigate(`/student/home`);
            }
            
          } else {
            setLoginError(true);
          }
        })
        .catch((err: any) => {
          console.log(err);
          setLoginError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    doLogin();
  };
  // Define login form fields configuration
  const LOGIN_FIELDS = [
    {
      id: "username",
      type: "text",
      rules: { required: true },
    },
    {
      id: "password",
      type: "password",
      rules: { required: true },
    },
  ];
  // Render the LoginForm component UI
  return (
    <>
      <LoadingSpinner isOpen={loading} />
      <AppSnackbar
        type="error"
        message={intl.formatMessage({
          id: "authForm.form.error",
        })}
        open={isLoginError}
      />
      <Grid container className="login-card">
        <Grid
          component="form"
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
           <Box>
        <h1>Job Seeker Login</h1>
      <h5 className="typeset">
        Don't have an account yet?{' '}
        <Link to="/signup" className="link">
          Create account
        </Link>
      </h5>
      </Box>
          {LOGIN_FIELDS.map((key, index) => {
            return (
              <Grid key={index} item xs={12}>
                <Controller
                  control={control}
                  name={key.id}
                  rules={key.rules}
                  render={({ field, fieldState: { error } }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label={intl.formatMessage({
                        id: `authForm.form.label.${key.id}`,
                      })}
                      InputLabelProps={{
                        style: { color: '#000000' }
                      }}
                      InputProps={{
                        style: {
                          borderBottom: `2px solid #000000`,
                          transition: 'border-bottom 0.3s', // Optional: Add transition for smoother effect
                        }
                      }}
                      error={error !== undefined}
                      type={key.type}
                      helperText={
                        error
                          ? intl.formatMessage({
                              id: `authForm.form.error.${key.id}.${[
                                error.type,
                              ]}`,
                            })
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container className="button-container" spacing={3}>
          <Button component={Link} to={"/signup"}>
            {intl.formatMessage({
              id: "authForm.button.signup",
            })}
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {intl.formatMessage({
              id: "authForm.button.submit",
            })}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(LoginForm);
