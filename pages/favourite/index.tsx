import { useCurrencies } from "@/hooks/useCurenncies";
import List from "@/components/List";
import { useLikeStore } from "@/hooks/useLikeStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavouritePage() {
    const { data, isPending } = useCurrencies();
    const liked = useLikeStore((state) => state.likes);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (data) {
            const likedKeys = Object.keys(liked);
            const filteredData = data.filter((asset) =>
                likedKeys.includes(asset.asset_id_quote)
            );
            setFiltered(filteredData);
        }
    }, [data, liked]);

    if (isPending) return <div>Loading...</div>;

    return (
        <section>
            <h1 className="text-4xl font-extrabold dark:text-white m-5">Favourite currency</h1>

            <Button asChild>
                <Link className="m-10" href={"/"}>Back to homepage</Link>
            </Button>
            <Button asChild>
                <Link className="m-10" href={"/currency"}>Back to currency</Link>
            </Button>

            <List data={filtered} />
        </section>
    );
}