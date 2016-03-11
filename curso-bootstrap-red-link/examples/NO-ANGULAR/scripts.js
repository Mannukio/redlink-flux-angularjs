$("#loginBtn").click(function(){
  $("#formLogin").submit();
})

$("#lblMensajes").click(function(){
  $('#tabContenido a[href="#BEN"]').tab('show');
  $('#lblMensajes').button('toggle')

})

$("#wrongLogin").click(function(){
  $("#alertLogin").show();
})

$(".breadcrumb a:enabled").click(function(){
  $('#generalModal .modal-content').text("Ud tiene cambios sin guardar, desea continuar?")
  $('#generalModal').modal({
  keyboard: false
}).show();
})


$('#tabContenido a[href="#BEN"]').on('shown.bs.tab', function (e) {
  //e.target // newly activated tab
  //e.relatedTarget // previous active tab
    $('#lblMensajes').hide(2000);

})
