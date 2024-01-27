function openModal(modalId) {
    $("#" + modalId).show();
    $("#overlay").show();
}

function closeModal(modalId) {
    $("#" + modalId).hide();
    $("#overlay").hide();
}