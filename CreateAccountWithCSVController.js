({
	handleUploadFinished: function (component, event) {
        component.set('v.isLoad', true);
        var uploadedFiles = event.getParam("files");
        var columns = [];
        var finalData = [];
        var cont = 0;
        
        for(var i = 0; i < uploadedFiles.length; i++){
            //alert("File uploaded : " + uploadedFiles[i]);
            var reader = new FileReader();
            reader.readAsText(uploadedFiles[i], "UTF-8");
            reader.onload = function (evt) {
                cont += 1;
                
                //console.log("EVT FN");
                var csv = evt.target.result;
              
                // alert(csv);
                
                var arr =  csv.split('\n')
                var headers = arr[0].split(',');
                component.set('v.headers', headers);
                
                columns = [];
                for(var x = 0; x < headers.length; x++){
                    //alert(headers[x].trim()+": "+data[x].trim());
                    //obj[headers[x].trim()] = data[x].trim();
                    columns.push({label: headers[x].trim(), fieldName: headers[x].trim(), type: 'text',  editable: false});
                }
                columns.push({label: 'Status', fieldName: 'actionState', type: 'button', initialWidth: 150, typeAttributes:
                              { label: { fieldName: '_statusToCreateOrUpdate_'}, title: 'Status',name: 'status', variant: {fieldName: 'variant'}, class: 'btn_next'}});
                
                
                for(var j = 1; j < arr.length; j++){
                    var data = arr[j].split(',');
                    var obj = {}
                    for(var x = 0; x < headers.length; x++){
                        // alert(headers[x].trim()+": "+data[x].trim());
                        obj[headers[x].trim()] = data[x].trim();
                    }
                    obj._statusToCreateOrUpdate_ = 'No action';
                    obj.variant = 'Neutral';
                    
                    finalData.push(obj);
                    
                }
                
                /*var result = helper.CSV2JSON(component,csv);
                console.log('@@@ result = ' + result);
                //console.log('@@@ Result = '+JSON.parse(result));
                helper.CreateAccount(component,result);*/
                if(cont == uploadedFiles.length){ 
                	component.set('v.columns', columns);
                	component.set('v.data', finalData);
                	component.set('v.isLoad', false);
                }
                
            }
        }
        
    },
    save: function (component, event, helper) {
    	component.set('v.saving', true);
        var data = component.get('v.data');
        var headers = component.get('v.headers');
        // alert(data[0]);
        
        var obj = {}
        var save  = true;
        for(var x = 0; x < headers.length; x++){
            // alert(headers[x].trim()+": "+data[x].trim());
            if(headers[x].trim() == 'Id'){
                //alert("here 1");
                if(data[0][headers[x].trim()].trim() != '0'){
                    //alert("here 2 1");
            		obj[headers[x].trim()] = data[0][headers[x].trim()].trim();
                    save = false;
                }else{
                    obj.Id = undefined;
                    save = true;
                }
        	}else{
            	obj[headers[x].trim()] = data[0][headers[x].trim()].trim();
        	}
        }
        
        if(save){
            helper.save(component, obj, 0);
        }else{
            helper.update(component, obj, 0);
        }
        
    }
})
