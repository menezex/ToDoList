// Seleção de elementos
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const editForm = document.querySelector("#editForm");
const editInput = document.querySelector("#editInput");
const cancelEditBtn = document.querySelector("#cancelEditBtn");
const searchInput = document.querySelector("#searchInput");
const eraseBtn = document.querySelector("#eraseBtn");
const filterBtn = document.querySelector("#filterSelect");
let oldInputValue;

// Funções

//Função para adicionar tarefas
const saveTodo = (text) => {
  /* Aqui estamos criando a DIV com a class TODO que aonde vai ficar as tarerfas adicionadas*/
  const todo = document.createElement("div");
  todo.classList.add("todo");

  /* Texto da tarefa digitado no input recebido pela função e sendo acrescendo na DIV class='todo'*/
  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  /* Criação dos botões
  Sendo criado o botão e colocando sua class, o innerHtml está criando a linha de HTML dentro do Button e estão todos sendo acrescendos
  dentro da DIV todo criada*/
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finishTodo");
  doneBtn.innerHTML = "<i>Concluido</i>";
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("editTodo");
  editBtn.innerHTML = "<i>Editar</i>";
  todo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeTodo");
  removeBtn.innerHTML = "<i>X</i>";
  todo.appendChild(removeBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

/* Função de edição de tarefas 
Quando clicar no botão de editar, ele vai aparecer a tela de edição acrescendo a class hide e em seguida vai esconder
o Forma de acrescentar tarefa e a lista de tarefas*/
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    //Pegando o titulo do todo atual que está sendo mapeado
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

/*Metodo de pesquisa, aqui a função getSearched, está recebendo o valor digitado em search
Em seguida todos está recebendo todas as divs com class=todo, em seguida está passando por todos os h3 e acrescentando
um display flex neles, no if ele verifica que oq for diferente da search(input da pesquisa) ele vai transformar o display em none*/
const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

/*Metodo de filtro para ver todos, pendentes e concluidos */
const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  //Aqui está sendo puxado pelo switch o valor que está selecionado no filtro
  switch (filterValue) {
    //Quando estiver Todos/all, toda propriedade vai ficar flex e disponivel para visualizar
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    /*Quando o filtro estiver para Concluidos/done, ele vai verificar dentro das divs se estão com a class done
    e oq tiver vai ficar com o display flex e oq não tiver fica como none*/
    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    /*Quando o filtro estiver para o Pendentes/todo, ele vai verificar dentro das divs os valores que não contém a palavra done 
    na classe, os valores que não tiverem, vão ter o seu display como flex e os que tiverem ficaram como none*/
    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    default:
      break;
  }
};

/*--------------------------------------------------------------------------------- */

// Eventos
/* Evento que faz o envio do formulario sem recarregar a pagina
atraves do preventDefault, te a variavel inputValue, que pega o valor digitado, o if verifica se ele é positivo e chama a função saveTodo*/
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue);
  }
});

/* Evento de click para identificar o elemento(button) que foi clicado, pela função (e)target
e ai vai ser verificado a class pelo IF*/
document.addEventListener("click", (e) => {
  const targetEl = e.target;
  //Pegando o elemento pai, que seria a div mais proxima que será a todo
  const parentEl = targetEl.closest("div");

  /*Variavel do titulo da tarefa digitada, mas antes vai ser verificado no If se ela é verdadeira e se o elemento dela é h3
  Depois disso, a variavel vai receber o seu valor*/
  let todoTitle;
  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finishTodo")) {
    /* Aqui estamos acrescendo o DONE na class da DIV pai mais proxima
    para assim o CSS riscar ela quando concluido, e o metodo toggle ele verifica, se tem done na class ele remove
    , se não tiver ele acrescenta*/
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("editTodo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }

  if (targetEl.classList.contains("removeTodo")) {
    parentEl.remove();
  }
});

/*Botão de cancelar dentro da tela edit, preventDafault para não recarregar a pagina e refaz a função do toggleForms para mostrar
novamente os formularios escondidos*/
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

/*Botão dentro do forms de editar, para concluir a edição de uma tarefa */
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Variavel para pegar o editInputValue do formulario de edit e chamando a função de updateTodo(passando o valor)
  const editInputValue = editInput.value;
  if (editInputValue) {
    updateTodo(editInputValue);
  }

  //Evento para voltar ao normal o formulario depois de editar
  toggleForms();
});

//Evento de pesquisa, aqui o evento keyup sempre é acionado quando uma tecla é digitada e seu valor é pego pelo target.value
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchedTodos(search);
});

/*Botão de Limpar, aqui o evento de clica não deixa a pagina dar um submite, ele deixa vazio o valor de searchInput
em seguida dispara o evento keyup*/
eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchInput.focus();

  searchInput.dispatchEvent(new Event("keyup"));
});

/*Botão de filtro do select, aqui está sendo verificado qual valor que está ficando selecionado*/
filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterTodos(filterValue);
});
