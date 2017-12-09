(function() {
  // update height of inputs 
  $.each($("textarea"), function(index, el){
    $(el).height(el.scrollHeight+"px");
  });
});