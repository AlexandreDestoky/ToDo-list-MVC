"use strict";
window.onload = () => {
  //Selection des élements
  const newTodoInput = document.querySelector(".new-todo");
  const todoList = document.querySelector(".todo-list");
  //   const btnDelete = document.querySelectorAll(".destroy");
  const todoCountElt = document.querySelector("#todo-count");

  //Fonctions

  //Ajout d'un item
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

    //On compte le nombre d'éléments qui ne sont pas complétés
    displayNotCompleted();
    activerCheckBox();
  };

  //On compte le nombre d'éléments qui ne sont pas complétés
  let displayNotCompleted = () => {
    todoCountElt.innerText = todoList.querySelectorAll(
      "li:not(.completed)"
    ).length;
  };

  let toggleItem = (item) => {
    item.parentElement.classList.toggle("completed");
    displayNotCompleted();
  };

  //CAPTURE DES EVENEMENTS
  //   // Suppression d'un élément
  //   for (const btn of btnDelete) {
  //     btn.addEventListener("click", () => {
  //       btn.parentElement.remove();
  //     });
  //   }

  let activerCheckBox = () => {
    const toggleInputs = document.querySelectorAll(".toggle");
    //  Texte barré quand checkbox coché
    for (const check of toggleInputs) {
      check.onclick = () => {
        toggleItem(check);
      };
    }
  };

  //Capture des évènements
  newTodoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      addItem(newTodoInput);
    }
  });

  //lancement au chargement de la page
  displayNotCompleted();
  activerCheckBox();
};
