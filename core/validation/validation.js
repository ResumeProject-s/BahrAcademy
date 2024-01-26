import * as yup from "yup";

// login
export const loginValidationEmail = yup.object({
  password: yup
    .string("رمز شما معتبر نیست")
    .required("لطفا رمز خود را وارد کنید"),
  email: yup
    .string("ایمیل شما معتبر نمی باشد")
    .email("ایمیل شما معتبر نمی باشد")
    .required("لطفا ایمیل خود را وارد کنید"),
});

export const loginValidationPhone = yup.object({
  password: yup
    .string("رمز شما معتبر نیست")
    .required("لطفا رمز خود را وارد کنید"),
  phone: yup
    .number("شماره تماس شما معتبر نمی باشد")
    .required("لطفا شماره تماس خود را وارد کنید خود را وارد کنید"),
  // .min(11, "شماره تماس شما معتبر نمی باشد")
  // .max(11, "شماره تماس شما معتبر نمی باشد"),
});

// sign up

// sign up => step one

export const signUpStepOne = yup.object({
  // fullName: yup
  //   .string("نام شما معتبر نمی باشد")
  //   .min(3, "نام شما کوتاه است")
  //   .required("لطفاً نام خود را وارد کنید"),
  // barthDate: yup
  //   .string("تاریخ تولد معتبر نمی باشد")
  //   .required("لطفاً تاریخ تولد خود را وارد کنید"),
  phoneNumber: yup
    .string("شماره تماس باید به صورت عدد باشد")
    .min(11, "شماره تماس شما باید 11 رقم باشد")
    .max(11)
    .matches(/^09\d{9}$/, "شماره تماس شما معتبر نمی باشد")
    .required("لطفا شماره تماس خود را وارد کنید"),
});

// sign up => step two

export const signUpStepTwo = yup.object({
  // nationalCode: yup
  //   .string("کد ملی شما معتبر نمی باشد")
  //   .matches(/^[0-9]{10}$/, "کد ملی شما معتبر نمی باشد")
  //   .required("لطفا  کد ملی خود را وارد کنید"),
  code: yup.string("کد وارد شده معتبر نیست").required("لطفا کد را وارد کنید"),
});

// sign up => step three => in the current page

// forgetPassword

// forgetPassword => step one

export const forgetPasswordStepOne = yup.object({
  email: yup
    .string()
    .email("ایمیل شما معتبر نمی باشد")
    .required("لطفا ایمیل خود را وارد کنید"),
});

// forgetPassword => step two

export const forgetPasswordStepTwo = yup.object({
  code: yup
    .number("کد را به صورت عدد وارد کنید")
    .max(999999)
    .min(0)
    .required("لطفا کد را وارد کنید"),
});

// forgetPassword => step three => on current page

// userpanel Profile

export const userPanelProfile = yup.object({
  fullName: yup
    .string("نام و نام خوانوادگی شما معتبر نیست")
    .min(3, "نام و نام خوانوادگی شما معتبر نیست")
    .required("لطفا نام و نام خوانوادگی خود را وارد کنید"),
  barthDate: yup
    .string("تاریخ تولد شما معتبر نیست")
    .required("لطفا تاریخ تولد خود را وارد کنید"),
  phoneNumber: yup
    .string("شماره تماس شما معتبر نیست")
    .min(11, "شماره تماس شما معتبر نیست")
    .max(11, "شماره تماس شما معتبر نیست")
    .required("لطفا شماره تماس خود را وارد کنید"),
});
