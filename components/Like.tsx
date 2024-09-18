import {Toggle} from "@/components/ui/toggle";
import {useLikeStore} from "@/hooks/useLikeStore";
import {useEffect, useState} from "react";
import {getCookie} from 'cookies-next';

export default function Like(props: any) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user: any = getCookie('username');
        setCurrentUser(user);
    }, []);


    // @ts-expect-error
    const { likes, likeItem, unlikeItem } = useLikeStore();

   const handleLike = (itemId: string | number) => {
        if (likes[itemId]) {
            unlikeItem(itemId);
        } else {
            likeItem(itemId, currentUser);
        }
    };

    return (
        <Toggle aria-label="Toggle bold"
                onPressedChange= {
                    () => handleLike(props.itemId)
                }
        >{likes[props.itemId] ? 'Unlike' : 'Like'}</Toggle>
    )
}