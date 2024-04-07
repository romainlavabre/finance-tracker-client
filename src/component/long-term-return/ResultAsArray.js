import isNull from "../../mixin/global/isNull";
import priceFormatter from "../../mixin/global/priceFormatter";

export default function ({result}) {

    if (isNull(result)) {
        return (
            <div>
                <h1 className="text-center">Result as array</h1>

                <table>
                    <thead>
                    <tr>
                        <th>Year</th>
                        <th>Payment</th>
                        <th>Yield</th>
                        <th>total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={4}>No data available</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-center">Result as array</h1>

            <table>
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Payment</th>
                    <th>Yield</th>
                    <th>total</th>
                </tr>
                </thead>
                <tbody>
                {
                    result.map(res => (
                        <tr key={res.year}>
                            <td>{res.year}</td>
                            <td>{priceFormatter(res.payment, true)}</td>
                            <td>{priceFormatter(res.yield, true)}</td>
                            <td>{priceFormatter(res.total, true)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}