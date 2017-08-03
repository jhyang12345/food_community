document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  autosize($("textarea"));

  $(".tagger").autoGrowInput({minWidth:10,comfortZone:3});

  $(".tagger").trigger("update");

  $(".tagger").last().on("keyup", function(evt) {
    taggerKeyup(evt);
  });

});

var keyCodes = [13, 32];

function taggerKeyup(evt) {
  var buffer = $(".tagger").last().val().trim(" ");
  var actual = $(".tagger").last().val();

  console.log(buffer);
  if(buffer.length > 0 && (buffer.length < actual.length || keyCodes.indexOf(evt.keyCode) >= 0)) {
    $(".tagger").last().val(buffer);
    $(".tags_holder").append('<input type="text" class="tagger" placeholder="#" spellcheck="false"></input>');
    $(".tagger").last().autoGrowInput({minWidth:10,comfortZone:3});
    $(".tagger").last().trigger("update");
    $(".tagger").last().focus();

    $(".tagger").last().on("keyup", function(evt) {
      taggerKeyup(evt);
    });
  }

}
