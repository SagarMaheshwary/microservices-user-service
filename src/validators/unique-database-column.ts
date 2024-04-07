import { Inject } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { DATA_SOURCE } from "../constants/database";
import { DataSource } from "typeorm";

/**
 * Params:
 * - TypeORM Entity,
 * - Column to check for uniqueness (if not provided then property name will be used)
 *
 * Usage instructions:
 * - Set class-validator to use Nest container that allows dependency injection by using
 *   useContainer from class-validator in main.ts
 * - Import this class to providers array of the controller module and also import
 *   DatabaseModule in that module to allow injection of TypeORM connection.
 * - Add @Validate(UniqueDatabase, [User, 'email']) to a DTO class property.
 */
@ValidatorConstraint({
  name: "UniqueDatabaseColumn",
  async: true,
})
export class UniqueDatabaseColumn implements ValidatorConstraintInterface {
  constructor(@Inject(DATA_SOURCE) private readonly connection: DataSource) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!value) {
      return true; //Fail validation if property does not have any value.
    }

    const entityClass = validationArguments.constraints[0];
    const column =
      (validationArguments.constraints[1] as string) ||
      validationArguments.property;

    const entityRepository = this.connection.getRepository(entityClass);

    const entity = await entityRepository.findOne({
      where: {
        [column]: value,
      },
      select: [column],
    });

    return entity === null;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `The ${validationArguments.property} should be unique.`;
  }
}
