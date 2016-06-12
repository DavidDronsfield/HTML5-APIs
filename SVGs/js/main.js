function removeTree(e) {
	var child = e.target;
	var parent = child.parentNode;
	var index = Array.prototype.indexOf.call(parent.children, child);

	if (child.correspondingUseElement) {
		child = child.correspondingUseElement;
	}
	parent.removeChild(parent.children[index - 1]);
	parent.removeChild(child);
	updateTrees();
}

document.getElementById("addTreeButton").onclick = function() {
	var x = Math.floor(Math.random() * 400);
	var y = Math.floor(Math.random() * 600);
	var scale = Math.random() + .5;
	var translate = "translate(" + x + ", " + y + ") ";

	var treeShadow = document.createElementNS("http://www.w3.org/2000/svg", "use");
	treeShadow.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#treeShadow");
	treeShadow.setAttribute("transform", translate + "scale(" + scale + ")" + "skewX(-18)");
	treeShadow.setAttribute("opacity", "0.4");
	document.querySelector("svg").appendChild(treeShadow);

	var tree = document.createElementNS("http://www.w3.org/2000/svg", "use");
	tree.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#tree");
	tree.setAttribute("transform", translate + "scale(" + scale + ")");
	document.querySelector("svg").appendChild(tree);

	updateTrees();
}

function updateTrees() {
	var list = document.querySelectorAll("use");
	var treeCount = 0;
	for (var i=0; i<list.length; i++) {
		if (list[i].getAttribute("xlink:href") == "#tree") {
			treeCount++;
			list[i].onclick = removeTree;
		}
	}
	var counter = document.getElementById("treeCounter");
	treeCount === 1 ? counter.textContent = treeCount + " tree in the forest": counter.textContent = treeCount + " trees in the forest";
}

updateTrees();
