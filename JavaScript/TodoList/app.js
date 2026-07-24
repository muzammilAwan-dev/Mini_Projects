let addBtn = document.querySelector("button");
let inp = document.querySelector("input");
let uList = document.querySelector("ul");

function addItem() {
  if (inp.value.trim() === "") {
    return;
  }
  let listItem = document.createElement("li");
  let taskText = document.createElement("span");
  taskText.innerText = inp.value + " ";
  let delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  
  listItem.appendChild(checkBox);
  listItem.appendChild(taskText);
  listItem.appendChild(delBtn);
  uList.appendChild(listItem);
  inp.value = "";
}

inp.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    addItem();
  }
});

addBtn.addEventListener("click", addItem);

/* 
  =============================================================
  EVENT DELEGATION (Using Event Bubbling)
  =============================================================
  Instead of putting a separate click listener on every single ❌ button, 
  we put ONE click listener on the parent <ul> element (`uList`).
*/
uList.addEventListener("click", function (event) {
  /* 
    When any button inside the list is clicked, the click event "bubbles up" 
    to the parent <ul>. `event.target` is the exact item that was clicked.
    
    We check if the clicked item is a "BUTTON". (Always written in CAPITAL letters)
  */
  if (event.target.nodeName == "BUTTON") {
    let parent = event.target.parentElement;
    parent.remove();
  }
  if (event.target.nodeName == "INPUT") {
    let parent = event.target.parentElement;
    let textElement = parent.querySelector("span");
    if (event.target.checked) {
      textElement.style.textDecoration = "line-through";
      textElement.style.opacity = "0.5";
    } else {
      textElement.style.textDecoration = "none";
      textElement.style.opacity = "1";
    }
  }
});