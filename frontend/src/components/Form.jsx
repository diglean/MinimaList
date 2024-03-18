import * as React from "react";
import Box from "@mui/material/Box";
import styles from "./styles/FormInput.module.css";
import { FormProvider, useForm } from "react-hook-form";

export default function Form({ children, callBackSubmit }) {
  const methods = useForm();

  const onSubmit = (data) => {
    callBackSubmit(data);
  };

  return (
    <div className={styles.main}>
      <FormProvider {...methods}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
          }}
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {children}
        </Box>
      </FormProvider>
    </div>
  );
}
