import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundController } from "./controllers/notFound.js";
import { addSessionController, deleteSessionController, loginFormController } from "./controllers/sessions.js";
import { staticController } from "./controllers/static.js";
import { deleteUserController } from "./controllers/users.js";
import { addUserController, registrationFormController} from "./controllers/users.js";
import { excludesSession, requiresSession, withSession } from "./middleware/auth.js";
import { withHeaders } from "./middleware/headers.js";
import { withLogs } from "./middleware/logging.js";
import { validate } from "./middleware/validate.js";
import ApplicationRouter from "./router.js";
import { newItemSchema } from "./schema/newItem.js";
import { userSchema } from "./schema/user.js";

const app = new ApplicationRouter();

app.use(withLogs);
app.use(withHeaders);
app.use(withSession);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/items", itemsController, requiresSession);
app.post("/items", itemsController, requiresSession, validate(newItemSchema), addItemController);
app.get("/register", registrationFormController, excludesSession);
app.post("/register", registrationFormController, excludesSession, validate(userSchema), addUserController);
app.get("/login", loginFormController, excludesSession);
app.post("/login", loginFormController, excludesSession, validate(userSchema), addSessionController);
app.post("/logout", deleteSessionController, requiresSession);
app.post("/delete-account", deleteUserController, requiresSession);
app.get("*", notFoundController);
app.post("*", notFoundController);


export default function server(request) {
    return app.handle({ request });
}
