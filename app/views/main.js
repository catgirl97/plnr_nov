// import choo's template helper
import html from "choo/html";
import { css } from "@emotion/css";

import RenderElement from "../components/render.js";

const mainCss = css`
width: 100%;
height: 100vh;
overflow: hidden;

.control {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;
}

.credits {
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  a {
    color: white;
    font-weight: bold;
  }
  bottom: 0;
  left: 0;
  z-index: 2;
}

.p5 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;
}
`;

// export module
export default function(state, emit) {
  let msg = state.hover ? "hello beautiful people" : "hover over me"
  return html`
    <div class=${ mainCss }>
      <div class="p5">
        ${ state.cache(RenderElement, 'my-render').render() }
      </div>
      <div class="control">
        <div>
          <input class="input-name" type="text" value=${ state.search_keyword } onkeypress=${ onkeypress } />
        </div>
        <button onclick=${ searchPressed } type="button">
          SEARCH
        </button>
      </div>
      <div class="credits">
        Made by Naoto using <a href="https://developers.giphy.com/" target="_blank">Giphy API</a> and <a href="https://www.tetoki.eu/asciiart/" target="_blank">p5.js ASCII Art</a> lib
      </div>
    </div>
  `;
  
  function onkeypress(ev) {
    if (ev.key == "Enter") {
      const search_keyword = ev.target.parentElement.parentElement.querySelector("input.input-name").value;
      state.search_keyword = search_keyword;
      if (search_keyword.length > 0) {
        emit("search gif", search_keyword);
      }
    }
  }

  function searchPressed(ev) {
    const search_keyword = ev.target.parentElement.parentElement.querySelector("input.input-name").value;
    state.search_keyword = search_keyword;
    if (search_keyword.length > 0) {
      emit("search gif", search_keyword);
    }
  }
};
