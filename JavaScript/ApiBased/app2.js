let url = "https://icanhazdadjoke.com/";
let btn = document.querySelector("button");
let p = document.querySelector("#answer");
btn.addEventListener("click", async () => {
  p.innerText = "Loading...";
  let joke = await getJoke();
  p.innerText = joke;
});
async function getJoke() {
  try {
    const config = { headers: { Accept: "application/json" } };
    let res = await axios.get(url, config);
    return res.data.joke;
  } catch (e) {
    console.log("error", e);
    return "SOMETHING WENT WRONG! see LOGS";
  }
}
getJoke().then((joke) => {
  p.innerText = joke;
});
