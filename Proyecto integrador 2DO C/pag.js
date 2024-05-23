document.getElementById('create').addEventListener('click', function() {
    createAction();
});

document.getElementById('update').addEventListener('click', function() {
    updateAction();
});

document.getElementById('delete').addEventListener('click', function() {
    deleteAction();
});

function getFormData() {
    return {
        description: document.getElementById('description').value,
        quantity: document.getElementById('quantity').value,
        category: document.getElementById('category').value,
        date: document.getElementById('date').value
    };
}

function addRow() {
    const formData = getFormData();
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const descriptionCell = newRow.insertCell(0);
    const quantityCell = newRow.insertCell(1);
    const categoryCell = newRow.insertCell(2);
    const dateCell = newRow.insertCell(3);

    descriptionCell.textContent = formData.description;
    quantityCell.textContent = formData.quantity;
    categoryCell.textContent = formData.category;
    dateCell.textContent = formData.date;

    clearForm();
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('category').value = '';
    document.getElementById('date').value = '';
}

function createAction() {
    addRow();
    alert('Registro creado exitosamente');
}

function updateAction() {
    // Implementación de actualización de una fila seleccionada
    alert('Función de actualización no implementada aún');
}

function deleteAction() {
    // Implementación de eliminación de una fila seleccionada
    alert('Función de eliminación no implementada aún');
}
