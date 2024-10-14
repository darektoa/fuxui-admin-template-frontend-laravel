import './style.css';
import React from 'react';
import Partial from './partials';

function Voucher() {
    return (
        <main className="flex w-full gap-6 py-6">
            <Partial.VoucherList />
        </main>
    );
}

export default Voucher;
