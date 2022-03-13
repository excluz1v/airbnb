import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Слишком короткий пароль!')
    .max(20, 'Слишком длинный пароль')
    .required('Обязательное поле'),
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
});

export default LoginSchema;
