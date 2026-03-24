import { validateSchema } from "../validation.js";

export function validate(schema) {
    return async (ctx, next) => { 
        const { request } = ctx;
        const formData = await request.formData();        
        const validation = validateSchema(formData, schema);
        if (validation.isValid) {
            console.log("Validated OK");
        } else {
            ctx.status = 400;
            console.log("Validation Errors");
        }
        return next({...ctx, ...validation});
    };
}