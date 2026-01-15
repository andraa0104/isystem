import { Head } from '@inertiajs/react';

const renderValue = (value) =>
    value === null || value === undefined || value === '' ? '-' : value;

const formatDate = (value) => {
    if (!value) {
        return '-';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value; // fallback if already string or invalid
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
};

const formatNumber = (value) => {
    const number = Number(value);
    if (Number.isNaN(number)) {
        return '-';
    }
    return new Intl.NumberFormat('id-ID').format(number);
};

export default function DeliveryOrderPrint({
    deliveryOrder,
    deliveryOrderDetails = [],
    customerAddress = '',
    company = {},
}) {
    // Prepare company lines
    const companyLines = [];
    if (company.address) companyLines.push(company.address);
    if (company.kota) companyLines.push(company.kota);
    // Combine phone if needed or just push
    if (company.phone) companyLines.push(`Telp : ${company.phone}`);

    // Fill empty rows to make the table look consistent or fixed height if needed.
    // However, usually dynamic is fine. Let's stick to dynamic for now unless requested fixed height.

    return (
        <div className="min-h-screen bg-white font-sans text-black">
            <Head title={`Print DO ${deliveryOrder?.no_do ?? ''}`} />

            <div className="mx-auto w-full max-w-[900px] p-8 text-[12px] leading-tight">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                    {/* Company Info (Left) */}
                    <div className="w-[60%]">
                        <div className="mb-1 text-[14px] font-bold uppercase">
                            {company.name || 'CV. SEMESTA JAYA ABADI'}
                        </div>
                        {companyLines.map((line, idx) => (
                            <div key={idx} className="capitalize">
                                {line}
                            </div>
                        ))}
                    </div>

                    {/* Delivery To (Right) */}
                    <div className="w-[40%] border border-black p-2">
                        <div className="mb-1 underline">Delivery To :</div>
                        <div className="mb-1 font-bold uppercase">
                            {renderValue(deliveryOrder?.nm_cs)}
                        </div>
                        <div className="uppercase">
                            {renderValue(customerAddress)}
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="my-4 text-center text-[16px] font-bold tracking-widest uppercase">
                    Delivery Order
                </div>

                {/* DO Details */}
                <div className="mb-4">
                    <table className="w-auto">
                        <tbody>
                            <tr>
                                <td className="w-[80px]">No. DO</td>
                                <td className="w-[10px]">:</td>
                                <td>{renderValue(deliveryOrder?.no_do)}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>:</td>
                                <td>{formatDate(deliveryOrder?.date)}</td>
                            </tr>
                            <tr>
                                <td>Ref. PO</td>
                                <td>:</td>
                                <td>{renderValue(deliveryOrder?.ref_po)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Main Table */}
                <div className="mb-4 flex min-h-[100px] flex-col border border-black">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-black">
                                <th className="w-[50px] border-r border-black py-1 text-center">
                                    No.
                                </th>
                                <th className="w-[100px] border-r border-black py-1 pr-2 text-right">
                                    Quantity
                                </th>
                                <th className="border-r border-black py-1 text-center">
                                    Description
                                </th>
                                <th className="w-[150px] py-1 text-center">
                                    Remark
                                </th>
                            </tr>
                        </thead>
                    </table>

                    {/* Scrollable/Flexible content area for rows */}
                    <div className="flex-grow">
                        <table className="w-full border-collapse">
                            <colgroup>
                                <col className="w-[50px]" />
                                <col className="w-[150px]" />
                                <col />
                                <col className="w-[150px]" />
                            </colgroup>
                            <tbody>
                                {deliveryOrderDetails.map((item, index) => (
                                    <tr key={index} className="align-top">
                                        <td className="border-r border-black py-1 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border-r border-black py-1 pr-2 text-right">
                                            {formatNumber(item.qty)} {item.unit}
                                        </td>
                                        <td className="border-r border-black py-1 pl-2">
                                            {renderValue(item.mat)}
                                        </td>
                                        <td className="py-1 pl-2">
                                            {renderValue(item.remark)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Signatures Footer */}
                <div className="flex border border-black text-center text-[11px]">
                    <div className="flex flex-1 flex-col border-r border-black">
                        <div className="py-1">Created By,</div>
                        <div className="h-[60px]"></div>
                        <div className="border-t border-black py-1">&nbsp;</div>
                    </div>
                    <div className="flex flex-1 flex-col border-r border-black">
                        <div className="py-1">Check By,</div>
                        <div className="h-[60px]"></div>
                        <div className="border-t border-black py-1">&nbsp;</div>
                    </div>
                    <div className="flex flex-1 flex-col border-r border-black">
                        <div className="py-1">Carried By,</div>
                        <div className="h-[60px]"></div>
                        <div className="border-t border-black py-1">&nbsp;</div>
                    </div>
                    <div className="flex flex-[1.5] flex-col">
                        <div className="py-1">Received By,</div>
                        <div className="h-[60px]"></div>
                        <div className="border-t border-black py-1 font-semibold uppercase">
                            {renderValue(deliveryOrder?.nm_cs)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: 9.5in 11in;
                        margin: 0.5in;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>
        </div>
    );
}
