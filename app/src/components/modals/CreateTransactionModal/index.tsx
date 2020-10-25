import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useModals } from '../../../providers/modals';
import validationSchema from './validation';
import useStyles from './styles';
import { API } from '../../../types';

interface Props {
  handleTransaction(transaction: API.Transaction): Promise<void>;
}

const CreateTransactionModal: React.FC<Props> = (props: Props) => {
  const { closeModal } = useModals();
  const { handleTransaction } = props;
  const onClose = () => closeModal('CREATE_TRANSACTION');
  const classes = useStyles();
  const { values, handleChange, handleSubmit, errors, isValid, isSubmitting, submitCount } = useFormik<API.Transaction>(
    {
      validationSchema,
      initialValues: {
        type: 'debit',
        amount: 100,
      },
      onSubmit: async (v, actions) => {
        try {
          await handleTransaction(v);
          onClose();
        } catch (e) {
          console.error(e);
          actions.setSubmitting(false);
        }
      },
    },
  );
  const isSubmitted = submitCount > 0;

  return (
    <Dialog open fullWidth onClose={onClose} PaperProps={{ square: true }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create transaction</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6} className={classes.fieldContainer}>
              <FormControl fullWidth error={isSubmitted && errors.type !== undefined}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.type}
                  name="type"
                  onChange={handleChange}
                >
                  <MenuItem value="debit">Debit</MenuItem>
                  <MenuItem value="credit">Credit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} className={classes.fieldContainer}>
              <TextField
                name="amount"
                label="Amount"
                value={values.amount}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="number"
                error={isSubmitted && errors.amount !== undefined}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" disableElevation onClick={onClose} color="primary">
            Close
          </Button>
          <Button
            type="submit"
            disableElevation
            disabled={!isValid || isSubmitting}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CreateTransactionModal;
