import '@testing-library/jest-dom';

import { render, screen, cleanup } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Modal from './Modal.svelte';

afterEach(() => {
	cleanup();
});

const modalSelector = 'modal';
const modalContentSelector = 'modal-content';
const modalCloseButtonSelector = 'modal-close-button';

describe('Modal component', () => {
	it('should be hidden by default', () => {
		render(Modal);
		const modal = screen.queryByTestId(modalSelector);
		expect(modal).toBeDefined();
		expect(screen.queryByTestId(modalContentSelector)).toBeFalsy();
	});

	it('should be visible when the show property is true', () => {
		render(Modal, { show: true });
		const modal = screen.queryByTestId(modalSelector);
		const modalContent = screen.queryByTestId(modalContentSelector);
		expect(modal).toBeTruthy();
		expect(modalContent).toBeTruthy();
	});

	it('should close when clicked on the X button', async () => {
		const user = userEvent.setup();
		render(Modal, { show: true });
		const modalContentBeforeClick = screen.queryByTestId(modalContentSelector);
		expect(modalContentBeforeClick).toBeTruthy();

		await user.click(screen.getByTestId(modalCloseButtonSelector));
		const modalContent = screen.queryByTestId(modalContentSelector);

		expect(modalContent).toBeFalsy();
	});

	// we are not testing the external button click to show a modal,
	// cause if we do we would be testing svelte reactivity when changing a prop value (i'm pretty sure svelte has it's own tests.)
});
