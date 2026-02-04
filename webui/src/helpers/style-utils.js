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

export const themes = {
  light: {
    primary: 'rgb(75 92 146)',
    surfaceTint: 'rgb(75 92 146)',
    onPrimary: 'rgb(255 255 255)',
    primaryContainer: 'rgb(219 225 255)',
    onPrimaryContainer: 'rgb(51 68 120)',
    secondary: 'rgb(89 94 114)',
    onSecondary: 'rgb(255 255 255)',
    secondaryContainer: 'rgb(221 225 249)',
    onSecondaryContainer: 'rgb(65 70 89)',
    tertiary: 'rgb(116 84 112)',
    onTertiary: 'rgb(255 255 255)',
    tertiaryContainer: 'rgb(255 214 247)',
    onTertiaryContainer: 'rgb(91 61 88)',
    error: 'rgb(186 26 26)',
    onError: 'rgb(255 255 255)',
    errorContainer: 'rgb(255 218 214)',
    onErrorContainer: 'rgb(147 0 10)',
    background: 'rgb(250 248 255)',
    onBackground: 'rgb(26 27 33)',
    surface: 'rgb(250 248 255)',
    onSurface: 'rgb(26 27 33)',
    surfaceVariant: 'rgb(226 225 236)',
    onSurfaceVariant: 'rgb(69 70 79)',
    outline: 'rgba(0, 0, 0, 0.1)',
    outlineVariant: 'rgb(198 198 208)',
    shadow: 'rgb(0 0 0)',
    scrim: 'rgb(0 0 0)',
    inverseSurface: 'rgb(47 48 54)',
    inverseOnSurface: 'rgb(241 240 247)',
    inversePrimary: 'rgb(180 197 255)',
    primaryFixed: 'rgb(219 225 255)',
    onPrimaryFixed: 'rgb(1 23 75)',
    primaryFixedDim: 'rgb(180 197 255)',
    onPrimaryFixedVariant: 'rgb(51 68 120)',
    secondaryFixed: 'rgb(221 225 249)',
    onSecondaryFixed: 'rgb(22 27 44)',
    secondaryFixedDim: 'rgb(193 197 221)',
    onSecondaryFixedVariant: 'rgb(65 70 89)',
    tertiaryFixed: 'rgb(255 214 247)',
    onTertiaryFixed: 'rgb(43 18 42)',
    tertiaryFixedDim: 'rgb(226 187 219)',
    onTertiaryFixedVariant: 'rgb(91 61 88)',
    surfaceDim: 'rgb(218 217 224)',
    surfaceBright: 'rgb(250 248 255)',
    surfaceContainerLowest: 'rgb(255 255 255)',
    surfaceContainerLow: 'rgb(244 243 250)',
    surfaceContainer: 'rgb(238 237 244)',
    surfaceContainerHigh: 'rgb(233 231 239)',
    surfaceContainerHighest: 'rgb(227 226 233)'
  },
  dark: {
    primary: 'rgb(180 197 255)',
    surfaceTint: 'rgb(180 197 255)',
    onPrimary: 'rgb(25 46 97)',
    primaryContainer: 'rgb(51 68 120)',
    onPrimaryContainer: 'rgb(219 225 255)',
    secondary: 'rgb(193 197 221)',
    onSecondary: 'rgb(43 48 66)',
    secondaryContainer: 'rgb(65 70 89)',
    onSecondaryContainer: 'rgb(221 225 249)',
    tertiary: 'rgb(226 187 219)',
    onTertiary: 'rgb(68 41 65)',
    tertiaryContainer: 'rgb(91 61 88)',
    onTertiaryContainer: 'rgb(255 214 247)',
    error: 'rgb(255 180 171)',
    onError: 'rgb(105 0 5)',
    errorContainer: 'rgb(147 0 10)',
    onErrorContainer: 'rgb(255 218 214)',
    background: 'rgb(26 27 33)',
    onBackground: 'rgb(226 225 236)',
    surface: 'rgb(26 27 33)',
    onSurface: 'rgb(226 225 236)',
    surfaceVariant: 'rgb(69 70 79)',
    onSurfaceVariant: 'rgb(198 198 208)',
    outline: 'rgba(255, 255, 255, 0.1)',
    outlineVariant: 'rgb(69 70 79)',
    shadow: 'rgb(0 0 0)',
    scrim: 'rgb(0 0 0)',
    inverseSurface: 'rgb(226 225 236)',
    inverseOnSurface: 'rgb(47 48 54)',
    inversePrimary: 'rgb(75 92 146)',
    primaryFixed: 'rgb(219 225 255)',
    onPrimaryFixed: 'rgb(1 23 75)',
    primaryFixedDim: 'rgb(180 197 255)',
    onPrimaryFixedVariant: 'rgb(51 68 120)',
    secondaryFixed: 'rgb(221 225 249)',
    onSecondaryFixed: 'rgb(22 27 44)',
    secondaryFixedDim: 'rgb(193 197 221)',
    onSecondaryFixedVariant: 'rgb(65 70 89)',
    tertiaryFixed: 'rgb(255 214 247)',
    onTertiaryFixed: 'rgb(43 18 42)',
    tertiaryFixedDim: 'rgb(226 187 219)',
    onTertiaryFixedVariant: 'rgb(91 61 88)',
    surfaceDim: 'rgb(20 20 26)',
    surfaceBright: 'rgb(56 57 64)',
    surfaceContainerLowest: 'rgb(15 15 20)',
    surfaceContainerLow: 'rgb(26 27 33)',
    surfaceContainer: 'rgb(30 31 37)',
    surfaceContainerHigh: 'rgb(40 41 47)',
    surfaceContainerHighest: 'rgb(51 52 58)'
  }
};

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
