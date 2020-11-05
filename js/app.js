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
    activerItems();
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

  let editItem = (item) => {
    const value = item.querySelector("label").innerText;
    item.querySelector(
      "label"
    ).innerHTML = `<input type="text" value="${value}">`;
  };

  //CAPTURE DES EVENEMENTS
  //   // Suppression d'un élément
  //   for (const btn of btnDelete) {
  //     btn.addEventListener("click", () => {
  //       btn.parentElement.remove();
  //     });
  //   }

  //Capture des évènements

  //Quand on fait Enter dans l'input on ajout l'item
  newTodoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      addItem(newTodoInput);
    }
  });

  //Lorque l'on clique sur une chekcbox .toggle
  let activerCheckBox = () => {
    const toggleInputs = document.querySelectorAll(".toggle");
    //  Texte barré quand checkbox coché
    for (const check of toggleInputs) {
      check.onclick = () => {
        toggleItem(check);
      };
    }
  };

  let activerItems = () => {
    //lorsque l'on double clique sur un .listItem:not(.completed)
    const itemsNotCompleted = todoList.querySelectorAll(
      ".listItem:not(.completed)"
    );
    for (const itemNotCompleted of itemsNotCompleted) {
      itemNotCompleted.ondblclick = () => {
        editItem(itemNotCompleted);
      };
    }
  };

  //lancement au chargement de la page
  displayNotCompleted();
  activerCheckBox();
  activerItems();
};
