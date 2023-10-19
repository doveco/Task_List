document.getElementById("button").addEventListener("click", adicionarTarefa);

if (localStorage.getItem("tarefa")) {
    tarefa = JSON.parse(localStorage.getItem("tarefa")); 
} else {tarefa = [];}

function adicionarTarefa() {
    var input = document.getElementById("input");
    var novaTarefa = input.value.trim();

    if (novaTarefa !== "") {

        var objetoTarefa = {
            tarefa: novaTarefa,
            concluido: false
        }

        tarefa.push(objetoTarefa);
        localStorage.setItem("tarefa", JSON.stringify(tarefa));

        var novoItem = document.createElement("li");
        novoItem.textContent = novaTarefa;

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            var editedTask = prompt("Edit the task:", novaTarefa);
            if (editedTask !== null) {
                novaTarefa = editedTask;
                objetoTarefa.tarefa = novaTarefa;
                novoItem.textContent = novaTarefa;

                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("checkbox");                            
                checkbox.addEventListener("change", function () {
                    if (this.checked) {
                        novoItem.style.textDecoration = "line-through";
                    } else {
                        novoItem.style.textDecoration = "none";
                    }
                });

                var removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.addEventListener("click", function () {
                    var index = tarefa.indexOf(objetoTarefa);
                    if (index !== -1) {
                        tarefa.splice(index, 1);
                        novoItem.remove();
                        localStorage.setItem("tarefa", JSON.stringify(tarefa));
                    }
                });

                novoItem.appendChild(checkbox);
                novoItem.appendChild(removeButton);
                novoItem.appendChild(editButton);
            }
        });

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                novoItem.style.textDecoration = "line-through";
            } else {
                novoItem.style.textDecoration = "none";
            }
        });

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            var index = tarefa.indexOf(objetoTarefa);
            if (index !== -1) {
                tarefa.splice(index, 1);
                novoItem.remove();
            }
        });

        novoItem.appendChild(checkbox);
        novoItem.appendChild(removeButton);
        novoItem.appendChild(editButton);

        var listaTarefas = document.getElementById("listaTarefas");
        listaTarefas.appendChild(novoItem);

        console.log(tarefa);
        input.value = "";
    } else {
        alert("Por favor adicione uma tarefa.");
    }
}

console.log(JSON.parse(localStorage.getItem("tarefa")));
