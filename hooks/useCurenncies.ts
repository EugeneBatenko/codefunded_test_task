import {useQuery} from "@tanstack/react-query";
import {Currency} from "@/lib/utils";

const fetchCurrencies = async (): Promise<Array<Currency>> => {
    const params = new URLSearchParams({
        filter_asset_id: "eth,matic,btc,usdt,usdc,sol,xrp,doge,ada,avax,trx,ton"
    }).toString();
    const res = await fetch(`${process.env.API_URL}?${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CoinAPI-Key": process.env.API_KEY
        } as unknown as Headers // to fix overload matches
    });
    const data = await res.json();
    return data.rates;
}

const useCurrencies = () => {
    return useQuery({
        queryKey: ['curencies'],
        queryFn: async () => await fetchCurrencies(),
        staleTime: 1000 * 60 * 60, // To avoid 429 error because of API limits
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 2,
    })
}

export { useCurrencies, fetchCurrencies };
