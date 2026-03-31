import FormInput from "@components/FormInput";
import { type RegistrationFormSchemaProps } from "@validation/registrationForm";
import { useFormContext } from "react-hook-form";

const AddressInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormSchemaProps>();

  return (
    <>
      <fieldset>
        <legend>Shipping Address</legend>

        <FormInput
          label="Street"
          fullWidth
          margin="normal"
          {...register("shippingAddress.street")}
          error={!!errors.shippingAddress?.street}
          helperText={errors.shippingAddress?.street?.message}
        />

        <FormInput
          label="City"
          fullWidth
          margin="normal"
          {...register("shippingAddress.city")}
          error={!!errors.shippingAddress?.city}
          helperText={errors.shippingAddress?.city?.message}
        />

        <FormInput
          label="Country"
          fullWidth
          margin="normal"
          {...register("shippingAddress.country")}
          error={!!errors.shippingAddress?.country}
          helperText={errors.shippingAddress?.country?.message}
        />

        <FormInput
          label="Zip Code"
          fullWidth
          margin="normal"
          {...register("shippingAddress.zipCode")}
          error={!!errors.shippingAddress?.zipCode}
          helperText={errors.shippingAddress?.zipCode?.message}
        />

        <FormInput
          label="Adress Type"
          fullWidth
          margin="normal"
          {...register("shippingAddress.type")}
          error={!!errors.shippingAddress?.type}
          helperText={errors.shippingAddress?.type?.message}
        />
      </fieldset>

      <fieldset>
        <legend>Billing Address</legend>

        <FormInput
          label="Street"
          fullWidth
          margin="normal"
          {...register("billingAddress.street")}
          error={!!errors.billingAddress?.street}
          helperText={errors.billingAddress?.street?.message}
        />

        <FormInput
          label="City"
          fullWidth
          margin="normal"
          {...register("billingAddress.city")}
          error={!!errors.billingAddress?.city}
          helperText={errors.billingAddress?.city?.message}
        />

        <FormInput
          label="Country"
          fullWidth
          margin="normal"
          {...register("billingAddress.country")}
          error={!!errors.billingAddress?.country}
          helperText={errors.billingAddress?.country?.message}
        />

        <FormInput
          label="Zip Code"
          fullWidth
          margin="normal"
          {...register("billingAddress.zipCode")}
          error={!!errors.billingAddress?.zipCode}
          helperText={errors.billingAddress?.zipCode?.message}
        />

        <FormInput
          label="Adress Type"
          fullWidth
          margin="normal"
          {...register("billingAddress.type")}
          error={!!errors.billingAddress?.type}
          helperText={errors.billingAddress?.type?.message}
        />
      </fieldset>
    </>
  );
};

export default AddressInformation;
