export const ProductsMaterialAndSuppliers = () => {
    return (
        <div className="space-y-4 pl-8">
            <div className="space-y-2">
                <div className="font-semibold">Composition</div>
                <div className="text-xs">Cotton 95%, Elastane 5%</div>
            </div>
            <div className="flex items-center gap-1 text-xs">
                <div className="font-semibold">Material: </div>
                <span>Jersey</span>
            </div>
            <div className="font-semibold">
                Materials in this product explained
            </div>
            <div className="flex flex-col space-y-2 text-xs">
                <div className="font-semibold">Cotton</div>
                <div>
                    Cotton is a soft and versatile natural fibre harvested from
                    the cotton plant.
                </div>
            </div>
            <div className="flex flex-col space-y-2 text-xs">
                <div className="font-semibold">Elastane</div>
                <div>
                    Elastane is an elastic synthetic fibre made from oil (a
                    fossil resource).
                </div>
            </div>
        </div>
    );
};
