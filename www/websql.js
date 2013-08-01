if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) 
{
	//alert('websql');
} 
else 
{
	var src = 'js/purejswebsql.js';
	var node = document.getElementsByTagName("head")[0] || document.body;
    if(node){
        var script = document.createElement("script");
        script.type="text/javascript";
        script.src=src
        node.appendChild(script);
    } else {
        document.write("<script src='"+src+"' type='text/javascript'></script>");
    }
	// $.getScript('/js/purejswebsql.js', function() 
	// 	{
	// 		alert('purejswebsql'); 
	// 	}
	//  )
}