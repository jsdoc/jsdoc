function PackageFilter() {
	this.validPackages = this._getValidPackages();
	this._initializeDataList();
	
	var filter = sessionStorage.getItem('package-filter');
	if(filter) {
		this.setFilter(filter);
	}
}

PackageFilter.prototype.setFilter = function(filterValue) {
	var searchElem = document.querySelector('#filter-input input');
	
	searchElem.value = filterValue;
	this.updateDisplayedItems(filterValue);
};

PackageFilter.prototype.updateDisplayedItems = function(packageName) {
	if((packageName === '') || this.validPackages[packageName]) {
		var indexElems = document.querySelectorAll('h3 + ul li a');
		var packageNameMatcher = new RegExp('^' + packageName + "[/.].+");
		
		for(var ei = 0, el = indexElems.length; ei < el; ++ei) {
			var indexElem = indexElems[ei];
			var displayItem = ((packageName === '') || indexElem.textContent.match(packageNameMatcher));
			
			indexElem.parentNode.style.display = (displayItem) ? 'list-item' : 'none';
		}
		
		if(packageName === '') {
			sessionStorage.removeItem('package-filter');
		}
		else {
			sessionStorage.setItem('package-filter', packageName);
		}
	}
};

PackageFilter.prototype.onKeyUp = function(inputBox, keyEvent) {
	// fall-back for IE8 which doesn't support 'oninput' -- it can get away with just using 'onkeypress' since it doesn't support data-lists
	this.updateDisplayedItems(inputBox.value);
	
	// Chrome doesn't close the datalist when you press enter, so force it to
	if((navigator.userAgent.match(' Chrome/')) && (keyEvent.keyCode == 13)) {
		inputBox.nextElementSibling.focus();
		inputBox.focus();
	}
};

PackageFilter.prototype._initializeDataList = function() {
	var packagesDatalist = document.getElementById('package-prefixes');
	
	if(packagesDatalist.options) {
		for(var packageName in this.validPackages) {
			var option = document.createElement('option');
			option.value = packageName;
			packagesDatalist.appendChild(option);
		}
	}
};

PackageFilter.prototype._getValidPackages = function() {
	var indexElems = document.querySelectorAll('h3 + ul li a');
	var validPackages = {};
	
	for(var ei = 0, el = indexElems.length; ei < el; ++ei) {
		var indexElem = indexElems[ei];
		var separator = (indexElem.textContent.indexOf('/') != -1) ? '/' : '.'; 
		var packageParts = indexElem.textContent.split(separator);
		
		for(var pi = 0, pl = packageParts.length - 1; pi < pl; ++pi) {
			var packagePrefix = packageParts.slice(0, pi + 1).join(separator);
			validPackages[packagePrefix] = true;
		}
	}
	
	return validPackages;
};

var packageFilter;
document.addEventListener('DOMContentLoaded', function(event) {
	packageFilter = new PackageFilter();
});

