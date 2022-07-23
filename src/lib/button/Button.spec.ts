import '@testing-library/jest-dom';

import { render, screen, cleanup } from '@testing-library/svelte';
import Button from './Button.svelte';
import { EyeIcon } from '../Icons';

afterEach(() => cleanup());

const buttonSelector = 'button';
describe('Button component', () => {
	it('Should render a label if passed in props', () => {
		render(Button, { label: 'Some label' });
		const buttonRendered = screen.getByTestId(buttonSelector);
		expect(buttonRendered.innerHTML).toContain('Some label');
	});

	it('Should render a icon if passed in props', () => {
		render(Button, { icon: EyeIcon });
		const cellRendered = screen.getByTestId(buttonSelector);
		expect(cellRendered.innerHTML).toContain('<svg');
	});
});
