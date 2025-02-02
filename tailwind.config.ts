import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
  		padding: '2rem',
  		screens: {
        '2xl': '1400px'
  		}
  	},
  	extend: {
      colors: {
        'navy': {
          700: '#1E3A5F',
          800: '#152C48',
          900: '#0C1B2B',
        },
        'off-white': '#F0F4F8',
        border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
          DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				foreground: 'hsl(var(--warning-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
  				text: 'hsl(var(--muted-text))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			text: {
  				secondary: 'hsl(var(--text-secondary))',
				disabled: 'hsl(var(--text-disabled))'
  			},
  			'border-disabled': 'hsl(var(--border-disabled))',
  			'border-enabled': 'hsl(var(--border-enabled))',
  			base: 'hsl(var(--base))',
  			'checkbox-primary': 'hsl(var(--checkbox-primary))',
  			'text-active': 'hsl(var(--text-active))',
  			'success-bg': 'hsl(var(--success-bg))',
  			overflow: 'hsl(var(--overflow))',
  			'background-2': 'hsl(var(--background-2))',
  			surface: 'hsl(var(--surface))',
  			error: {
  				text: 'hsl(var(--error-text))',
  				bg: 'hsl(var(--error-bg))',
  				border: 'hsl(var(--error-border))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				text: 'hsl(var(--success-text))',
  				bg: 'hsl(var(--success-bg))',
  				border: 'hsl(var(--success-border))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontSize: {
  			esm: '16px',
			smx: '13px',
			md: '15px'
  		},
  		lineHeight: {
  			'5.5': '22.96px',
  			'5.4': '21.32px'
  		},
  		screens: {
  			xlg: '1150px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
