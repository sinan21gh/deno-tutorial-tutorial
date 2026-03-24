import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data, ctx) { 
    const { request, session, headers, status = 200 } = ctx;
    const content = viewFn(data);
    const footerMessage = session
        ? `logged in as '${session.username}'` : '';
    const links = `
        ${session
        ? `
            <a href="/items">items</a>
            <form method="POST" action="/logout"><button>sign out</button></form>
            `
            : `<a href="/login">sign in</a>`}
    `

    const flash = getFlash(request.headers, headers);
    const flashMessage = flash ? `
    <aside id="flash">
        <p>${escape(flash)}</p>
    </aside>
    ` : '';
    headers.set("content-type", "text/html");
    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>My web application</title>
                <meta charset="utf-8">
                <link rel="icon" href="/assets/icon.svg">
                <link rel="stylesheet" href="/assets/styles.css">
            </head>
            <body>
                <header>
                    <h1>My web application</h1>
                    <nav>
                        <a href="/">home</a>
                        ${links}
                    </nav>
                </header>
                <form method="POST" action="/delete-account">
                    <button>delete account</button>
                </form>
                <main>
                ${flashMessage}
                ${content}
                </main>
                <footer>
                    <p>${footerMessage}</p>
                    <p>&copy; application developers</p>
                </footer>
            </body>
        </html>
    `
    return new Response(html, { headers, status });
}
