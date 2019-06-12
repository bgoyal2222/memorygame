function count(obj){ return Object.keys(obj).length; }

export default function APIGET(api_name, parameters) {
	
	var str='';
	for(let i=0;i<count(parameters);i++){
		var theKey = Object.keys(parameters)[i];
		str=`${str}&${theKey}=${parameters[theKey]}`
	}
	str=str.toString().substr(1);
	return fetch(api_name+str, { method: 'GET'})
			.then((response) => response.text())
			.then((responseText) => {		
			  return responseText;
			}) 
			.catch((error) => {		
				
			});
	  
}