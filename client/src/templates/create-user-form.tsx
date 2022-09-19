import { FC } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUserSchema } from "types/user-form.types";
import { Input, Button } from "ui";
import { createUserSchema } from "config/schema/user-form-schema";
import { createUserRequest } from "api/user-endpoint";

const TODAY = dayjs().format("YYYY-MM-DD");

export const CreateUserForm: FC<{ setUser: (user: CreateUserSchema) => void }> = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<CreateUserSchema>({
    resolver: yupResolver(createUserSchema),
  });

  const resetForm = () => {
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("email", "");
    setValue("dateOfBirth", null);
  };

  const createUser = async (form: CreateUserSchema) => {
    try {
      const user = {
        ...form,
        dateOfBirth: dayjs(form.dateOfBirth).format("YYYY-DD-MM"),
      };

      const response = await createUserRequest(user);
      const { data } = response;

      setUser(data);
      resetForm();
    } catch (error: any) {
      const { errors } = error.response.data;

      for (const [key, value] of Object.entries(errors)) {
        setError(key, {
          message: (value as any).msg,
        });
      }

      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(createUser)} data-testid="user-form">
      <div className="form-col">
        <Input {...register("firstName")} label="First name" error={errors?.firstName?.message} />
      </div>
      <div className="form-col">
        <Input {...register("lastName")} label="Last name" error={errors?.lastName?.message} />
      </div>
      <div className="form-col">
        <Input {...register("email")} label="E-mail" type="email" error={errors?.email?.message} />
      </div>
      <div className="form-col">
        <Input
          {...register("dateOfBirth")}
          label="Date of birth"
          type="date"
          max={TODAY}
          error={errors?.dateOfBirth?.message}
        />
      </div>

      <div className="form-footer">
        <Button variant="secondary" customClass="user-form__clear-button" type="reset" onClick={resetForm}>
          Clear
        </Button>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};
