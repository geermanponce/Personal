var Background = function () {

    return {
        //main function to initiate the module
        init: function () {
            $.backstretch([
		        "voissImages/bg/1.jpg",
		        "voissImages/bg/2.jpg",
		        "voissImages/bg/3.jpg",
		        "voissImages/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		    });
        }
    };
}();
