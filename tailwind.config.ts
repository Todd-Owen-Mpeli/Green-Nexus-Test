// Imports
import type { Config } from "tailwindcss";
import {PluginAPI, CSSRuleObject} from "tailwindcss/types/config";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".8rem",
        tiny: ".9rem",
        base: "1rem",
        medium: "1.15rem",
        paragraph: "1.05rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "1.75rem",
        "3xl": "1.85rem",
        "4xl": "2rem",
        "5xl": "2.25rem",
        "6xl": "2.5rem",
        "7xl": "3rem",
        "8xl": "4rem",
        "9xl": "4rem",
        "10xl": "4.5rem",
        "11xl": "5rem",
        "12xl": "5.5rem",
      },
      colors: {
        black: "#040504",
        grey: "#cecece",
        white: "#ffffff",
        pureBlack: "#000",
        darkGrey: "#8f8f8f",
        lightGrey: "#f7f7f7",
        lightBlack: "#292929",
        lightGreyTwo: "#fafafa",

        // Main colors
        
        // Dashboard Colours
				yellow: "#f6ad37",
				pinkRed: "#e20031",
				blueDash: "#0072f5",
				brightGreen: "#17c964",
				flatBlueGrey: "#212535",
				flatBlueGreyDarker: "#15171e",

        primary: {
          default: "#2563eb",
          two: "#3978ff",
          light: "#3d77f3",
          babyBlue: "#5ac3ff",
          dark: "#09275e",
          darker: "#0d172a",
          darkerTwo: "#061229",
        },

        secondary: {
          default: "#f6ad37",
          two: "#e8b042",
          three: "#fac546",
          light: "#fbbc57",
          dark: "#e4a002",
          darker: "#bc7700",
        },

        accent: {
          default: "#2d2378",
          pinkRed: "#e20031",
          darkPinkRed: "#9a0021",
        },
      },
    },
  },
  plugins: [
		function ({addUtilities}: PluginAPI) {
			addUtilities({
				// SchaboCondensed
				".font-schaboCondensed": {
					fontFamily: '"schaboCondensed"',
				},
				// Onest
				".font-OnestBlack": {
					fontFamily: '"OnestBlack"',
				},
				".font-OnestBold": {
					fontFamily: '"OnestBold"',
				},
				".font-OnestRegular": {
					fontFamily: '"OnestRegular"',
				},
				// BGAP
				".font-BGAPBold": {
					fontFamily: '"BGAPBold"',
				},
				".font-BGAPBlack": {
					fontFamily: '"BGAPBlack"',
				},
				".font-BGAPLight": {
					fontFamily: '"BGAPLight"',
				},
				".font-BGAPMedium": {
					fontFamily: '"BGAPMedium"',
				},
				".font-BGAPRegular": {
					fontFamily: '"BGAPRegular"',
				},
			} as CSSRuleObject);
		},
	],
} satisfies Config;