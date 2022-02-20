import { render } from '@testing-library/react';

import MdxElements from './mdx-elements';

describe('MdxElements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MdxElements />);
    expect(baseElement).toBeTruthy();
  });
});
