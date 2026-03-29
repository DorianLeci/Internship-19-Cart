import { isNotExpired } from '@cart-app/types';
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
    return isNotExpired(expiryMonth, expiryYear);
  }
  defaultMessage(args: ValidationArguments) {
    return 'Card has expired';
  }
}
