const Logo: React.FC<React.HTMLAttributes<SVGSVGElement>> = props => (
    <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M4 11C4.27614 11 4.5 10.7761 4.5 10.5C4.5 10.2239 4.27614 10 4 10C3.72386 10 3.5 10.2239 3.5 10.5C3.5 10.7761 3.72386 11 4 11Z" />
        <path d="M9.5 11C9.77614 11 10 10.7761 10 10.5C10 10.2239 9.77614 10 9.5 10C9.22386 10 9 10.2239 9 10.5C9 10.7761 9.22386 11 9.5 11Z" />
        <path d="M1.0249 1.02499H2.0249L3.3549 7.23499C3.40369 7.46242 3.53024 7.66573 3.71276 7.80992C3.89528 7.95411 4.12236 8.03017 4.3549 8.02499H9.2449C9.47249 8.02463 9.69314 7.94664 9.87042 7.80391C10.0477 7.66118 10.171 7.46226 10.2199 7.23999L11.0449 3.52499H2.5599" />
    </svg>
);

export default Logo;
