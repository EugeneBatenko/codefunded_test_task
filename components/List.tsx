import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import Like from "@/components/Like";

export default function List(props: any) {
    return(
        <Table>
            <TableCaption>A list of rates</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead >Time</TableHead>
                    <TableHead className="text-right">Favourite</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.data?.map((item) => (
                    <TableRow key={item.asset_id_quote}>
                        <TableCell className="font-medium">{item.asset_id_quote}</TableCell>
                        <TableCell>{item.rate}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell className="text-right"><Like itemId={item.asset_id_quote}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{props.data?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}