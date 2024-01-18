import { IsNotEmpty, IsString } from "class-validator"
import { IsUnique } from "custom_validator/isUnique/is-unique";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @IsUnique({tableName: 'tag', column: 'name'})
    name: string;

}