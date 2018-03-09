// FUNCTION USED TO CHANGE SELECT (API VALUES) - #MARCA #MODELO #VERSAO
	function webservice(value=null, request=null)
	{

		//console.log(value,request)
		
		//IF FUNCTION STARTS ON DOCUMENT READY - GET URL AJAX -> MAKE
		if(value==null && request==null)
			urlajax = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make";

		//IF FUNCTION STARTS CHOOSING SELECT #MARCA - GET URL AJAX -> MODEL WITH MAKER ID
		if(value != "" && value != null && request=="marca")
			urlajax = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID="+value;

		//IF FUNCTION STARTS CHOOSING SELECT #MODELO - GET URL AJAX -> VERSION WITH MODEL ID
		if(value != "" && value != null && request=="modelo")
			urlajax = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID="+value;

		//IF FUNCTION STARTS ON DOCUMENT READY OR CHOOSING SELECT #MARCA TO EMPTY OPTION
		if(value == null || (value == "" && request == "marca")) 
			{ 
				console.log(value,request);
				$('#modelo').prop('disabled', 'disabled');
				$('#modelo').html("<option value=''>Modelo: Todos</option>");
				$('#versao').prop('disabled', 'disabled');
				$('#versao').html("<option value=''>Versão: Todas</option>");
			}

		//IF FUNCTION STARTS ON DOCUMENT READY OR CHOOSING SELECT #MARCA TO EMPTY OPTION
		if((value == null || value=="") && (request == null || request == "modelo")) 
			{ 
				$('#versao').prop('disabled', 'disabled');
				$('#versao').html("<option value=''>Versão: Todas</option>");
			}

			console.log(urlajax);

			if(urlajax != "") {
				$.ajax(
	    		{
	    			url: urlajax, 
	    			success: function(data){
				        //console.log(data);
				        //console.log("teste");
				        console.log(urlajax);

				        //DO SELECT OF MAKERS
				        if(value == null && request==null){

				        	myObj = data;
							for (x in myObj) {

								$('#marca').append($('<option value="'+myObj[x].ID+'">'+myObj[x].Name+'</option>'));

							}

				        }

				        // DO SELECT OF MODELS 
				        if(value != null && request == "marca"){
				        	//console.log(value);
					        $('#modelo').html("<option value=''>Modelo: Todos</option>");
					        $('#modelo').prop('disabled', false);
					        myObj = data;
							for (x in myObj) {

								$('#modelo').append($('<option value="'+myObj[x].ID+'">'+myObj[x].Name+'</option>'));

							}
						}

						// DO SELECT OF VERSION
						if(value != null && request == "modelo"){
				        	console.log(value);
					        $('#versao').html("<option value=''>Versão: Todas</option>");
					        $('#versao').prop('disabled', false);
					        myObj = data;
							for (x in myObj) {

								$('#versao').append($('<option value="'+myObj[x].ID+'">'+myObj[x].Name+'</option>'));

							}
						}

						//RESET URLAJAX TO NEXT 
						urlajax = "";

	    			},
	    			error: function(){
	    				console.log("Erro ao tentar acessar API OnlineChallenge.");
	    			}
	    		});
			}
		
	}