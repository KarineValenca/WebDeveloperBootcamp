// check off scpecific todos by clicking
$("li").click(function(){
	$(this).toggleClass("completed");
});

$(".delete").click(function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});