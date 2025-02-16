import { useState } from "react";

export const useForm = (initialForm = {}) => {
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

    if (!emailValidation(formState.email))
      emailError = "Formato email no válido";

    if (!validatePassword(formState.password))
      passwordError =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

    setFormState({
      ...formState,
      emailError: emailError,
      passwordError: passwordError,
    });

    if (emailError || passwordError) return false;

    return true;
  };

  return {
    formState,
    onInputChange,
    onFormSubmitted,
  };
};
