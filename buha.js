/*
buha.js
Author: flouthoc (https://github.com/flouthoc) (flouthoc@gmail.com)
Contributors: 
*/

function buha(callback){

	var mutex = false;
	const buhaqueue = [];

	const buhaPush = (task, taskcallback, isSync) => {

		if(typeof taskcallback === 'function' || isSync){

			buhaqueue.push({task: task, taskcallback: taskcallback, isSync: isSync});
		}
		else if(typeof task === 'function'){

			buhaqueue.push(task);
		}

	}


	const buhaRun = (task, taskcallback, isSync) => {

		mutex = true;
	
		try{

			task((error) => {
			
				if(error){

					console.error("Buha.js first : Error in executing task, stopping queue");
					console.error("Buha.js : "+error);

					if(typeof callback === 'function'){
						callback(err);
					}

				} else {

					mutex = false;
					//alert('mutex false');
					if(buhaqueue.length > 0){
						//alert(buhaqueue.length);
						
						let taskobject = buhaqueue.shift();
						if(typeof taskobject === 'function'){
							buhaRun(taskobject);
						}else{

							if(typeof taskobject.taskcallback === 'function'){
				
								buhaRun(taskobject.task, taskobject.taskcallback, taskobject.isSync);
							}else{
								
								buhaRun(taskobject.task, null, taskobject.isSync);
							}
						}
					}
				}	

			});

					

			
			if(isSync == true){
				//alert('do');

				mutex = false;

				let taskobject = buhaqueue.shift();
				if(taskobject){
					if(typeof taskobject === 'function'){
							buhaRun(taskobject);
					}else{

						if(typeof taskobject.taskcallback === 'function'){
							buhaRun(taskobject.task, taskobject.taskcallback, taskobject.isSync);
						}else{
							buhaRun(taskobject.task, null, taskobject.isSync);
						}
					}
				}
			}

		}catch (error){


			console.error("Buha.js : Error in executing task, stopping queue");
			console.error("Buha.js : "+error);

			if(typeof callback === 'function'){
					callback(err);
			}

			if(taskcallback){
				if(typeof taskcallback === 'function'){
							taskcallback(error);
				}
			}
		}
	}


	return{

		push: (task , taskcallback, isSync) => { return mutex ? buhaPush(task, taskcallback, isSync) : buhaRun(task, taskcallback, isSync) },
	}
}
