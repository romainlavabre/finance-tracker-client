export default function (value, useIntl = false) {
    if (value === null || value === undefined) {
        return;
    }

    if (useIntl) {
        return Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(value);
    }

    value = value.toString();

    if (value.includes('.')) {
        let sections = value.split('.');

        const decimals = sections[1].substr(0, 2);

        return sections[0] + "," + (decimals.toString().length === 2 ? decimals : `${decimals}0`);
    }

    return value + ",00";
}
