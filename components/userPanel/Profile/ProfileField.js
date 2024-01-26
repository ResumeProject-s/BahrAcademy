import React from "react";
import { ErrorMessage, Field } from "formik";
import { useFormikContext } from "formik";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ProfileField = (props) => {
  const { setFieldValue, errors } = useFormikContext();
  const formik = useFormikContext();
  return (
    <div className="w-full">
      {props.type === "text" ? (
        <div>
          <Field
            type="text"
            className={`rounded-md h-[50px] shadow-md pr-5 ${
              !props.disabled ? " border-l-8" : "border-none"
            } ${
              errors[props.name]
                ? "border-red-500"
                : "border-green-400 dark:border-green-500"
            } outline-none text-gray-700 w-full mb-3`}
            placeholder={props.placeholder}
            name={props.name}
            disabled={props.disabled}
          />
          <ErrorMessage
            name={props.name}
            component={"span"}
            className="text-red-500"
          ></ErrorMessage>
        </div>
      ) : props.type === "date" ? (
        <div>
          <DatePicker
            onChange={(event) => {
              setFieldValue("barthDate", event.format());
            }}
            value={formik.values[props.name]}
            calendar={persian}
            locale={persian_fa}
            containerClassName="w-full"
            inputClass={`rounded-md h-[50px] shadow-md pr-5 ${
              !props.disabled ? "border-l-8" : "border-none"
            } ${
              errors[props.name]
                ? "border-red-500"
                : "border-green-400 dark:border-green-500"
            } outline-none text-gray-700 w-full mb-3`}
            placeholder="تاریخ تولد"
          />

          <ErrorMessage
            name={props.name}
            component={"span"}
            className="text-red-500"
          ></ErrorMessage>
        </div>
      ) : props.type === "option" ? (
        <div>
          <Field
            name={props.name}
            as="select"
            className={`rounded-md h-[50px] shadow-md pr-5 bg-white  ${
              !props.disabled ? " border-l-8" : "border-none"
            } ${
              errors[props.name]
                ? "border-red-500"
                : "border-green-400 dark:border-green-500"
            } outline-none text-gray-700 w-full mb-3`}
          >
            {props.options.map((option) => (
              <>
                <option value={option.value}>{option.title}</option>
              </>
            ))}
          </Field>
          <ErrorMessage
            name={props.name}
            component={"span"}
            className="text-red-500"
          ></ErrorMessage>
        </div>
      ) : props.type === "textArea" ? (
        <>
          <div>
            <Field
              name={props.name}
              as="textarea"
              className={`rounded-md h-[50px] shadow-md pr-5 bg-white pt-3 ${
                !props.disabled ? " border-l-8" : "border-none"
              } ${
                errors[props.name]
                  ? "border-red-500"
                  : "border-green-400 dark:border-green-500"
              } outline-none text-gray-700 w-full mb-3`}
              placeholder={props.placeholder}
            ></Field>
            <ErrorMessage
              name={props.name}
              component={"span"}
              className="text-red-500"
            ></ErrorMessage>
          </div>
        </>
      ) : (
        <input
          id="profile"
          name="profile"
          type="file"
          className="rounded-md h-[50px] shadow-md pr-5 border-l-8 border-green-400 dark:border-green-500 outline-none text-gray-700 w-full invisible "
          onChange={(e) => {
            const selectedImage = e.target.files[0];
            const formData = new FormData();
            formData.append("image", selectedImage);

            const sendRequest = async () => {
              const request = await axios.post(
                "https://api.admin.sepehracademy.ir/api/upload/image",
                formData
              );
              setFieldValue("profile", request.data.result);
            };

            sendRequest();
          }}
        />
      )}
    </div>
  );
};

export default ProfileField;
