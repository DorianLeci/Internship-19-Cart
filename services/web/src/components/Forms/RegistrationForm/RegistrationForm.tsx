import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { AddressType } from "@cart-app/types";
import {
  RegistrationFormTypeEnum,
  registrationFormSchema,
} from "@validation/registrationForm";
import AddressInformation from "../AddressInformation";
import PaymentInformation from "../PaymentInformation";
import PersonalInformation from "../PersonalInformation";

const RegistrationForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      formType: RegistrationFormTypeEnum.PersonalInformation,
    },
  });

  const {
    watch,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const formType = watch("formType");
  const formTypeIsPersonalInformation =
    formType === RegistrationFormTypeEnum.PersonalInformation;
  const formTypeIsShippingAddress =
    formType === RegistrationFormTypeEnum.Address;
  const formTypeIsPaymentInformation =
    formType === RegistrationFormTypeEnum.PaymentInformation;

  function setFormType(formType: RegistrationFormTypeEnum) {
    formMethods.setValue("formType", formType);
  }

  function handleNextFormType() {
    switch (formType) {
      case RegistrationFormTypeEnum.PersonalInformation:
        setFormType(RegistrationFormTypeEnum.Address);
        formMethods.setValue("shippingAddress", {
          street: "",
          city: "",
          country: "",
          zipCode: "",
          type: AddressType.SHIPPING,
        });

        formMethods.setValue("billingAddress", {
          street: "",
          city: "",
          country: "",
          zipCode: "",
          type: AddressType.BILLING,
        });
        break;
      case RegistrationFormTypeEnum.Address:
        setFormType(RegistrationFormTypeEnum.PaymentInformation);
        break;
      case RegistrationFormTypeEnum.PaymentInformation:
        console.log("submit", getValues());
        break;
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleNextFormType)}>
        {formTypeIsPersonalInformation && <PersonalInformation />}
        {formTypeIsShippingAddress && <AddressInformation />}
        {formTypeIsPaymentInformation && <PaymentInformation />}

        <button type="submit">
          {formTypeIsPaymentInformation ? "Submit" : "Next"}
        </button>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
