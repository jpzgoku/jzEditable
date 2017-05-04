(function($) {

	$.fn.jzEditable = function(options) {

		var settings = $.extend({
			divHeight: null,
			hasSaveButton: false,
			divWidth: '100%'
		}, options)

		var divClicked = function($thisInstance) {
			$thisInstance.off('click')
			settings.divHeight = $thisInstance.height();
			var $editableText = $("<textarea class='edit'/>");
			$editableText.val($thisInstance.html());
			$editableText.css('height', settings.divHeight);
			$editableText.css('width', settings.divWidth);
			$thisInstance.html(' ');
			$thisInstance.append($editableText);
			$editableText.focus();
			if (settings.hasSaveButton) {
				var $saveButton = $("<button>Save</button>");
				$thisInstance.append("<br>");
				$thisInstance.append($saveButton);
				$($saveButton).on('click', function() {
					editText($thisInstance);
				});
			} else {
				$editableText.on('blur', function() {
					editText($thisInstance);
				});
			}
		};

		var editText = function($thisInstance) {
			var $viewableText = $("<div>");
			$viewableText.html($thisInstance.find('.edit').val());
			$thisInstance.replaceWith($viewableText);
			$($viewableText).on('click', function() {
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