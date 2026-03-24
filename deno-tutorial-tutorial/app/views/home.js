export function homeView({ session }) {

    const message = session
        ? `Welcome ${session.username}, this is your home page.`
        : "Welcome to the home page, sign in to get personalised content."

    return`
        <section aria-labelledby="home-heading">
            <h2 id="home-heading">Home page</h2>
            <p>${message}</p>
        </section>
    `
}