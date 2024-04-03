export default function (risk) {
    let badge = "badge-green-square";

    if (risk == 5) {
        badge = "badge-yellow-square";
    }

    if (risk == 6) {
        badge = "badge-orange-square";
    }

    if (risk == 7) {
        badge = "badge-red-square";
    }

    return (
        <span className={badge + " py-0 px-2"}>{risk}</span>
    )
}