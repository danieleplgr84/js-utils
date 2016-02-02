
function Objects(){}

Objects.applyOnEmptyKeys= function(instanceObj, func){
	if( typeof(instanceObj)!=='undefined' && instanceObj!==null)  {
		if((typeof(instanceObj)==='object')){ 
			var _keys = Object.keys(instanceObj);
			if(_keys!==null && _keys.hasOwnProperty('length') && _keys.length>0) {
				// fetch object keys 
				for(var index in _keys){
					var fieldName = _keys[index];
					if(fieldName!==null && typeof(fieldName)=='string'){
						var fieldValue = instanceObj[fieldName];
						var _type = typeof(fieldValue);
						
						if(_type==='object' && fieldValue!==null){
							Objects.applyOnEmptyKeys(fieldValue, func);
						}
						
						else {
							// check is not boolean nor number, because for these types we want to hold the original value.
							if(_type!='boolean' && _type!='number'){
								// check whenever to replace the obj key value 
								if(_type==='null' || fieldValue===null || _type==='undefined' || fieldValue===''){
									if(typeof(func)==='function' && func!==null){
										func(instanceObj, fieldName);
									}
								} 
							} 
						}
					}
				}
			}	
		}
	} 
}
Objects.cleanEmptyKeys= function(instanceObj){
	Objects.applyOnEmptyKeys(instanceObj, function(instanceObj, fieldName){
		delete instanceObj[fieldName];
	});
};
Objects.replaceEmptyKeys = function(instanceObj, TOKEN_REPLACE){
	Objects.applyOnEmptyKeys(instanceObj, function(instanceObj, fieldName){
		instanceObj[fieldName] = TOKEN_REPLACE;
	});
};