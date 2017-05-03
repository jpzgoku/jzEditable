(function($) {

	$.fn.jzEditable = function(options) {

		var settings = $.extend({
			appHeight: null,
			hasSaveButton: true
		}, options)

		var divClicked = function($thisInstance) {
			$thisInstance.off('click')
			settings.appHeight = $thisInstance.height();
			var editableText = $("<textarea class='edit' style='width: 100%;'/>");
			editableText.val($thisInstance.html());
			editableText.css('height', settings.appHeight);
			$thisInstance.html(' ');
			$thisInstance.append(editableText);
			editableText.focus();
			if (settings.hasSaveButton) {
				var saveButton = $("<button>Save</button>");
				$thisInstance.append(saveButton);
				$(saveButton).on('click', function() {
					editText($thisInstance);
				});
			} else {
				editableText.on('blur', function() {
					editText($thisInstance);
				});
			}
		};

		var editText = function($thisInstance) {
			var viewableText = $("<div>");
			viewableText.html($thisInstance.find('.edit').val());
			$thisInstance.replaceWith(viewableText);
			$(viewableText).on('click', function() {
				divClicked($(this));
			});
		};

		this.each(function() {
			var $thisInstance = $(this);
			$thisInstance.on('click', function() {
				divClicked($thisInstance);
			});
		});
		return this;
	}

})(jQuery);