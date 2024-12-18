"use client";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
import { SignupAction } from "../actions/Auth";

const page = () => {
  const [state, action, pending] = useActionState(SignupAction, null);
  return (
    <Box sx={{ marginTop: "4rem", maxWidth: "20rem", marginX: "auto" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "Bold",
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        Signup
      </Typography>
      <Box
        component="form"
        action={action}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          name="email"
          label="Email"
          variant="standard"
          fullWidth
          defaultValue={state?.data?.email}
          helperText={state?.error?.fieldErrors?.email?.[0]}
          error={!!state?.error?.fieldErrors?.email?.[0]}
        ></TextField>
        <TextField
          type="password"
          label="Password"
          variant="standard"
          name="password"
          fullWidth
          defaultValue={state?.data?.password}
          helperText={state?.error?.fieldErrors?.password?.[0]}
          error={!!state?.error?.fieldErrors?.password?.[0]}
        ></TextField>
        <TextField
          type="password"
          label="Password Confirm"
          variant="standard"
          name="password_confirm"
          defaultValue={state?.data?.password_confirm}
          helperText={state?.error?.fieldErrors?.password_confirm?.[0]}
          error={!!state?.error?.fieldErrors.password_confirm?.[0]}
          fullWidth
        ></TextField>
        {state?.error?.formErrors?.length! > 0 && (
          <FormHelperText error={true}>
            {JSON.stringify(state?.error?.formErrors)}
          </FormHelperText>
        )}
        <LoadingButton type="submit" loading={pending} variant="contained">
          SIGNUP
        </LoadingButton>
        <Link href="/signin">Already have an account?</Link>
      </Box>
    </Box>
  );
};

export default page;
