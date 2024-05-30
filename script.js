document.querySelector('#push').onclick = function (){
    if (document.querySelector('#newTask input').value.length == 0){
        alert("Ingrese la tarea de nuevo");
    }
}