"use strict";
window.onload = () => {
  //Selection des élements
  const newTodoInput = document.querySelector(".new-todo");
  const todoList = document.querySelector(".todo-list");
  const btnDelete = document.querySelectorAll(".destroy");
  const checkbox = document.querySelectorAll(".toggle");

  //Fonctions
  let addItem = (item) => {
    const newLi = document.createElement("li");
    newLi.classList.add("listItem");
    newLi.classList.add("cache");
    newLi.innerHTML = `  
        <input class="toggle" type="checkbox" />
        <label>${item.value}</label>
        <button class="destroy"></button>
     `;

    //On insère le newLi au début de la todoList avec un slideDown
    todoList.prepend(newLi);
    setTimeout(function () {
      newLi.classList.remove("cache");
    });
    //Vider le champ de texte
    item.value = "";
  };

  //   // Suppression d'un élément
  //   for (const btn of btnDelete) {
  //     btn.addEventListener("click", () => {
  //       btn.parentElement.remove();
  //     });
  //   }

  // //  Texte barré quand checkbox coché
  //   for (const check of checkbox) {
  //     check.addEventListener("click", () => {
  //       check.parentElement.classList.toggle("completed");
  //     });
  //   }

  //Capture des évènements
  newTodoInput.addEventListener("keyup", function (e) {
    // if (e.key == "Enter") {
    //   alert(this.value);
    // }
    if (e.key === "Enter") {
      addItem(newTodoInput);
    }
  });
};
