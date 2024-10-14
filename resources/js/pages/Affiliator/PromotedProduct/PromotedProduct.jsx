import './style.css';
import React from 'react';
import Partial from './partials';

function PromotedProduct() {
    return (
        <main className="flex w-full gap-6 py-6">
            <Partial.PromotedProductList />
        </main>
    );
}

export default PromotedProduct;
