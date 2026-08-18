let url = "https://catfact.ninja/fact";
let btn = document.querySelector("button");
let p = document.querySelector("#answer");
btn.addEventListener("click", async () => {
  p.innerText = "Loading...";
  let fact = await getFacts();
  p.innerText = fact;
});
async function getFacts() {
  try {
    let res = await axios.get(url);
    return res.data.fact;
  } catch (e) {
    console.log("error", e);
    return "SOMETHING WENT WRONG! see LOGS";
  }
}
getFacts().then((fact) => {
  p.innerText = fact;
});
