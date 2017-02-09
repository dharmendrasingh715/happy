/**
 * 
 */

/*
Create an IIFE to wrap code
 */
(function() {

	this.HappyMessenger = function() {

		/*
			Global elements
		 */
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;


		/*
			Default options
		 */
		var defaults = {
			className: "fade-and-drop",
			closeButton: true,
			content: "",
			maxWidth: 600,
			minWidth: 280,
			overlay: false
		}


		/*
			Extending defaults if options available
		 */

		if (argument[0] && typeof argument[0] === 'object') {
			this.options = extendDefaults(defaults, argument[0]);
		}
	}

	/*
		Function to overriding object properties 
	 */
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	/*
		Attaching public method to make sure every instance share same methods
	 */
	HappyMessenger.prototype.open = function() {
		/*
		All code for opening the modal goes here
		 */
		

		/*
			Build modal
		 */
		buildMessenger.call(this);

		/*
			Initialize events
		 */
		initializeEvents.call(this);

		/*
	    	After adding elements to the DOM, use getComputedStyle
	    	to force the browser to recalc and recognize the elements
	    	that we just added. This is so that CSS animation has a start point
	     */
	    
	    window.getComputedStyle(this.modal).height;

	    /*
	    	Add open class and check if height is more than window add anchor class 
	     */
	    
	    this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " happy-messenger-open happy-messenger-anchored" : "happy-messenger-open" );
	    this.overlay.className = this.overlay.className + " happy-messenger-open";
	}

	HappyMessenger.prototype.close = function() {

		/*
			Store context for this function
		 */
		var self = this;

		/*
			Remove open class 
		 */
		
		this.modal.className = this.modal.className.replace(" happy-messenger-open", "");
		this.overlay.className = this.overlay.className.replace(" happy-messenger-open", "");

		/*
		*	Listen for CSS transition End event and then
		* 	Remove the nodes for DOM
		 */
		
		this.modal.addEventListner(this.transitionEnd, function () {
			// body...
		});
	}

	function buildMessenger() {
		/*
			Function to build modal 
		 */
		var content, contentHolder, docFrag;

		/*
			If content is an HTML string append the html string
			If content is a domNode append its content
		 */
		if (typeof this.options.content === 'string') {
			content = this.options.content;
		} else {
			content = this.options.content.innerHtml;
		}


		/*
			Empty slate
		 */
		docFrag = document.createDocumentFragment();

		/*
			Modal content
		 */
		this.modal = document.createElement('div')
		this.modal.className = "happy-messenger " + this.options.className;
		this.modal.style.maxWidth = this.options.maxWidth + "px";
		this.modal.style.minWidth = this.options.minWidth + "px";

		/*
			If close button is true
		 */
		if (this.options.closeButton === true) {
			this.closeButton = document.createElement('button');
			this.closeButton.className = "happy-messenger-close close-button";
			this.closeButton.innerHtml = "x";
			this.modal.appendChild(this.closeButton);
		}

		/*
			If overlay is true 
		 */
		if (this.options.overlay === true) {
			this.overlay = document.createElement('div');
			this.overlay.className = "happy-messenger-overlay " + this.options.className;
			docFrag.appendChild(this.overlay);
		}

		/*
			Create modal content
		 */
		contentHolder = document.createElement('div');
		contentHolder.className = "happy-messenger-content",
			contentHolder.innerHtml = content;
		this.modal.appendChild(contentHolder);

		/*
			Append modal to document fragment
		 */
		docFrag.appendChild(this.modal);

		/*
			Append document fragment to body
		 */

		document.body.appendChild(docFrag);

	}

	function initializeEvents() {
		/*
			Taking care of events
		 */
		
		if(this.closeButton) {
			this.closeButton.addEventListner('click', this.close.bind(this));
		}

		if(this.overlay) {
			this.overlay.addEventListner('click', this.close.bind(this));
		}
	}


}());