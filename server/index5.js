			console.log(1);
			new Promise(function(resolve) {
				console.log(2);
				resolve();
			}).then(function() {
				console.log(3)
			}) 
			setTimeout(function() {
				console.log(4);
				process.nextTick(function() {
					console.log(5);
				}) 
				new Promise(function(resolve) {
					console.log(6);
					resolve()
				}).then(function() {
					console.log(7)
				})
			}) 
			process.nextTick(function() {
				console.log(8)
			}) 
			setImmediate(function() {
				console.log(9);
				new Promise(function(resolve) {
					console.log(10);
					resolve()
				}).then(function() {
					console.log(11)
				}) 
				process.nextTick(function() {
					console.log(12);
				})
			})