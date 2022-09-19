import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import { http } from "../config/http-client";
import { CreateUserForm } from "../templates/create-user-form";
import { AxiosResponse } from "axios";

export const httpMock = http as jest.Mocked<typeof http>;

const renderUserForm = () => {
  const { container } = render(<CreateUserForm setUser={() => null} />);
  const firstNameInput = getByName(container, "firstName");
  const lastNameInput = getByName(container, "lastName");
  const emailInput = getByName(container, "email");
  const dateOfBirthInput = getByName(container, "dateOfBirth");

  return {
    firstNameInput,
    firstNameInputError: () => firstNameInput.nextSibling,
    lastNameInput,
    emailInput,
    dateOfBirthInput,
  };
};

const getByName = (container: HTMLElement, name: string) =>
  container.querySelector<HTMLInputElement>(`[name="${name}"]`)!;

describe("User form tests", () => {
  test("Show errors when required fields are empty", async () => {
    const { firstNameInput, firstNameInputError } = renderUserForm();
    expect(firstNameInput.value).toBe("");
    expect(firstNameInputError()).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.submit(screen.getByTestId("user-form"));
    });

    expect(firstNameInputError()).toBeInTheDocument();
    expect(firstNameInputError()).toHaveClass("error");
  });

  test("Remove error when field with incorrect value is updated with correct value", async () => {
    const { firstNameInput, firstNameInputError } = renderUserForm();

    await act(async () => {
      await fireEvent.submit(screen.getByTestId("user-form"));
    });

    expect(firstNameInputError()).toBeInTheDocument();

    await act(async () => {
      await fireEvent.submit(screen.getByTestId("user-form"));

      fireEvent.input(firstNameInput, {
        target: {
          value: "John",
        },
      });
    });

    expect(firstNameInput.value).toBe("John");
    expect(firstNameInputError()).not.toBeInTheDocument();
  });

  test("Submit form only once using correct data", async () => {
    const { firstNameInput, lastNameInput, emailInput, dateOfBirthInput } = renderUserForm();

    const requestBody = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      dateOfBirth: "2000-12-11",
    };

    fireEvent.input(firstNameInput, {
      target: {
        value: requestBody.firstName,
      },
    });

    fireEvent.input(lastNameInput, {
      target: {
        value: requestBody.lastName,
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: requestBody.email,
      },
    });

    fireEvent.input(dateOfBirthInput, {
      target: {
        value: "2000-11-12",
      },
    });

    httpMock.post.mockResolvedValueOnce({} as AxiosResponse<unknown, any>);

    await act(async () => {
      await fireEvent.submit(screen.getByTestId("user-form"));
    });

    expect(http.post).toHaveBeenCalledTimes(1);
    expect(http.post).toHaveBeenCalledWith("/user", requestBody);
  });
});
