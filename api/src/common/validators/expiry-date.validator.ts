import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotExpired', async: false })
export class IsNotExpired implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const obj = args.object as any;

    const { expiryMonth, expiryYear } = obj;

    if (!expiryMonth || !expiryYear) return true;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const now = currentYear * 100 + currentMonth;
    const expiry = expiryYear * 100 + expiryMonth;

    return expiry >= now;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Card has expired';
  }
}
