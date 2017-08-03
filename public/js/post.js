document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  autosize($("textarea"));

  $(".tagger").autoGrowInput({minWidth:10,comfortZone:3});

  $(".tagger").trigger("update");

  $(".tagger").last().on("keyup", function(evt) {
    taggerKeyup(evt);
  });

  $(".tagger").on("keydown", function(evt) {
    taggerKeydown(evt);

  });
});

var keyCodes = [13, 32];

function taggerKeydown(evt) {
  console.log(evt.keyCode);
  if(keyCodes.indexOf(evt.keyCode) >= 0) {
    $(".post").append('<input type="text" class="tagger" placeholder="#" spellcheck="false"></input>');

    $(".tagger").autoGrowInput({minWidth:10,comfortZone:3});

    $(".tagger").trigger("update");

    $(".tagger").last().focus();

    $(".tagger").on("keydown", function(evt) {
      taggerKeydown(evt);
    });

    $(".tagger").last().on("keyup", function(evt) {
      taggerKeyup(evt);
    });
  }

}

function taggerKeyup(evt) {
  var buffer = $(".tagger").last().val().trim(" ");
  var actual = $(".tagger").last().val();
  console.log(buffer.length);
  console.log(actual.length);
  if(buffer.length < actual.length) {
    var evt = {keyCode: 32};
    $(".tagger").last().val(buffer);

    taggerKeydown(evt);

    $(".tagger").last().on("keyup", function(evt) {
      taggerKeyup(evt);
    });
  }

}
