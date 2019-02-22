(function ($) {
	if (!$ || !$.datepicker || $.datepicker['TAIWAN']) return;

	const regexTaiwan = /^[-]?(1[0-9]{2}|[1-9][0-9]|[0-9])[/](1[0-2]|0[1-9])[/](3[01]|0[1-9]|[12][0-9])$/;
	const formatTaiwan = 'ee/mm/dd';

	const __generateMonthYearHeader = $.datepicker['_generateMonthYearHeader'].bind($.datepicker);
	const _parseDate = $.datepicker.parseDate.bind($.datepicker);
	const _formatDate = $.datepicker.formatDate.bind($.datepicker);

	$.datepicker['TAIWAN'] = formatTaiwan;

	$.datepicker['_generateMonthYearHeader'] = function (inst, drawMonth, drawYear, minDate, maxDate,
		secondary, monthNames, monthNamesShort) {
		return reformYearHeaderToTaiwanYear(__generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort));
	}

	$.datepicker.parseDate = function (format, value, settings) {
		if (format === formatTaiwan && regexTaiwan.test(value)) {
			return new Date(
				1911 + parseInt(value.substr(0, value.indexOf('/')), 10),
				-1 + parseInt(value.substr(value.indexOf('/') + 1, 2), 10),
				parseInt(value.substr(value.lastIndexOf('/') + 1, 2), 10));
		}

		return _parseDate(format, value, settings);
	}

	$.datepicker.formatDate = function (format, date, settings) {
		if (format === formatTaiwan && date) {
			const yy = date.getFullYear() - 1911;
			const m = date.getMonth() + 1;
			const d = date.getDate();

			return `${yy}/${m < 10 ? '0' : ''}${m}/${d < 10 ? '0' : ''}${d}`;
		}

		return _formatDate(format, date, settings);
	}

	//////////////////////////////
	function reformYearHeaderToTaiwanYear(html) {
		$.each(html.match(/[>]([0-9]{4})[<]/g), function (inx, optionLabel) {
			const taiwanYear = parseInt(optionLabel.substr(1, 4), 10) - 1911;
			html = html.replace(optionLabel, `>民國${taiwanYear}<`);
		});

		return html;
	}
}(jQuery));
