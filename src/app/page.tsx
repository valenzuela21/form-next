"use client";
import React from "react";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import Country from "./list"
import axios from "axios";

// Shape of form values
interface FormValues {
  fullName: string;
  country: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <div className="relative flex justify-center items-center p-8 w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <Form>
        <h1>{message}</h1>
        <div className="relative mt-4 mb-4 h-10 w-72 min-w-[200px]">
          <Field
            type="text"
            name="fullName"
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          />

          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Nombre Completo
          </label>
        </div>
        {touched.fullName && errors.fullName && (
          <div className="font-regular relative mt-3 mb-3 text-sm block w-72 rounded-sm bg-red-500 p-2 leading-2 text-white opacity-100">
            {errors.fullName}
          </div>
        )}

        <div className="relative mt-4 mb-4 h-10 w-72 min-w-[200px]">
          <Field
            as="select"
            name="country"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option value="">Seleccione la ciudad</option>
            {Country.map((item, index )=> <option key={`item-${index}`} value={item.id} >{item.title}</option>)}
          </Field>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Ciudad
          </label>
        </div>

        {touched.country && errors.country && (
          <div className="font-regular text-sm relative mt-3 mb-3 block w-72 rounded-sm bg-red-500 p-2 leading-2 text-white opacity-100">
            {errors.country}
          </div>
        )}

        <button
          disabled={isSubmitting}
          className="mt-6 block w-72 select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          data-ripple-light="true"
        >
          Enviar
        </button>
      </Form>
    </div>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      fullName: "",
      country: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.fullName) {
      errors.fullName = "Este input full name es requerido";
    }
    if (!values.country) {
      errors.country = "Este input country es requerido";
    }
    return errors;
  },

  handleSubmit: async (values, actions) => {
    // do submitting things
    const { fullName, country } = values;

    await axios.post(`${process.env.NEXT_PUBLIC_URL}/user`, {
      fullName,
      country,
    });

    alert("Nuevo Usuario Ingresado...");
    actions.resetForm();
  },
})(InnerForm);

export default function Home() {
  return (
    <div className="relative flex justify-center items-center">
      <div>
        <h2 className="block font-sans text-center text-4xl font-semibold leading-[1.3] tracking-normal text-inherit antialiased">
          ¡Bienvenido!
        </h2>
        <p className="block font-sans text-center text-sm font-light leading-normal text-inherit antialiased mb-4">
          Ingresa los datos personales para poderte ayudar.
        </p>
        <MyForm message="Formulario de Registro" />
      </div>
    </div>
  );
}
