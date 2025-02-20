import { useState } from "react";

export const useForm = (initialForm = {}, confirmPassword = false) => {
  const [formState, setFormState] = useState(initialForm);

  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onFormSubmitted = (event) => {
    event.preventDefault();

    let emailError;
    let passwordError;
    let confirmPasswordError;

    if (!emailValidation(formState.email))
      emailError = "Formato email no válido";

    if (!validatePassword(formState.password))
      passwordError =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

    if (confirmPassword) {
      if (!validatePassword(formState.confirmPassword))
        confirmPasswordError =
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

      if (formState.confirmPassword !== formState.password) {
        confirmPasswordError =
          "Las contraseñas no coinciden";
      }
    }

    setFormState({
      ...formState,
      emailError: emailError,
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError,
    });

    if (emailError || passwordError || confirmPasswordError) return false;

    return true;
  };

  return {
    formState,
    onInputChange,
    onFormSubmitted
  };
};
