import * as Yup from 'yup';

export const createTransactionValidation = Yup.object().shape({
  type: Yup.string().required().oneOf(['debit', 'credit']),
  amount: Yup.number().min(0, 'Min amount is 0').required('Required field'),
});

export default createTransactionValidation;
