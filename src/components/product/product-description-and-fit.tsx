const desc = [
    { title: 'Pieces/Pairs', value: '3' },
    {
        title: 'Length',
        value: 'Regular length',
    },
    {
        title: 'Sleeve Length',
        value: 'Long sleeve',
    },
    {
        title: 'Fit',
        value: 'Fitted',
    },
    {
        title: 'Neckline',
        value: 'Round neck',
    },
    {
        title: 'Description',
        value: 'White/Beige/Black, solid color',
    },
    {
        title: 'Concept',
        value: 'BASICS, EVERYDAY FASION',
    },
];

const ProductsDescriptionAndFit = () => {
    return (
        <div className="space-y-4 pl-8">
            <div className="space-y-2">
                <span className="text-xs">New arrival</span>
                <p className="font-medium">
                    Fitted tops in soft cotton jersey with a round neckline and
                    long sleeves.
                </p>
                <div className="text-xs">
                    <span className="dark:underline">Article number:</span>{' '}
                    <span>1136544006</span>
                </div>
            </div>
            <ul className="space-y-2 text-xs">
                {desc.map(({ title, value }, idx) => (
                    <li key={title} className="flex gap-1">
                        <h5 className="font-semibold dark:underline">
                            {title}:
                        </h5>
                        <span>{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsDescriptionAndFit;
