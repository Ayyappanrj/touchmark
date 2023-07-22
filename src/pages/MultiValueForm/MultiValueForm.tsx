import React, { useState, useEffect } from 'react';
import './MultiValueForm.css'
import { Formik, Field, ErrorMessage, FieldProps, FieldArray } from 'formik';
import { Button, Typography, RadioGroup, FormControlLabel, Radio, MenuItem, Avatar, Select } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue, red } from '@mui/material/colors';

const MultiValueForm: React.FC = () => {

    const [transactionsData, setTransactionsData] = useState([]);

    useEffect(() => {
        getTransactionList();
    }, []);

    const getTransactionList = () => {
        axios.get('http://localhost:5000/transactions').then((res: any) => {
            if(res.status === 200)
            {
                setTransactionsData(res.data);
            }
        }).catch((err: any) => {
            console.log(err, 'error')
        })
    }

    // Define the initial form values
    const initialValues: any = {
        transactions: [
            { type: '', reference: '', customer_number: '', customer_name: '', customer_address: '', 
                phone_number: '', transfer_amount: '', transfer_currency: '', bank: '', acc_number: '', 
                payment_details: '', card_details: '', region: ''}
        ]
    };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
        transactions: Yup.array().of(
            Yup.object().shape({
                type: Yup.string().required('Type is required'),
                customer_number: Yup.number().test(
                    'requiredIfExist',
                    'Customer number is required',
                    function (value) {
                      return this.parent.type === 'exist' ? !!value : true;
                    }
                ),
                reference: Yup.string().required('Reference is required'),
                customer_name: Yup.string().required('Customer name is required'),
                customer_address: Yup.string().required('Customer address is required'),
                phone_number: Yup.string()
                .matches(/^[0-9]+$/, 'Please enter only numbers')
                .required('Phone number is required'),
                transfer_amount: Yup.string()
                .matches(/^[0-9]+$/, 'Please enter only numbers')
                .required('Transfer amount is required'),
                transfer_currency: Yup.string().required('Transfer currency address is required'),
                bank: Yup.string()
                .matches(/^[A-Za-z]+$/, 'Please enter only characters')
                .required('Beneficiary bank is required'),
                acc_number: Yup.string()
                .matches(/^[0-9]+$/, 'Please enter only numbers')
                .required('Account number is required'),
                payment_details: Yup.string()
                .matches(/^[A-Za-z]+$/, 'Please enter only characters')
                .required('Payment details is required'),
                card_details: Yup.string().required('Card details is required'),
                region: Yup.string().required('Region is required'),
            })
        ),
    });

  // Handle form submission
  const onSubmit = (values: any) => {
    console.log(values, 'value of form')
  };
  
  interface MyFormValues {
    option: string;
  }

  const setCustomerData = (value: any, setFieldValue: any, index: any) => {
    const existCustomer: any = transactionsData.find((val: any) => { return val.customer_number === value });
    if(existCustomer === undefined) {
        setFieldValue(`transactions.${index}.customer_name`, "");
        setFieldValue(`transactions.${index}.customer_address`, "");
        setFieldValue(`transactions.${index}.phone_number`, "");
        setFieldValue(`transactions.${index}.reference`, "");
        setFieldValue(`transactions.${index}.transfer_amount`, "");
        setFieldValue(`transactions.${index}.transfer_currency`, "");
        setFieldValue(`transactions.${index}.bank`, "");
        setFieldValue(`transactions.${index}.acc_number`, "");
        setFieldValue(`transactions.${index}.payment_details`, "");
        setFieldValue(`transactions.${index}.card_details`, "");
        setFieldValue(`transactions.${index}.region`, "");
    } else {
        setFieldValue(`transactions.${index}.customer_name`, existCustomer?.customer_name);
        setFieldValue(`transactions.${index}.customer_address`, existCustomer?.customer_address);
        setFieldValue(`transactions.${index}.phone_number`, existCustomer?.phone_number);
        setFieldValue(`transactions.${index}.reference`, existCustomer?.reference);
        setFieldValue(`transactions.${index}.transfer_amount`, existCustomer?.transfer_amount);
        setFieldValue(`transactions.${index}.transfer_currency`, existCustomer?.transfer_currency);
        setFieldValue(`transactions.${index}.bank`, existCustomer?.bank);
        setFieldValue(`transactions.${index}.acc_number`, existCustomer?.acc_number);
        setFieldValue(`transactions.${index}.payment_details`, existCustomer?.payment_details);
        setFieldValue(`transactions.${index}.card_details`, existCustomer?.card_details);
        setFieldValue(`transactions.${index}.region`, existCustomer?.region);
    }
  }

  const addForm = (push: any) => {
    push({ type: '', reference: '', customer_number: '', customer_name: '', customer_address: '', 
                phone_number: '', transfer_amount: '', transfer_currency: '', bank: '', acc_number: '', 
                payment_details: '', card_details: '', region: ''});
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} 
      enableReinitialize={true}>
    {(formik: any) => {
            return (
      <>
        <Typography variant="h6" className="mb-3">Multi Value Form</Typography>
        <div className="cus-form">
            <div className="container">
                <FieldArray name="transactions">
                {({ remove, push }: any) => (
                <>
                    { formik.values.transactions.map((_: any, index: any) => (
                        <div key={index}>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Type</label>
                                    <Field 
                                        label="Type" 
                                        name={`transactions.${index}.type`} 
                                    >
                                        {({ field }: FieldProps<MyFormValues>) => (
                                            <RadioGroup {...field} row
                                                onChange={(e: any) => {
                                                    formik.setFieldValue(`transactions.${index}.type`, e.target.value);
                                                    if(e.target.value === "new") {
                                                        formik.setFieldValue(`transactions.${index}.customer_number`, "");
                                                    }
                                                }}
                                            >
                                                <FormControlLabel value="new" control={<Radio />} label="New" />
                                                <FormControlLabel value="exist" control={<Radio />} label="Exist" />
                                            </RadioGroup>
                                        )}
                                    </Field>
                                    <ErrorMessage name={`transactions.${index}.type`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Reference</label>
                                    <Field
                                        placeholder="Reference"
                                        type="text"
                                        className="cus-input"
                                        name={`transactions.${index}.reference`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.reference`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Customer Number</label>
                                    <Field
                                        placeholder="Customer Number"
                                        type="text"
                                        className="cus-input"
                                        label="Customer Number"
                                        name={`transactions.${index}.customer_number`}
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            formik.setFieldValue(`transactions.${index}.customer_number`, value);
                                            if(formik.values.transactions[index].type === "exist") {
                                                setCustomerData(value, formik.setFieldValue, index);
                                            }
                                        }}
                                        disabled={ formik.values.transactions[index].type === "new" ? true : false }
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.customer_number`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Customer Name</label>
                                    <Field
                                        placeholder="Customer Name"
                                        type="text"
                                        className="cus-input"
                                        label="Customer Name"
                                        name={`transactions.${index}.customer_name`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.customer_name`} component="div" className="error" />
                                </div>
                                { formik.values.transactions[index].region !== "Port Mathurin" &&
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Custmer Address</label>
                                        <Field
                                            placeholder="Customer Address"
                                            as="textarea"
                                            type="text"
                                            className="cus-input cus-textarea"
                                            label="Customer Address"
                                            name={`transactions.${index}.customer_address`}
                                            multiline="true"
                                            rows={4}
                                            required
                                        />
                                        <ErrorMessage name={`transactions.${index}.customer_address`} component="div" className="error" />
                                    </div> 
                                }
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <Field
                                        placeholder="Phone Number"
                                        type="text"
                                        className="cus-input"
                                        label="Phone Number"
                                        name={`transactions.${index}.phone_number`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.phone_number`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Transfer Amount</label>
                                    <Field
                                        placeholder="Transfer Amount"
                                        type="text"
                                        className="cus-input"
                                        label="Transfer Amount"
                                        name={`transactions.${index}.transfer_amount`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.transfer_amount`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Transfer Currency</label>
                                    <Select
                                        label="Transfer Currency"
                                        name="transfer_currency"
                                        className="cus-input cus-bor-n"
                                        onChange={(e) => {
                                            formik.setFieldValue(
                                                `transactions.${index}.transfer_currency`,
                                                e.target.value
                                            );
                                        }}
                                        required
                                    >
                                        <MenuItem value="AED">AED</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="CHF">CHF</MenuItem>
                                        <MenuItem value="MUR">MUR</MenuItem>
                                        <MenuItem value="USD">USD</MenuItem>
                                    </Select>
                                    <ErrorMessage name={`transactions.${index}.transfer_currency`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Beneficiary Bank</label>
                                    <Field
                                        placeholder="Beneficiary Bank"
                                        type="text"
                                        className="cus-input"
                                        label="Beneficiary Bank"
                                        name={`transactions.${index}.bank`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.bank`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Beneficiary Account Number</label>
                                    <Field
                                        placeholder="Beneficiary Account Number"
                                        type="text"
                                        className="cus-input"
                                        label="Beneficiary Account Number"
                                        name={`transactions.${index}.acc_number`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.acc_number`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Payment Details</label>
                                    <Field
                                        placeholder="Payment Details"
                                        type="text"
                                        className="cus-input"
                                        label="Payment Details"
                                        name={`transactions.${index}.payment_details`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.payment_details`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Credit/ Debit Card</label>
                                    <Field
                                        placeholder="Credit/ Debit Card"
                                        type="text"
                                        className="cus-input"
                                        label="Credit/Debit Card"
                                        name={`transactions.${index}.card_details`}
                                        required
                                    />
                                    <ErrorMessage name={`transactions.${index}.card_details`} component="div" className="error" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Region</label>
                                    <Select
                                        label="Region"
                                        name="regoin"
                                        className="cus-input cus-bor-n"
                                        onChange={(e) => {
                                            formik.setFieldValue(
                                                `transactions.${index}.region`,
                                                e.target.value
                                            );
                                        }}
                                        required
                                    >
                                        <MenuItem value="Port Louis">Port Louis</MenuItem>
                                        <MenuItem value="Curepipe">Curepipe</MenuItem>
                                        <MenuItem value="Vacoas">Vacoas</MenuItem>
                                        <MenuItem value="Port Mathurin">Port Mathurin</MenuItem>
                                    </Select>
                                    <ErrorMessage name={`transactions.${index}.region`} component="div" className="error" />
                                </div>
                            </div>
                            <div className='row mb-5'>
                                <div className="col-md-12 cus-ad-btn">
                                    <Avatar sx={{ bgcolor: blue[500], marginRight: "10px" }} onClick={() => addForm(push)}>
                                        <AddIcon />
                                    </Avatar>
                                    { index !== 0 &&
                                        <Avatar sx={{ bgcolor: red[500] }} onClick={() => remove(index)}>
                                            <DeleteIcon />
                                        </Avatar>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                )}
                </FieldArray>
                <div className="col-md-12 text-right mt-3">
                    <Button sx={{ marginRight: "10px" }} type="button" variant="outlined" onClick={() => formik.resetForm()}>
                        Reset
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
      </>
    )}}
    </Formik>
  );
};

export default MultiValueForm;
