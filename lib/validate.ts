interface SigninValues {
    email: string;
    password: string;
  }
  
  interface SigninErrors {
    email?: string;
    password?: string;
  }


export const signin_validate = (values: SigninValues) =>{
    const errors: SigninErrors = {};
 
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = "Required"
    } else if (values.password.length < 8) {
        errors.password = "Password must be longer than 8 words"
    } else if (values.password.includes(" ")){
        errors.password = "Password cannot be contain empty space"
    }

    return errors
}


interface SignUpValues {
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  interface SignUpErrors {
    email?: string;
    password?: string;
    confirmPassword?: string
  }

export const signup_validate = (values: SignUpValues) =>{
    const errors: SignUpErrors = {};
 
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = "Required"
    } else if (values.password.length < 8) {
        errors.password = "Password must be longer than 8 words"
    } else if (values.password.includes(" ")){
        errors.password = "Password cannot be contain empty space"
    }

    
    if (!values.confirmPassword) {
        errors.confirmPassword = "Required"
    } else if (values.confirmPassword !== values.password){
        errors.confirmPassword = "Password didn't match"
    }

    return errors
}