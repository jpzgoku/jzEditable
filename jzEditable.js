(function($) {

	$.fn.jzEditable = function(options) {

		var settings = $.extend({
			self: null,
			appHeight: null,
			hasSaveButton: true
		}, options)

		var divClicked = function() {
			$(this).off('click', divClicked);
			settings.self = this;
			settings.appHeight = $(this).height();
			var editableText = $("<textarea class='edit' style='width: 100%;'/>");
			editableText.val($(this).html());
			editableText.css('height', settings.appHeight);
			$(this).html(' ');
			$(this).append(editableText);
			editableText.focus();
			if (settings.hasSaveButton) {
				var saveButton = $("<button>Save</button>");
				$(this).append(saveButton);
				$(saveButton).on('click', editText);
			} else {
				editableText.on('blur', editText);
			}
		};

		var editText = function() {
			var viewableText = $("<div>");
			viewableText.html($('.edit').val());
			$(settings.self).replaceWith(viewableText);
			$(viewableText).on('click', divClicked);
		};

		this.on('click', divClicked);
		return this
	}

})(jQuery);