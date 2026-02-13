import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToastHost from '../../src/components/ToastHost.jsx';
import { useToast } from '../../src/state/ToastContext.jsx';
import { renderWithProviders } from '../utils/render.jsx';

function Fixture() {
  const { showToast } = useToast();
  return (
    <>
      <button type="button" onClick={() => showToast('Item added to cart.')}>
        Show
      </button>
      <ToastHost />
    </>
  );
}

describe('ToastHost (BDD)', () => {
  it('Given a toast is triggered, When host renders, Then message is visible', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Fixture />);
    await user.click(screen.getByRole('button', { name: 'Show' }));
    expect(await screen.findByText('Item added to cart.')).toBeInTheDocument();
  });
});