import {ReactNode} from "react";
import { useInView } from 'react-intersection-observer';
import css from "./FadeInBlocks.module.scss";
import {Grid} from "@mui/material";


interface FadeInBlockProps {
    block: ReactNode;
    columns: 1 | 2 | 3;
}

function FadeInBlock({ block, columns}: FadeInBlockProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const mdSize = {
        1: 12,
        2: 6,
        3: 4,
    }

    return (
        <Grid item xs={12} md={mdSize[columns]} ref={ref} className={`${css.block} ${inView ? css.fadeIn : ''}`}>
            {block}
        </Grid>
    );
}

interface FadeInBlocksProps {
    blocks: Array<ReactNode>;
    columns?: 1 | 2 | 3;
}

export default function FadeInBlocks({blocks, columns}: FadeInBlocksProps) {
    const columnsCount = columns || 2;
    return (
        <Grid container spacing={1}>
            {blocks.map((block, index) => <FadeInBlock block={block} key={index} columns={columnsCount} />)}
        </Grid>
    );
}