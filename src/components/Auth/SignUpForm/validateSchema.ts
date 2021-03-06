import * as Yup from 'yup';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../common/constants';

function deleteSpaces(value: string) {
  const trimValue = value.trim();
  const arr = trimValue
    .split(' ')
    .filter((s) => s !== '')
    .filter((s) => s !== undefined);
  return arr;
}

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .strict()
    .ensure()
    .trim('no whitespaces')
    .min(MIN_PASSWORD_LENGTH, `at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(MAX_PASSWORD_LENGTH, `${MAX_PASSWORD_LENGTH} characters is maximum`)
    .required('Required field'),
  comfirmPassword: Yup.string()
    .strict()
    .ensure()
    .trim('no whitespaces')
    .oneOf([Yup.ref('password')], ' password must be the same')
    .required('Required field'),
  email: Yup.string()
    .ensure()
    .trim()
    .email('invalid email')
    .required('Required field'),
  fullName: Yup.string()
    .strict()
    .ensure()
    .trim()
    .required('Required field')
    .test(
      'at leat 2 words in fullname',
      'full name should contain at least 2 words',
      function checkLength(value) {
        if (!value) return false;
        const arr = deleteSpaces(value);
        if (arr.length > 1) return true;
        return false;
      },
    )
    .test(
      'check for letter',
      'first character in each word should be a capital letter',
      function checkIsCapital(value) {
        if (!value) return false;
        const arr = deleteSpaces(value);
        if (arr.length > 1) {
          const firstCharacters = arr.map((c) => c[0]);
          return firstCharacters.every((c) => /[A-ZА-Я]/.test(c));
        }
        return false;
      },
    ),
});

export default RegisterSchema;
