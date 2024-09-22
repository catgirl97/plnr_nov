export default async function (state, emitter) {
  state.search_keyword = "rickroll";
  state.urlsUpdated = false;
  async function searchGif(q) {
    try {
      state.giphy_search = "madoka";
      console.log(import.meta.env)
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?limit=20&api_key=${ "vCQzN9bjUCb42oAiufC8lgxV7CfkCYxa" }&q=${ q }`, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      state.urls = result.data.map(e=>e.images.downsized.url);
      state.urlsUpdated = true;
      console.log("Success:", state.urls);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  searchGif(state.search_keyword);
  
  emitter.on("search gif", e => {
    searchGif(e);
  })
}
