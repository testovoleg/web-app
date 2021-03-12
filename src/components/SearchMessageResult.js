import React from 'react';
import Moment from "react-moment";
import {markOccurrences, replaceEmojis} from "../Helpers";
import ChatMessageClass from "../ChatMessageClass";
import DoneAll from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";
import {CALENDAR_NORMAL} from "../Constants";
import ChatMessageTypeIcon from "./ChatMessageTypeIcon";
import {ListItem} from "@material-ui/core";

function SearchMessageResult(props) {

    const data = props.messageData;

    return(
        <ListItem button onClick={() => props.onClick(data)}>
            <div className="searchResult__message">
                <div className="searchResult__message__header">
                    <Moment unix calendar={CALENDAR_NORMAL} date={data.timestamp} />
                </div>
                <div className="searchResult__message__body">

                <span className="searchResult__message__body__type">
                    {data.isFromUs === true && data.type === ChatMessageClass.TYPE_TEXT &&
                    <span className={data.isRead() ? 'chat__seen' : ''}>
                        {data.isDeliveredOrRead()
                            ?
                            <DoneAll className="chat__iconDoneAll" />
                            :
                            <DoneIcon />
                        }
                    </span>
                    }

                    <ChatMessageTypeIcon type={data.type} />
                </span>

                    <span className="searchResult__message__body__text inlineFlex whiteSpacePreWrap" dangerouslySetInnerHTML={{__html: replaceEmojis(markOccurrences(data.text ?? data.caption, props.keyword), true)}} />
                </div>
            </div>
        </ListItem>
    )
}

export default SearchMessageResult;