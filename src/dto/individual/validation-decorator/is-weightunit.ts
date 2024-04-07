import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isGender', async: false })
export class IsWeightUnit implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return value.toUpperCase() === 'G' || value.toUpperCase() === 'KG';
  }

  defaultMessage(args: ValidationArguments): string {
    return `Text ${args.value} is not gender type`;
  }
}
