let url = "http://universities.hipolabs.com/search?name=";
let input = document.querySelector("input");
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let name = input.value;
    let resultList = await Search(name);
    showResult(resultList);
});

function showResult(list) {
    input.value = "";
    let ul = document.querySelector("#List");
    ul.innerText = "";

    if (!list || list.length === 0) {
        let li = document.createElement("li");
        li.innerText = "No universities found.";
        ul.appendChild(li);
        return;
    }

    for (let arr of list) {
        let li = document.createElement("li");
        let htmlContent = `${arr.name} —  <b>Domain:</b> `;

        if (arr.domains && arr.domains.length > 0) {
            let domainLinks = arr.domains.map((domain) => {
                let fullUrl = domain.startsWith("http") ? domain : `https://${domain}`;
                return `<a href="${fullUrl}" target="_blank">${domain}</a>`;
            });
            htmlContent += domainLinks.join(", ");
        } else {
            htmlContent += "N/A";
        }

        li.innerHTML = htmlContent;
        ul.appendChild(li);
    }
}

async function Search(name) {
    try {
        const res = await axios.get(url + name);
        return res.data;
    } catch (e) {
        console.log("error", e);
        return [];
    }
}
