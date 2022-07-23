import '@testing-library/jest-dom';

import { render, screen, cleanup } from '@testing-library/svelte';
import Cell from './Cell.svelte';

afterEach(() => cleanup());

const cellSelector = 'cell';
describe('Cell component', () => {
	it('Should render a label if passed as props', () => {
		render(Cell, { label: 'Some label' });
		const cellRendered = screen.getByTestId(cellSelector);
		expect(cellRendered.innerHTML).toContain('Some label');
	});

	it('Should contain classes if prop header its true', () => {
		const classes = 'bg-gray-600 font-bold';

		render(Cell, { label: 'Header', header: true });
		const cellRendered = screen.getByTestId(cellSelector);
		expect(cellRendered.classList.value).toContain(classes);
	});

	// TODO: add slot tests
	// it's currently a know issue https://github.com/testing-library/svelte-testing-library/issues/48
});
