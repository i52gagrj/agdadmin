import * as _ from "lodash";

import {Pipe, PipeTransform, Injectable } from "@angular/core";
import { ValueTransformer } from "@angular/compiler/src/util";
 
@Pipe({
  name: "dataFilter",
  pure: false
})
//@Injectable()
export class DataFilterPipe implements PipeTransform {
  /*transform(items: any[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.title.indexOf(filter) !== -1);
	}*/ 
  /*transform(array: any[], query: string): any {
    if (query) {      
      console.log(query);
      console.log(array);      
			//console.log(row=>row.name);								
			
      return _.filter(array, row=>row.name.indexOf(query) > -1);
    }
    else return array;
	}*/
	
	transform(items:any[], args:any):any[] {
		console.log(items);
		console.log(args);	
		var isSearch = (data:any): boolean => {
			var isAll = false;
			if(typeof data === 'object' ){
				for (var z in data) {
					if(isAll = isSearch(data[z]) ){
						break;
					}
				}
			} else {
				if(typeof args === 'number'){
					isAll = data === args;
				} else {
					isAll = data.toString().match( new RegExp(args, 'i') );
				}
			} 

			return isAll;
		};

		return items.filter(isSearch);
	}	
}



