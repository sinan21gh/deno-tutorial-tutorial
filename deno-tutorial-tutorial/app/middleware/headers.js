export function withHeaders(ctx, next) {
    console.log("Creating headers");    
    ctx.headers = new Headers();
    return next(ctx);
}