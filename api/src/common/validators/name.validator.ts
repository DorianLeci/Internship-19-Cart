import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidName(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isValidName',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
          return typeof value === 'string' && nameRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} can contain only letters, spaces, apostrophes, or hyphens`;
        },
      },
    });
  };
}
