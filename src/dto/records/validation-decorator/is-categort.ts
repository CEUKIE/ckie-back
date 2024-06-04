import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCategory', async: false })
export class IsCategory implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return (
      value.toUpperCase() === 'FEEDING' ||
      value.toUpperCase() === 'WEIGHT' ||
      value.toUpperCase() === 'ECDYSIS' ||
      value.toUpperCase() === 'ETC'
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `Text ${args.value} is not record category type`;
  }
}
