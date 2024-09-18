import { useCurrencies } from "@/hooks/useCurenncies";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import List from "@/components/List";

export default function CurrencyPage() {
    const { data, isPending } = useCurrencies();
    if (isPending) return <div>Loading...</div>;

    return (
        <section>
            <h1 className="text-4xl font-extrabold dark:text-white m-5">All currencies</h1>

            <Button asChild>
                <Link className="m-10" href={"/"}>Back to homepage</Link>
            </Button>
            <Button asChild>
                <Link className="m-10" href={"/favourite"}>Check favourites</Link>
            </Button>
            <List data={data} />
        </section>
    )
}