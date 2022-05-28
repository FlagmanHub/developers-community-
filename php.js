$(document).ready(function(){
	var codeEditorElement = $(".codemirror-textarea")[0];
    var editor = CodeMirror.fromTextArea(codeEditorElement, {
        mode: "application/x-httpd-php",
        lineNumbers: true,
        matchBrackets: true,
        theme: "ambiance",
        lineWiseCopyCut: true,
        undoDepth: 200
      });
    editor.setValue('<?php\necho "Hello World!"\n?>');

	$(document).on('click', '#run', function(e){
		e.preventDefault();
		$("#error").html("").hide();
		var editorCode = editor.getValue();
		if(editorCode != ''){
		$.ajax({
			url: 'file-write.php',
			type: 'POST',
			dataType: 'json',
			data: {"input":editorCode},
			success:function(response){
			},
			complete:function(){
				$.ajax({
					url: 'code-editable.php',
					type: 'GET',
					success:function(response){
						console.log("response:  "+response);
						$("#result").html(response)	;
					},
					error:function(){
						console.log("error: "+response);
						}
					});	
				}
			});

		} else{
			$("#error").html("Code should not be empty").show();
		}

	});

	$(document).on('click', '#clear', function(e){
		e.preventDefault();
		$("#error").html("").hide();
		editor.setValue('');
	});

	$(document).on('click', '#refresh', function(e){
		e.preventDefault();
		$("#error").html("").hide();
		location.reload();
	});
});