const Send: React.FC<React.HTMLAttributes<SVGSVGElement>> = props => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="7" className="fill-current" />
        <path
            d="M13 7.99902L17 11.999L13 15.999"
            className="fill-current stroke-white stroke-2 dark:stroke-black"
        />
        <path d="M17 12L7 12" className="stroke-white stroke-2 dark:stroke-black" />
    </svg>
);

export default Send;
