import { css, keyframes } from 'styled-components';

export const media = ({
  desktop: (...args) => css`
    @media (max-width: 1200px) {
        ${ css(...args) }
    }
  `,

  tablet: (...args) => css`
    @media (max-width: 992px) {
        ${ css(...args) }
    }
  `,

  mobile: (...args) => css`
    @media (max-width: 768px) {
        ${ css(...args) }
    }
  `
});

export const transitions = {
  fadeInUp: keyframes`
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  fadeOutDown: keyframes`
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(8px);
    }
  `,
}

export const shadows = {
  sm: `
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.02)
  `,
  md: `
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06)
  `,
  lg: `
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05)
  `,
  xl: `
    0 20px 25px rgba(0, 0, 0, 0.1),
    0 10px 10px rgba(0, 0, 0, 0.04)
  `,
};
