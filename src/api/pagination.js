import axios from "axios";

export default {
    getExchangeTradedFunds: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/paginations/exchange_traded_fund");

            return response.data;
        } catch (e) {
            return null;
        }
    }
}