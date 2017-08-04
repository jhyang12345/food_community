document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  autosize($("textarea"));

  $(".tags_holder").append('<span class="tagger tag_holder">' +
                '<span class="starting_sharp">#</span>' +
                '<input type="text" class="tagger_input" placeholder="" spellcheck="false" />' +
              '</span>');

  $(".tagger_input").autoGrowInput({minWidth:1,comfortZone:3});
  $(".tagger_input").trigger("input");
  $(".tagger_input").last().on("keyup", function(evt) {
    taggerKeyup(evt);
  });

  $(".tagger_input").last().on("keydown", function(evt) {
    taggerKeyDown(evt);
  });

  $(".tagger_input").last().on("focus", function(evt){

  });

  

  $(".tag_holder").on("click", function(evt) {
    $(this).children(".tagger_input").focus();
  });

});

var keyCodes = [13, 32];

function taggerKeyup(evt) {
  var $curElem = $(evt.target);

  var buffer = $curElem.val().trim(" ");
  var actual = $curElem.last().val();

  console.log(evt.target.text);
  if(evt.target.text != undefined) {
    if(evt.target.text.length == 0 && evt.keyCode == 8 && actual.length == 0 && $(".tagger_input").length > 1) {
      if($(evt.target.parentElement).prev()) {
        $(evt.target.parentElement).prev().children(".tagger_input").focus();
      } else {
        $(evt.target.parentElement).next().children(".tagger_input").focus();
      }
      $(evt.target.parentElement).remove();
      return;
    }
  }



  if(buffer.length == 0) {
    $curElem.last().val(buffer);
  }

  console.log(buffer);
  if(buffer.length > 0 && (buffer.length < actual.length || keyCodes.indexOf(evt.keyCode) >= 0)) {
    $curElem.val(buffer);
    $curElem.addClass("tagger_complete");
    //$(".tagger_input").last().prop("readonly", true);
    $(".tags_holder").append('<span class="tagger tag_holder">' +
                  '<span class="starting_sharp">#</span>' +
                  '<input type="text" class="tagger_input" placeholder="" spellcheck="false" />' +
                '</span>');
    $(".tagger_input").last().autoGrowInput({minWidth:1,comfortZone:3});
    $(".tagger_input").last().trigger("update");
    $(".tagger_input").last().focus();

    $(".tagger_input").last().on("keyup", function(evt) {
      taggerKeyup(evt);
    });

    $(".tagger_input").last().on("keydown", function(evt) {
      taggerKeyDown(evt);
    });

  }
}

function taggerKeyDown(evt) {
  var $curElem = $(evt.target);


  var buffer = $curElem.val().trim(" ");
  var actual = $curElem.last().val();

  evt.target.text = buffer;
}
