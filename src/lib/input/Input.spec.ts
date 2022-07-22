import '@testing-library/jest-dom';

import { render, screen, cleanup } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Input from './Input.svelte';

afterEach(() => {
	cleanup();
});

const inputSelector = 'input';

describe('Input component', () => {
	it('Should be visible', () => {
		render(Input);

		const input = screen.queryByTestId(inputSelector);
		expect(input).toBeTruthy();
	});

	it('should update value when user types', async () => {
		render(Input);
		const user = userEvent.setup();

		const input = screen.getByTestId(inputSelector);
		await user.type(input, 'hello world');
		expect(screen.queryByTestId(inputSelector)).toBeDefined();
	});
});
