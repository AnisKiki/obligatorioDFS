const listaTareas = [
    {
        id: 1,
        title: "Tarea 1",
        completed: false, 
        userId: 1
    },
    {
        id: 2,
        title: "Tarea 2",
        completed: false, 
        userId: 1
    }
]

export const ObtenerListaTareas = () => {
    return listaTareas;
}
export const ObtenerUnaTarea = (idTarea) => {
    const tareaEncontrada = listaTareas.find(
        t => t.id === Number(idTarea)
    );
    console.log("Tarea encontrada :>", tareaEncontrada);
    return tareaEncontrada;
}
export const AgregarTarea = (tarea) => {
    let nuevoId = 1;
    const ultimaTarea = listaTareas.at(-1);
    if(ultimaTarea){
        nuevoId = ultimaTarea.id + 1;
    }
    tarea.id = nuevoId;
    listaTareas.push(tarea);
    return tarea;
};
export const EliminarTarea = (idTarea) => {
    listaTareas = listaTareas.filter(
        t => t.id !== idTarea
    );
}
export const OtraFormaEliminarTarea = (idTarea) => {
    const indiceTarea = listaTareas.findIndex(
        t => t.id === idTarea
    )
    if(indiceTarea >= 0){
        listaTareas.splice(indiceTarea, 1);
    } else{
        console.error(`No se encontró la tarea con id ${idTarea}`);
    }
}
export const ModificarTarea = (Tarea) => {
    /* const tareaEncontrada = listaTareas.find(
        t => t.id === Tarea.id
    );
    Object.assign(tareaEncontrada, Tarea); */

    const indiceTarea = listaTareas.findIndex(
        t => t.id === Tarea.id
    )
    listaTareas[indiceTarea] = {...listaTareas[indiceTarea], ...Tarea};
}