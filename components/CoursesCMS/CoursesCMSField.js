import {
  Autocomplete,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ErrorMessage, Field, FieldArray } from "formik";
import React from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

const CoursesCMSField = (props) => {
  return (
    <div>
      {props.type === "text" ? (
        <div className="">
          <label htmlFor={props.name} className="text-gray-600 block mb-1">
            {props.placeholder} :
          </label>
          <Field
            name={props.name}
            placeholder={props.placeholder}
            className={`rounded-md pr-2 w-[300px] py-3 outline-none shadow-md bg-white border-gray-200 border border-l-8 ${
              props.formik.touched[props.name] &&
              props.formik.errors[props.name]
                ? "border-l-red-500"
                : " border-l-green-500"
            } text-lg`}
          ></Field>
          {props.formik.errors[props.name] &&
          props.formik.touched[props.name] ? (
            <span className="block text-red-500 mt-1">
              {props.formik.errors[props.name]}
            </span>
          ) : null}
        </div>
      ) : props.type === "number" ? (
        <div className="">
          <label htmlFor={props.name} className="text-gray-600 block mb-1">
            {props.placeholder} :
          </label>
          <Field
            name={props.name}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder={props.placeholder}
                className="rounded-md pr-2 w-[300px] py-3 outline-none shadow-md bg-white border-gray-200 border border-l-8 border-l-green-500 text-lg pl-2"
              />
            )}
          />
          {props.formik.errors[props.name] &&
          props.formik.touched[props.name] ? (
            <span className="block text-red-500 mt-1">
              {props.formik.errors[props.name]}
            </span>
          ) : null}
        </div>
      ) : props.type === "date" ? (
        <div className="">
          <label htmlFor={props.name} className="text-gray-600 block mb-1">
            {props.placeholder} :
          </label>
          <DatePicker
            onChange={(value) => {
              props.formik.setFieldValue(props.name, value?.format() || "");
            }}
            value={props.formik.finish}
            calendar={persian}
            locale={persian_fa}
            name="barthDate"
            containerClassName="w-full !h-12"
            inputClass="rounded-md pr-2 w-[300px] py-3 outline-none shadow-md bg-white border-gray-200 border border-l-8 border-l-green-500 text-lg pl-3"
            placeholder={props.placeholder}
          />
          {props.formik.errors[props.name] &&
          props.formik.touched[props.name] ? (
            <span className="block text-red-500 mt-1">
              {props.formik.errors[props.name]}
            </span>
          ) : null}
        </div>
      ) : props.type === "Autocomplete" ? (
        <div className="">
          <label htmlFor={props.name} className="text-gray-600 block mb-1">
            {props.placeholder} :
          </label>
          <Autocomplete
            options={props.options}
            disableClearable
            onFocus={() =>
              props.formik.setTouched({
                ...props.formik.touched,
                [props.name]: true,
              })
            }
            onChange={(e) =>
              props.formik.setFieldValue(props.name, e.target.innerText)
            }
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  {...params.inputProps}
                  type="text"
                  onChange={(e) =>
                    props.formik.setFieldValue(props.name, e.target.value)
                  }
                  placeholder={props.placeholder}
                  className={`rounded-md pr-2 w-[300px] py-3 outline-none shadow-md bg-white border-gray-200 border border-l-8 ${
                    props.formik.errors[props.name] &&
                    props.formik.touched[props.name]
                      ? "border-l-red-500"
                      : "border-l-green-500"
                  } text-lg pl-3`}
                  value={props.formik.values[props.name]}
                />
              </div>
            )}
          ></Autocomplete>
          {props.formik.errors[props.name] &&
          props.formik.touched[props.name] ? (
            <span className="block text-red-500 mt-1">
              {props.formik.errors[props.name]}
            </span>
          ) : null}
        </div>
      ) : props.type === "option" ? (
        <div className="w-[300px]">
          <label htmlFor={props.name} className="text-gray-600 block mb-1">
            {props.placeholder} :
          </label>
          <Field
            as="select"
            name={props.name}
            className="rounded-md pr-2 w-[300px] py-3 outline-none shadow-md bg-white border-gray-200 border border-l-8 border-l-green-500 text-lg pl-2"
            placeholder={props.placeholder}
          >
            {props.options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </Field>
        </div>
      ) : props.type === "textArea" ? (
        <div className="">
          <label htmlFor={props.name} className="text-gray-600 block mb-1">
            {props.placeholder} :
          </label>
          <Field
            as={"textarea"}
            placeholder={props.placeholder}
            className="rounded-md pr-2 w-[300px] py-3 outline-none shadow-md bg-white border-gray-200 border border-l-8 border-l-green-500 text-lg"
            name={props.name}
          />
        </div>
      ) : (
        <div className="">
          <label
            htmlFor={props.name}
            className="text-gray-600 block mb-1 text-xl"
          >
            {props.placeholder} :
          </label>
          <FieldArray
            placeholder={props.placeholder}
            name={props.name}
            render={(arrayHelpers) => (
              <div className="w-full bg-gray-200 rounded-lg my-5 p-5">
                <div className="flex justify-start gap-14 flex-row flex-wrap">
                  {props.formik.values[props.name].map((item, index) => (
                    <div className="">
                      <Field
                        as={"textarea"}
                        cols="30"
                        rows="8"
                        className="rounded-md pt-1 pr-1 outline-none block mb-5"
                        name={`${props.name}.${index}.title`}
                        placeholder={props.placeholder}
                      />
                      {props.fields?.map((item) => (
                        <Field
                          key={item.id}
                          as={"textarea"}
                          cols="30"
                          rows="4"
                          className="rounded-md pt-1 pr-1 outline-none block"
                          name={`${props.name}.${index}.anser`}
                          placeholder={item.placeholder}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center gap-8 items-center mt-5">
                  <button
                    type="button"
                    className="py-1 px-4 rounded-md text-white bg-green-500"
                    onClick={() => {
                      arrayHelpers.push({ title: "" });
                    }}
                  >
                    اضافه کردن
                  </button>
                  <button
                    className="py-1 px-4 rounded-md text-white bg-red-500"
                    type="button"
                    onClick={() => arrayHelpers.pop()}
                  >
                    حذف
                  </button>
                </div>
                {props.formik.errors[props.name] &&
                props.formik.touched[props.name] ? (
                  <span className="block text-red-500 mt-1">
                    {props.formik.errors[props.name]}
                  </span>
                ) : null}
              </div>
            )}
          ></FieldArray>
        </div>
      )}
    </div>
  );
};

export default CoursesCMSField;
