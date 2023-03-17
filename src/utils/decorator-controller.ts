import {applyDecorators, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiQuery, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";

export function FindQuery() {
    return applyDecorators(
        ApiQuery({
            name: 'page',
            required: false
        }),
        ApiQuery({
            name: 'limit',
            required: false,
        }),
    )
}

export function Auth() {
    return applyDecorators(
        ApiBearerAuth(),
        UseGuards(AccessTokenGuard),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    )
}
