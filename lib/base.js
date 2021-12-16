(function (window) {

	'use strict';

	Array.prototype.average = Array.prototype.average || function () {
		return this.reduce(function (p, c, i, a) {
			return p + (c / a.length)
		}, 0);
	};

	class Dictionary {

		static date() {
			return 'data/ora';
		}
		static delta() {
			return 'delta energia pari/dispari';
		}
	}

	class Count {

		static odd() {
			return 'numero periodi pari';
		}
		static even() {
			return 'numero periodi dispari';
		}
	}

	class Calculate {

		static negative() {
			return 'devianza negativa';
		}
		static positive() {
			return 'devianza positive';
		}
	}

	class Period {

		static odd() {
			return 'periodi pari';
		}
		static even() {
			return 'periodi dispari';
		}
	}

	class Average {

		static positive() {
			return 'devianza media positive';
		}
		static negative() {
			return 'devianza media negativa';
		}
	}

	class Deviance {

		// Moment JS format

		static format() {
			return 'DD/MM/YYYY';
		}

		constructor() {
			this.elements = {};
			this.elements.table = new Table();
			this.elements.table.out().className = 'deviance';

			this.result = [[], []];

			this.getTable().getThead().addRow(
				window.Table.Tr.Th.content(window.Deviance.Dictionary.date()),
				window.Table.Tr.Th.content(window.Deviance.Dictionary.Period.odd()),
				window.Table.Tr.Th.content(window.Deviance.Dictionary.Period.even()),
				window.Table.Tr.Th.content(window.Deviance.Dictionary.Count.odd()),
				window.Table.Tr.Th.content(window.Deviance.Dictionary.Count.even()),
				window.Table.Tr.Th.content(window.Deviance.Dictionary.delta()),
				window.Table.Tr.Th.content(window.Deviance.Dictionary.Calculate.negative()),
				window.Table.Tr.Th.content(window.Deviance.Dictionary.Calculate.positive())
			);
		}

		getTable() {
			return this.elements.table;
		}
		getResult() {
			return this.result;
		}
		addRow(datetime, odd, even, delta, negative, positive) {
			let result = this.getResult();

			if (negative < 0) result[0].push(negative);
			if (positive > 0) result[1].push(positive);

			return this.getTable().getTbody().addRow(
				window.Table.Tr.Td.content(datetime),
				window.Table.Tr.Td.content(odd.toFixed(2)),
				window.Table.Tr.Td.content(even.toFixed(2)),
				window.Table.Tr.Td.content(144),
				window.Table.Tr.Td.content(144),
				window.Table.Tr.Td.content(delta.toFixed(2)),
				window.Table.Tr.Td.content(negative.toFixed(2)),
				window.Table.Tr.Td.content(positive.toFixed(2))
			);
		}
		calculate() {
			let result = this.getResult(),
				tbody = this.getTable().getTbody();

			for (let item = 0; item < result.length; item++) {
				let label = item > 0 ? window.Deviance.Dictionary.Average.positive() : window.Deviance.Dictionary.Average.negative(),
					colspan = 6 + item,
					parameters = [
						window.Table.Tr.Td.content(label),
						window.Table.Tr.Td.content(result[item].average().toFixed(2))
					];

				if (item === 0) parameters.push(null);
				tbody.addRow.apply(tbody, parameters).getColumn(0).setColspan(colspan);
			}

			return this;
		}
		out() {
			return this.getTable().out();
		}
	}

	window.Deviance = Deviance;
	window.Deviance.Dictionary = Dictionary;
	window.Deviance.Dictionary.Count = Count;
	window.Deviance.Dictionary.Average = Average;
	window.Deviance.Dictionary.Calculate = Calculate;
	window.Deviance.Dictionary.Period = Period;

})(window);