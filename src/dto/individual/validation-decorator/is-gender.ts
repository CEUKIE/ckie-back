import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isGender', async: false })
export class IsGender implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return (
      value.toUpperCase() === 'MALE' ||
      value.toUpperCase() === 'FEMALE' ||
      value.toUpperCase() === 'LESS'
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `Text ${args.value} is not gender type`;
  }
}
