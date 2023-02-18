import {applyDecorators} from "@nestjs/common";
import {ApiQuery} from "@nestjs/swagger";

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

