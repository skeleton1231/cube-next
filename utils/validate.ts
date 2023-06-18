// utils/validation.tsx

export function validateName(name: string) {
    if (!name) {
      return "Name is required";
    }
  
    if (name.length < 2) {
      return "Name should be at least 2 characters";
    }
  
    return null;
  }
  
  export function validateEmail(email: string) {
    if (!email) {
      return "Email is required";
    }
  
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      return "Email is not valid";
    }
  
    return null;
  }
  
  export function validatePassword(password: string) {
    if (!password) {
      return "Password is required";
    }
  
    if (password.length < 8) {
      return "Password should be at least 8 characters";
    }
  
    return null;
  }
  
  export function validatePasswordConfirmation(password: string, passwordConfirmation: string | undefined): string | null {
    if (!passwordConfirmation) {
      return "Password confirmation is required";
    }
    
    if (password !== passwordConfirmation) {
      return "Password and confirmation do not match";
    }
    
    return null;
  }
  
  