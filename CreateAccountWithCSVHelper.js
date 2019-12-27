({
	save: function(component, obj, index) {

		var action = component.get("c.saveAccount");
        action.setParams({
            'obj': obj,
        });
         action.setCallback(this, function(response){
             var state = response.getState();
             
             var data = component.get('v.data');
       		 var headers = component.get('v.headers');
             
             if (state === "SUCCESS") {
                 var rsl = response.getReturnValue();
                 
                 data[index]._statusToCreateOrUpdate_ = 'Created';
                 data[index].variant = 'success';
                 data[index].Id = rsl.Id;
             }else{
                 data[index]._statusToCreateOrUpdate_ = 'Not created';
                 data[index].variant = 'destructive';
             }
             component.set("v.data",data);
             
             if((index+1) < data.length){
                 // alert("Espera papi...");
                 var obj = {}
                 var save = true;
                 for(var x = 0; x < headers.length; x++){
                     // alert(headers[x].trim()+": "+data[x].trim());
                     if(headers[x].trim() == 'Id'){
                    //alert("here 1");
                        if(data[index+1][headers[x].trim()].trim() != '0'){
                            //alert("here 2 1");
                            obj[headers[x].trim()] = data[index+1][headers[x].trim()].trim();
                            save = false;
                        }else{
                            obj.Id = undefined;
                            save = true;
                        }
                    }else{
                        obj[headers[x].trim()] = data[index+1][headers[x].trim()].trim();
                    }
                     
                 }
                 
                 if(save){
                     this.save(component, obj,index+1);
                 }else{
                     this.update(component, obj,index+1);
                 }
             }else{
                 component.set('v.saving', false);
             }
         })
		 $A.enqueueAction(action);
	},
    update: function(component, obj, index) {

		var action = component.get("c.updateAccount");
        action.setParams({
            'obj': obj,
        });
         action.setCallback(this, function(response){
             var state = response.getState();
             
             var data = component.get('v.data');
       		 var headers = component.get('v.headers');
             
             if (state === "SUCCESS") {
                 var rsl = response.getReturnValue();
                 
                 data[index]._statusToCreateOrUpdate_ = 'Updated';
                 data[index].variant = 'brand';
             }else{
                 data[index]._statusToCreateOrUpdate_ = 'Not Updated';
                 data[index].variant = 'destructive';
             }
             component.set("v.data",data);
             
             if((index+1) < data.length){
                 // alert("Espera papi...");
                 var obj = {}
                 var save = true;
                 for(var x = 0; x < headers.length; x++){
                     // alert(headers[x].trim()+": "+data[x].trim());
                     if(headers[x].trim() == 'Id'){
                    //alert("here 1");
                        if(data[index+1][headers[x].trim()].trim() != '0'){
                            //alert("here 2 1");
                            obj[headers[x].trim()] = data[index+1][headers[x].trim()].trim();
                            save = false;
                        }else{
                            obj.Id = undefined;
                            save = true;
                        }
                    }else{
                        obj[headers[x].trim()] = data[index+1][headers[x].trim()].trim();
                    }
                     
                 }
                 if(save){
                     this.save(component, obj,index+1);
                 }else{
                     this.update(component, obj,index+1);
                 }
                 
             }else{
                 component.set('v.saving', false);
             }
         })
		 $A.enqueueAction(action);
	},
})
