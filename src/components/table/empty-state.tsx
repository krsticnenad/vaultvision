import { FC } from "react"

interface TableEmptyStateProps {
    notFound: boolean;
}

const TableEmptyState: FC<TableEmptyStateProps> = ({ notFound }) => {
    return (
        <div>
            { notFound ? (<p>No results found for the requested ID</p>) : (<p>Start your search...</p>) }
        </div>
    )
}

export default TableEmptyState;