import { render } from '@testing-library/react';

import NextMdNext from './next-md-next';

describe('NextMdNext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextMdNext />);
    expect(baseElement).toBeTruthy();
  });
});
