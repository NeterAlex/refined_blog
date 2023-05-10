import 'md-editor-rt/lib/style.css';
import {Box} from "@mantine/core";
import MdEditor from "md-editor-rt";
import {useState} from "react";
import {useWindowScroll} from "@mantine/hooks";

interface Props {
    editorID: string

}

export default function Catalog({editorID}: Props) {
    const [state] = useState({
        text: '# 标题',
        scrollElement: document.documentElement
    })
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <Box>
            <MdEditor.MdCatalog style={{
                position: 'fixed',
                top: '100px',
            }} editorId={editorID} scrollElement={state.scrollElement}/>
        </Box>
    )
}