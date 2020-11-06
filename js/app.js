"use strict";
window.onload = () => {
  //Selection des élements
  const newTodoInput = document.querySelector(".new-todo");
  const todoList = document.querySelector(".todo-list");
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
    activerDeleteBtns();
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
    const value = item.innerText;
    item.innerHTML = `<input type="text" value="${value}" class="editInput"  />`;
    item.focus();
    activerInputs();
  };

  let updateItem = (item) => {
    const value = item.value;
    item.parentElement.innerHTML = value;
  };

  //suppresion avec slidedown
  let deleteItem = (item) => {
    item.parentElement.classList.add("cache");
    setTimeout(() => {
      item.parentElement.remove();
      displayNotCompleted();
    }, 300);
  };

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

  //lorsque l'on double clique sur un label qui est dans un .listItem:not(.completed)
  let activerItems = () => {
    const itemsNotCompleted = todoList.querySelectorAll(
      ".listItem:not(.completed) label"
    );
    for (const itemNotCompleted of itemsNotCompleted) {
      itemNotCompleted.ondblclick = () => {
        editItem(itemNotCompleted);
      };
    }
  };

  //Lorsque je tape "Enter" dans un input.edit
  let activerInputs = () => {
    const editInputs = document.querySelectorAll(".editInput");
    for (const editInput of editInputs) {
      editInput.onkeyup = (e) => {
        if (e.key === "Enter") {
          updateItem(editInput);
        }
      };
      editInput.onblur = () => {
        updateItem(editInput);
      };
    }
  };

  let activerDeleteBtns = () => {
    // lorsque l'on clique sur un bouton .destroy
    const deleteBtns = document.querySelectorAll(".destroy");
    // Suppression d'un élément
    for (const deleteBtn of deleteBtns) {
      deleteBtn.onclick = () => {
        deleteItem(deleteBtn);
      };
    }
  };

  //lancement au chargement de la page
  displayNotCompleted();
  activerCheckBox();
  activerItems();
  activerDeleteBtns();
};
