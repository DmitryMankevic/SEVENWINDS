import type { IUserLoginData, IUserSignUpData } from "../model";


export class UserValidate {
  static validateEmail(email: string) {
    const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password: string) {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
    const isValidLength = password.length >= 8;

    if (
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumbers.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false;
    }

    return true;
  }

  static validateLoginData(user: IUserLoginData): {
    isValid: boolean;
    err: string | null;
  } {
    const { email, password } = user;

    if (
      !email ||
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        err: "Email не должен быть пустым и должен быть валидным",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0 ||
      !this.validatePassword(password)
    ) {
      return {
        isValid: false,
        err: "Пароль не должен быть пустым, должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву, один специальный символ и быть не менее 8 символов",
      };
    }

    return {
      isValid: true,
      err: null,
    };
  }

  static validateSignUpData(user: IUserSignUpData): {
    isValid: boolean;
    err: string | null;
  } {
    const { email, password, faculty } = user;

    if (!faculty || !faculty.trim()) {
      return { isValid: false, err: "Поле faculty не должно быть пустым" };
    }

    if (!email || !email.trim()) {
      return { isValid: false, err: "Поле email не должно быть пустым" };
    }

    if (!password || password.length < 6) {
      return {
        isValid: false,
        err: "Пароль должен содержать минимум 6 символов",
      };
    }

    return { isValid: true, err: null };
  }
}
