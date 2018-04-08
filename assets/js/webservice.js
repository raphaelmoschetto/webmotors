// FUNCTION USED TO CHANGE SELECT (API VALUES) - #MARCA #MODELO #VERSAO
	function webservice(value=null, selector=null)
	{
	
		//IF FUNCTION STARTS ON DOCUMENT READY OR CHOOSING SELECT #MARCA TO EMPTY OPTION
		if(value == null || (value == "" && selector == "marca")) 
			{ 
				document.querySelector('#modelo').disabled = true;
    			document.querySelector('#modelo').innerHTML = "<option value=''>Modelo: Todos</option>";
				document.querySelector('#versao').disabled = true;
				document.querySelector('#versao').innerHTML = "<option value=''>Versão: Todas</option>";
			}
		// IF CHOOSING SELECT #MARCA THEN SELECT #VERSAO IS DISABLED
		if(selector == "marca")
			{
				document.querySelector('#versao').disabled = true;
				document.querySelector('#versao').innerHTML = "<option value=''>Versão: Todas</option>";
			}

		// DO DE XML REQUEST TO API
		var request = new XMLHttpRequest();
		request.open('GET', 'assets/php/proxy.php?selector='+selector+'&value='+value, true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {

		    var resp = request.responseText;

		   		//TRANSFORM STRING TO JSON OBJ
		        var obj = JSON.parse(resp);

		        //DO SELECT OF MAKERS
		        if(value == null && selector==null){

		        	obj.map(function(myData) {
					    
					    // Get the element you want to add your new element
						var target = document.querySelector('#marca');

						// Create the new element
						var option = document.createElement('option');

						// Add content to the new element
						option.innerHTML = myData.Name;
						option.value = myData.ID;

						// Insert the element 
						return target.appendChild(option);

					});

		        }

		        // DO SELECT OF MODELS 
		        if(value != null && selector == "marca"){
		        	//console.log(value);

		        	document.querySelector('#modelo').disabled = false;
    				document.querySelector('#modelo').innerHTML = "<option value=''>Modelo: Todos</option>";
			        
			        obj.map(function(myData) {

						// Get the element you want to add your new element
						var target = document.querySelector('#modelo');

						// Create the new element
						var option = document.createElement('option');

						// Add content to the new element
						option.innerHTML = myData.Name;
						option.value = myData.ID;

						// Insert the element 
						return target.appendChild(option);

					});
				}

				// DO SELECT OF VERSION
				if(value != null && selector == "modelo"){
		        	//console.log(value);
			       	document.querySelector('#versao').disabled = false;
    				document.querySelector('#versao').innerHTML = "<option value=''>Versão: Todas</option>";
			        
			        obj.map(function(myData) {

						// Get the element you want to add your new element
						var target = document.querySelector('#versao');

						// Create the new element
						var option = document.createElement('option');

						// Add content to the new element
						option.innerHTML = myData.Name;
						option.value = myData.ID;

						// Insert the element 
						return target.appendChild(option);

					});
				}

		  } else {
		    console.log("Erro ao tentar acessar API OnlineChallenge.");
		  }
		};

		request.onerror = function() {
		  	console.log("Erro ao tentar acessar API OnlineChallenge.");
		};

		request.send();


	}