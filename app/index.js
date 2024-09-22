// import 'dotenv/config'

// import choo
import choo from "choo";
import html from "choo/html";

// initialize choo
const app = choo({ hash: true });

import store from "./stores/store.js";
app.use(store);

app.route("/*", notFound);

function notFound() {
  return html`
    <div>
      <a href="/"> 404 with love ❤ back to top! </a>
    </div>
  `;
}

// import a template
import main from "./views/main.js";

app.route("/", main);

// start app
app.mount("#choomount");
