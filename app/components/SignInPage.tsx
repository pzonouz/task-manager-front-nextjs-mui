"use client";
import { Box, Button, FormHelperText, Link, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useActionState } from "react";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { signin } from "../actions/signin";

const SignInPage = () => {
  const [state, action, pending] = useActionState(signin, null);
  const search = useSearchParams();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "20rem",
        marginX: "auto",
        marginTop: "6rem",
      }}
    >
      <Box
        component="form"
        action={() => {
          signIn("google");
        }}
      >
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          type="submit"
          startIcon={<GoogleIcon />}
        >
          Signin with Google
        </Button>
      </Box>
      <Box
        component="form"
        action={(formData: FormData) => {
          action(formData);
        }}
        sx={{
          marginTop: "2rem",
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
          helperText={state?.error?.fieldErrors.email}
          error={!!state?.error?.fieldErrors.email}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="standard"
          fullWidth
          helperText={state?.error?.fieldErrors.password}
          error={!!state?.error?.fieldErrors.password}
        />
        {search.get("error") == "CredentialsSignin" &&
          search.get("code") == "credentials" && (
            <FormHelperText error={true}>
              Email and password doesn't match
            </FormHelperText>
          )}
        <LoadingButton variant="outlined" type="submit" loading={pending}>
          SIGN IN
        </LoadingButton>
        <Link href="/signup">Don't have an account? Sign up</Link>
      </Box>
    </Box>
  );
};

export default SignInPage;
