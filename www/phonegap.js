//alert("phonegap.js")
// $.getScript('phonegap.desktop.js', function() 
// 	{
// 		phonegap = phonegapdesktop;
// 		cordova=phonegap;
// 		alert('Load was performed.'); 
// 	}
//  )

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) 
{
	var src = 'res/lib/cordova-2.5.0.js';
	var node = document.getElementsByTagName("head")[0] || document.body;
    if(node){
        var script = document.createElement("script");
        script.type="text/javascript";
        script.src=src
        node.appendChild(script);
    } else {
        document.write("<script src='"+src+"' type='text/javascript'></script>");
    }
} 
else 
{
	var src = 'phonegap.desktop.js';
	var node = document.getElementsByTagName("head")[0] || document.body;
    if(node){
        var script = document.createElement("script");
        script.type="text/javascript";
        script.src=src
        node.appendChild(script);
    } else {
        document.write("<script src='"+src+"' type='text/javascript'></script>");
    }
}
