import axios from "axios";

export default {
    patrimony: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/patrimony");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    averagePricing: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/average_pricing");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    riskDistribution: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/risk_distribution");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    continentDistribution: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/continent_distribution");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    countryDistribution: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/country_distribution");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    sectorDistribution: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/sector_distribution");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    exchangeTradedFundDistribution: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/exchange_traded_fund_distribution");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    providerDistribution: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/provider_distribution");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    pastPerformance: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/past_performance");

            return response.data;
        } catch (e) {
            return null;
        }
    },
    cumulativeYield: async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "/statistics/cumulative_yield");

            return response.data;
        } catch (e) {
            return null;
        }
    }
}