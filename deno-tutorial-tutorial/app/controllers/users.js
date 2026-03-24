import { login } from "../auth.js";
import { createUser } from "../models/users.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { db } from "../db.js";
import { registrationFormView } from "../views/auth.js";
import { logout } from "../auth.js";


export function registrationFormController(ctx) { 
    const { errors } = ctx;
    return render(registrationFormView, { errors }, ctx);
}

export async function addUserController(ctx, next) {
    const { isValid, validated, headers } = ctx;
    if (!isValid) return next(ctx);
    await createUser(validated);
    console.log("Created user");    
    login(headers, validated.username);
    return redirect(headers, "/", `user '${validated.username}' created`)    
}



export function deleteUserController(ctx) {
    const { session, headers } = ctx;

    db.prepare("DELETE FROM sessions WHERE username = :username")
      .run({ username: session.username });

    db.prepare("DELETE FROM users WHERE username = :username")
      .run({ username: session.username });

    logout(headers, session.id);

    return redirect(headers, "/", "account deleted");
}