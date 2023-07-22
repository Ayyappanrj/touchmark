import React, { useState, useEffect } from 'react';
import './NewTransaction.css'
import { Formik, Field, ErrorMessage, FieldProps } from 'formik';
import { Typography, RadioGroup, FormControlLabel, Radio, MenuItem, Select } from '@mui/material';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

interface FormValues {
    type: string;
    reference: any;
    customer_number: string;
    customer_name: string;
    customer_address: string;
    phone_number: string;
    transfer_amount: string;
    transfer_currency: string;
    bank: string;
    acc_number: string;
    payment_details: string;
    card_details: string;
    region: string;
}

const NewTransaction: React.FC = () => {

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }
    
    const generate12DigitNumber = (sequence: any) => {
        const currentDate = getCurrentDate();
        const sequenceNumber = String(sequence).padStart(6, '0');
        return `${currentDate}${sequenceNumber}`;
    }

    const [id, setId] = useState();
    const [refNo, setRefNo] = useState();
    const [transactionsData, setTransactionsData] = useState([]);

    useEffect(() => {
        generateRefNo();
    }, []);

    const generateRefNo = () => {
        axios.get('http://localhost:5000/transactions').then((res: any) => {
            if(res.status === 200)
            {
                setTransactionsData(res.data);
                const id = res.data.reduce((max: any, obj: any) => (obj.id > max ? obj.id : max), Number.MIN_VALUE);
                setId(id+1);
                const ref_no: any = `CUS${generate12DigitNumber(id+1)}`;
                setRefNo(ref_no);
            }
        }).catch((err: any) => {
            console.log(err, 'error')
        })
    }

    // Define the initial form values
    const initialValues: FormValues = {
        type: '',
        reference: '',
        customer_number: '',
        customer_name: '',
        customer_address: '',
        phone_number: '',
        transfer_amount: '',
        transfer_currency: '',
        bank: '',
        acc_number: '',
        payment_details: '',
        card_details: '',
        region: ''
    };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    customer_number: Yup.string()
    .matches(/^[0-9]+$/, 'Please enter only numbers')
    .required('Customer number is required'),
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
  });

  // Handle form submission
  const onSubmit = async (values: any, { resetForm }: any) => {
    values.id = id;
    values.reference = refNo;

    await axios.post('http://localhost:5000/transactions', values).then((res: any) => {
        if(res.status === 201) {
            toast.success("New bank transaction added successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
            generateRefNo();
            resetForm();
        }
    }).catch((err: any) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
    });
  };
  
  interface MyFormValues {
    option: string;
  }

  const setCustomerData = (value: any, setFieldValue: any) => {
    const existCustomer: any = transactionsData.find((val: any) => { return val.customer_number === value });
    if(existCustomer === undefined) {
        generateRefNo();
        setFieldValue('customer_name', "");
        setFieldValue('customer_address', "");
        setFieldValue('phone_number', "");
    } else {
        setFieldValue('customer_name', existCustomer?.customer_name);
        setFieldValue('customer_address', existCustomer?.customer_address);
        setFieldValue('phone_number', existCustomer?.phone_number);
        setRefNo(existCustomer?.reference);
        setFieldValue('reference', `Reference - ${existCustomer?.reference}`);
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} 
      enableReinitialize={true}>
    {(formik: any) => {
            return (
      <>
        <Typography variant="h6" className="mb-3">New Transaction Form</Typography>
        <div className="cus-form">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Type</label>
                        <Field label="Type" name="type" className="cus-input">
                            {({ field }: FieldProps<MyFormValues>) => (
                                <RadioGroup {...field} row>
                                    <FormControlLabel value="new" control={<Radio />} label="New" />
                                    <FormControlLabel value="exist" control={<Radio />} label="Exist" />
                                </RadioGroup>
                            )}
                        </Field>
                        <ErrorMessage name="type" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Reference</label>
                        <Field
                            type="text"
                            className="cus-input"
                            name="reference"
                            value={`Reference - ${refNo}`}
                            disabled
                        />
                        <ErrorMessage name="reference" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Customer Number</label>
                        <Field
                            placeholder="Customer Number"
                            type="text"
                            className="cus-input"
                            label="Customer Number"
                            name="customer_number"
                            onChange={(e: any) => {
                                const value = e.target.value;
                                formik.setFieldValue('customer_number', value);
                                if(formik.values.type === "exist") {
                                    setCustomerData(value, formik.setFieldValue);
                                }
                            }}
                            required
                        />
                        <ErrorMessage name="customer_number" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Customer Name</label>
                        <Field
                            placeholder="Customer Name"
                            type="text"
                            className="cus-input"
                            label="Customer Name"
                            name="customer_name"
                            required
                        />
                        <ErrorMessage name="customer_name" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Custmer Address</label>
                        <Field
                            placeholder="Customer Address"
                            as="textarea"
                            type="text"
                            className="cus-input cus-textarea"
                            label="Customer Address"
                            name="customer_address"
                            multiline="true"
                            rows={4}
                            required
                        />
                        <ErrorMessage name="customer_address" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Phone Number</label>
                        <Field
                            placeholder="Phone Number"
                            type="text"
                            className="cus-input"
                            label="Phone Number"
                            name="phone_number"
                            required
                        />
                        <ErrorMessage name="phone_number" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Transfer Amount</label>
                        <Field
                            placeholder="Transfer Amount"
                            type="text"
                            className="cus-input"
                            label="Transfer Amount"
                            name="transfer_amount"
                            required
                        />
                        <ErrorMessage name="transfer_amount" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Transfer Currency</label>
                        <Select
                            label="Transfer Currency"
                            name="transfer_currency"
                            className="cus-input cus-bor-n"
                            onChange={(e) => {
                                formik.setFieldValue(
                                    "transfer_currency",
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
                        <ErrorMessage name="transfer_currency" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Beneficiary Bank</label>
                        <Field
                            placeholder="Beneficiary Bank"
                            type="text"
                            className="cus-input"
                            label="Beneficiary Bank"
                            name="bank"
                            required
                        />
                        <ErrorMessage name="bank" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Beneficiary Account Number</label>
                        <Field
                            placeholder="Beneficiary Account Number"
                            type="text"
                            className="cus-input"
                            label="Beneficiary Account Number"
                            name="acc_number"
                            required
                        />
                        <ErrorMessage name="acc_number" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Payment Details</label>
                        <Field
                            placeholder="Payment Details"
                            type="text"
                            className="cus-input"
                            label="Payment Details"
                            name="payment_details"
                            required
                        />
                        <ErrorMessage name="payment_details" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Credit/ Debit Card</label>
                        <Field
                            placeholder="Credit/ Debit Card"
                            type="text"
                            className="cus-input"
                            label="Credit/Debit Card"
                            name="card_details"
                            required
                        />
                        <ErrorMessage name="card_details" component="div" className="error" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Region</label>
                        <Select
                            label="Region"
                            name="regoin"
                            className="cus-input cus-bor-n"
                            onChange={(e) => {
                                formik.setFieldValue(
                                    "region",
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
                        <ErrorMessage name="region" component="div" className="error" />
                    </div>
                    <div className="col-md-12 text-right mt-3">
                        <button className="btn bi-btn btn-submit" type="submit" onClick={formik.handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </>
    )}}
    </Formik>
  );
};

export default NewTransaction;
