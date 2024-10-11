import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";

export const customValidationPipe: ValidationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
            validationErrors.map((error: any) => ({
                field: error.property,
                error: Object.values(error.constraints).join(', '),
            })),
        );
    },
})